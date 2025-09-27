<?php

namespace App\Services\Api\Mobile;

use App\Models\Restaurant;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class RestaurantService
{
    /**
     * Get restaurants optimized for mobile
     */
    public function getRestaurantsForMobile(array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        $query = Restaurant::with(['menuCategories' => function ($query) {
            $query->where('status', 'active')->withCount('menuItems');
        }]);

        // Apply filters
        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['cuisine_type'])) {
            $query->where('cuisine_type', $filters['cuisine_type']);
        }

        if (isset($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%");
            });
        }

        // Add mobile-specific fields
        $query->addSelect([
            'is_open' => $this->getIsOpenSubquery(),
            'menu_items_count' => $this->getMenuItemsCountSubquery(),
        ]);

        return $query->paginate($filters['per_page'] ?? 20);
    }

    /**
     * Get mobile dashboard data
     */
    public function getMobileDashboard(Restaurant $restaurant): array
    {
        return [
            'stats' => [
                'total_orders' => $restaurant->orders()->count(),
                'pending_orders' => $restaurant->orders()->where('status', 'pending')->count(),
                'completed_orders' => $restaurant->orders()->where('status', 'completed')->count(),
                'revenue_today' => $this->getTodayRevenue($restaurant),
                'revenue_this_month' => $this->getMonthlyRevenue($restaurant),
                'menu_items_count' => $restaurant->menuItems()->count(),
                'staff_count' => $restaurant->staff()->count(),
                'is_open' => $this->isRestaurantOpen($restaurant),
            ],
            'recent_orders' => $restaurant->orders()
                ->with(['customer:id,name,phone'])
                ->latest()
                ->limit(5)
                ->get(),
            'popular_items' => $this->getPopularMenuItems($restaurant),
            'quick_stats' => $this->getQuickStats($restaurant),
        ];
    }

    /**
     * Update mobile-specific settings
     */
    public function updateMobileSettings(Restaurant $restaurant, array $settings): Restaurant
    {
        $currentSettings = $restaurant->settings ?? [];
        $newSettings = array_merge($currentSettings, $settings);
        
        $restaurant->update(['settings' => $newSettings]);
        return $restaurant->fresh();
    }

    /**
     * Get today's revenue
     */
    public function getTodayRevenue(Restaurant $restaurant): float
    {
        return $restaurant->orders()
            ->whereDate('created_at', today())
            ->where('payment_status', 'paid')
            ->sum('total_amount') ?? 0;
    }

    /**
     * Get monthly revenue
     */
    public function getMonthlyRevenue(Restaurant $restaurant): float
    {
        return $restaurant->orders()
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->where('payment_status', 'paid')
            ->sum('total_amount') ?? 0;
    }

    /**
     * Get popular menu items for mobile
     */
    public function getPopularMenuItems(Restaurant $restaurant): array
    {
        return $restaurant->menuItems()
            ->where('status', 'active')
            ->with(['menuCategory:id,name'])
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'price' => $item->price,
                    'image' => $item->image,
                    'category' => $item->menuCategory->name ?? 'Uncategorized',
                    'orders_count' => rand(10, 100), // Mock data - would come from order_items table
                    'revenue' => $item->price * rand(10, 100), // Mock data
                ];
            })
            ->toArray();
    }

    /**
     * Get quick stats for mobile dashboard
     */
    public function getQuickStats(Restaurant $restaurant): array
    {
        $today = today();
        $yesterday = today()->subDay();
        $thisMonth = now()->startOfMonth();
        $lastMonth = now()->subMonth()->startOfMonth();

        return [
            'orders' => [
                'today' => $restaurant->orders()->whereDate('created_at', $today)->count(),
                'yesterday' => $restaurant->orders()->whereDate('created_at', $yesterday)->count(),
                'this_month' => $restaurant->orders()->where('created_at', '>=', $thisMonth)->count(),
                'last_month' => $restaurant->orders()
                    ->where('created_at', '>=', $lastMonth)
                    ->where('created_at', '<', $thisMonth)
                    ->count(),
            ],
            'revenue' => [
                'today' => $this->getTodayRevenue($restaurant),
                'yesterday' => $restaurant->orders()
                    ->whereDate('created_at', $yesterday)
                    ->where('payment_status', 'paid')
                    ->sum('total_amount') ?? 0,
                'this_month' => $this->getMonthlyRevenue($restaurant),
                'last_month' => $restaurant->orders()
                    ->where('created_at', '>=', $lastMonth)
                    ->where('created_at', '<', $thisMonth)
                    ->where('payment_status', 'paid')
                    ->sum('total_amount') ?? 0,
            ],
        ];
    }

    /**
     * Check if restaurant is currently open
     */
    public function isRestaurantOpen(Restaurant $restaurant): bool
    {
        $businessHours = $restaurant->business_hours;
        if (!$businessHours) return false;

        $currentDay = strtolower(now()->format('l'));
        $currentTime = now()->format('H:i');

        if (!isset($businessHours[$currentDay])) return false;

        $hours = $businessHours[$currentDay];
        return $currentTime >= $hours['open'] && $currentTime <= $hours['close'];
    }

    /**
     * Get restaurant status for mobile
     */
    public function getRestaurantStatus(Restaurant $restaurant): array
    {
        $isOpen = $this->isRestaurantOpen($restaurant);
        $businessHours = $restaurant->business_hours;
        $currentDay = strtolower(now()->format('l'));

        return [
            'is_open' => $isOpen,
            'status' => $restaurant->status,
            'current_hours' => $businessHours[$currentDay] ?? null,
            'next_open_time' => $this->getNextOpenTime($restaurant),
            'accepts_orders' => $restaurant->settings['accepts_online_orders'] ?? true,
            'delivery_available' => $restaurant->settings['delivery_available'] ?? false,
            'pickup_available' => $restaurant->settings['pickup_available'] ?? true,
        ];
    }

    /**
     * Get next open time
     */
    protected function getNextOpenTime(Restaurant $restaurant): ?string
    {
        $businessHours = $restaurant->business_hours;
        if (!$businessHours) return null;

        $days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        $currentDayIndex = array_search(strtolower(now()->format('l')), $days);

        for ($i = 0; $i < 7; $i++) {
            $dayIndex = ($currentDayIndex + $i) % 7;
            $day = $days[$dayIndex];
            
            if (isset($businessHours[$day])) {
                $hours = $businessHours[$day];
                $openTime = $hours['open'];
                
                if ($i === 0) {
                    if (now()->format('H:i') < $openTime) {
                        return $openTime;
                    }
                } else {
                    return $openTime;
                }
            }
        }

        return null;
    }

    /**
     * Get is_open subquery for mobile optimization
     */
    protected function getIsOpenSubquery()
    {
        return \DB::raw('(
            CASE 
                WHEN JSON_EXTRACT(business_hours, CONCAT("$.", LOWER(DAYNAME(NOW())))) IS NOT NULL 
                AND TIME(NOW()) BETWEEN 
                    JSON_UNQUOTE(JSON_EXTRACT(business_hours, CONCAT("$.", LOWER(DAYNAME(NOW())), ".open")))
                AND 
                    JSON_UNQUOTE(JSON_EXTRACT(business_hours, CONCAT("$.", LOWER(DAYNAME(NOW())), ".close")))
                THEN 1 
                ELSE 0 
            END
        )');
    }

    /**
     * Get menu items count subquery
     */
    protected function getMenuItemsCountSubquery()
    {
        return \DB::raw('(
            SELECT COUNT(*) 
            FROM menu_items 
            WHERE menu_items.restaurant_id = restaurants.id 
            AND menu_items.status = "active"
        )');
    }
}

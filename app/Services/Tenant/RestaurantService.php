<?php

namespace App\Services\Tenant;

use App\Models\Restaurant;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class RestaurantService
{
    /**
     * Get restaurants for the current tenant
     */
    public function getRestaurants(array $filters = []): \Illuminate\Pagination\LengthAwarePaginator
    {
        $query = Restaurant::with(['menuCategories', 'staff']);

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

        return $query->paginate($filters['per_page'] ?? 15);
    }

    /**
     * Create a new restaurant
     */
    public function createRestaurant(array $data): Restaurant
    {
        return DB::transaction(function () use ($data) {
            $restaurant = Restaurant::create([
                'tenant_id' => Auth::user()->tenant_id,
                'name' => $data['name'],
                'slug' => $this->generateUniqueSlug($data['name']),
                'description' => $data['description'] ?? null,
                'address' => $data['address'],
                'city' => $data['city'],
                'state' => $data['state'],
                'zip_code' => $data['zip_code'],
                'country' => $data['country'] ?? 'US',
                'phone' => $data['phone'],
                'email' => $data['email'] ?? null,
                'website' => $data['website'] ?? null,
                'cuisine_type' => $data['cuisine_type'] ?? null,
                'price_range' => $data['price_range'] ?? null,
                'status' => 'active',
                'business_hours' => $data['business_hours'] ?? $this->getDefaultBusinessHours(),
                'settings' => $data['settings'] ?? $this->getDefaultSettings(),
            ]);

            return $restaurant;
        });
    }

    /**
     * Update restaurant
     */
    public function updateRestaurant(Restaurant $restaurant, array $data): Restaurant
    {
        $restaurant->update($data);
        return $restaurant->fresh();
    }

    /**
     * Delete restaurant
     */
    public function deleteRestaurant(Restaurant $restaurant): void
    {
        DB::transaction(function () use ($restaurant) {
            // Soft delete related data
            $restaurant->menuCategories()->delete();
            $restaurant->menuItems()->delete();
            $restaurant->orders()->delete();
            $restaurant->delete();
        });
    }

    /**
     * Update restaurant settings
     */
    public function updateSettings(Restaurant $restaurant, array $settings): Restaurant
    {
        $currentSettings = $restaurant->settings ?? [];
        $newSettings = array_merge($currentSettings, $settings);
        
        $restaurant->update(['settings' => $newSettings]);
        return $restaurant->fresh();
    }

    /**
     * Get restaurant dashboard data
     */
    public function getDashboardData(Restaurant $restaurant): array
    {
        return [
            'restaurant' => $restaurant,
            'stats' => [
                'menu_categories' => $restaurant->menuCategories()->count(),
                'menu_items' => $restaurant->menuItems()->count(),
                'total_orders' => $restaurant->orders()->count(),
                'pending_orders' => $restaurant->orders()->where('status', 'pending')->count(),
                'completed_orders' => $restaurant->orders()->where('status', 'completed')->count(),
                'staff_count' => $restaurant->staff()->count(),
                'revenue_today' => $this->getTodayRevenue($restaurant),
                'revenue_this_month' => $this->getMonthlyRevenue($restaurant),
            ],
            'recent_orders' => $restaurant->orders()
                ->with(['customer'])
                ->latest()
                ->limit(10)
                ->get(),
            'popular_items' => $this->getPopularMenuItems($restaurant),
            'business_hours' => $restaurant->business_hours,
            'settings' => $restaurant->settings,
        ];
    }

    /**
     * Get today's revenue
     */
    protected function getTodayRevenue(Restaurant $restaurant): float
    {
        return $restaurant->orders()
            ->whereDate('created_at', today())
            ->where('payment_status', 'paid')
            ->sum('total_amount') ?? 0;
    }

    /**
     * Get monthly revenue
     */
    protected function getMonthlyRevenue(Restaurant $restaurant): float
    {
        return $restaurant->orders()
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->where('payment_status', 'paid')
            ->sum('total_amount') ?? 0;
    }

    /**
     * Get popular menu items
     */
    protected function getPopularMenuItems(Restaurant $restaurant): array
    {
        return $restaurant->menuItems()
            ->where('status', 'active')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'price' => $item->price,
                    'orders_count' => rand(10, 100), // Mock data
                ];
            })
            ->toArray();
    }

    /**
     * Generate unique slug for restaurant
     */
    protected function generateUniqueSlug(string $name): string
    {
        $slug = \Str::slug($name);
        $originalSlug = $slug;
        $counter = 1;
        $tenantId = Auth::user()->tenant_id;

        while (Restaurant::where('tenant_id', $tenantId)
            ->where('slug', $slug)
            ->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    /**
     * Get default business hours
     */
    protected function getDefaultBusinessHours(): array
    {
        return [
            'monday' => ['open' => '09:00', 'close' => '22:00'],
            'tuesday' => ['open' => '09:00', 'close' => '22:00'],
            'wednesday' => ['open' => '09:00', 'close' => '22:00'],
            'thursday' => ['open' => '09:00', 'close' => '22:00'],
            'friday' => ['open' => '09:00', 'close' => '23:00'],
            'saturday' => ['open' => '10:00', 'close' => '23:00'],
            'sunday' => ['open' => '10:00', 'close' => '21:00'],
        ];
    }

    /**
     * Get default restaurant settings
     */
    protected function getDefaultSettings(): array
    {
        return [
            'accepts_online_orders' => true,
            'delivery_available' => false,
            'pickup_available' => true,
            'max_delivery_distance' => 10,
            'minimum_order_amount' => 0,
            'delivery_fee' => 0,
            'tax_rate' => 0.08,
            'service_fee' => 0,
            'auto_accept_orders' => false,
            'require_phone_verification' => false,
        ];
    }
}

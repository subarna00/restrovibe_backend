<?php

namespace App\Http\Controllers\Api\Mobile;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Services\Api\Mobile\RestaurantService;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    protected $restaurantService;

    public function __construct(RestaurantService $restaurantService)
    {
        $this->restaurantService = $restaurantService;
    }

    /**
     * Get restaurants for mobile app
     */
    public function index(Request $request)
    {
        $restaurants = $this->restaurantService->getRestaurantsForMobile($request->all());
        
        return response()->json([
            'success' => true,
            'data' => [
                'restaurants' => $restaurants->map(function ($restaurant) {
                    return $this->formatRestaurantForMobile($restaurant);
                }),
                'pagination' => [
                    'current_page' => $restaurants->currentPage(),
                    'last_page' => $restaurants->lastPage(),
                    'per_page' => $restaurants->perPage(),
                    'total' => $restaurants->total(),
                ],
            ],
        ]);
    }

    /**
     * Get restaurant details for mobile
     */
    public function show(Restaurant $restaurant)
    {
        $this->authorize('view', $restaurant);
        
        $restaurant->load(['menuCategories.menuItems']);
        
        return response()->json([
            'success' => true,
            'data' => [
                'restaurant' => $this->formatRestaurantForMobile($restaurant),
                'menu' => $this->formatMenuForMobile($restaurant),
                'stats' => $this->getRestaurantStats($restaurant),
            ],
        ]);
    }

    /**
     * Get restaurant dashboard for mobile
     */
    public function dashboard(Restaurant $restaurant)
    {
        $this->authorize('view', $restaurant);
        
        $dashboardData = $this->restaurantService->getMobileDashboard($restaurant);
        
        return response()->json([
            'success' => true,
            'data' => [
                'restaurant' => $this->formatRestaurantForMobile($restaurant),
                'stats' => $dashboardData['stats'],
                'recent_orders' => $dashboardData['recent_orders']->map(function ($order) {
                    return $this->formatOrderForMobile($order);
                }),
                'quick_actions' => $this->getQuickActions($restaurant),
            ],
        ]);
    }

    /**
     * Update restaurant settings for mobile
     */
    public function updateSettings(Request $request, Restaurant $restaurant)
    {
        $this->authorize('update', $restaurant);
        
        $validated = $request->validate([
            'accepts_online_orders' => 'boolean',
            'delivery_available' => 'boolean',
            'pickup_available' => 'boolean',
            'max_delivery_distance' => 'integer|min:1|max:50',
            'minimum_order_amount' => 'numeric|min:0',
            'delivery_fee' => 'numeric|min:0',
            'auto_accept_orders' => 'boolean',
        ]);
        
        $restaurant = $this->restaurantService->updateMobileSettings($restaurant, $validated);
        
        return response()->json([
            'success' => true,
            'message' => 'Settings updated successfully',
            'data' => [
                'restaurant' => $this->formatRestaurantForMobile($restaurant),
            ],
        ]);
    }

    /**
     * Get restaurant business hours
     */
    public function businessHours(Restaurant $restaurant)
    {
        $this->authorize('view', $restaurant);
        
        return response()->json([
            'success' => true,
            'data' => [
                'business_hours' => $restaurant->business_hours,
                'is_open_now' => $this->isRestaurantOpen($restaurant),
                'next_open_time' => $this->getNextOpenTime($restaurant),
            ],
        ]);
    }

    /**
     * Format restaurant for mobile response
     */
    protected function formatRestaurantForMobile(Restaurant $restaurant): array
    {
        return [
            'id' => $restaurant->id,
            'name' => $restaurant->name,
            'slug' => $restaurant->slug,
            'description' => $restaurant->description,
            'address' => $restaurant->address,
            'city' => $restaurant->city,
            'state' => $restaurant->state,
            'zip_code' => $restaurant->zip_code,
            'country' => $restaurant->country,
            'phone' => $restaurant->phone,
            'email' => $restaurant->email,
            'website' => $restaurant->website,
            'logo' => $restaurant->logo,
            'cover_image' => $restaurant->cover_image,
            'cuisine_type' => $restaurant->cuisine_type,
            'price_range' => $restaurant->price_range,
            'status' => $restaurant->status,
            'full_address' => $restaurant->full_address,
            'settings' => $restaurant->settings,
            'is_open' => $this->isRestaurantOpen($restaurant),
        ];
    }

    /**
     * Format menu for mobile response
     */
    protected function formatMenuForMobile(Restaurant $restaurant): array
    {
        return $restaurant->menuCategories->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'description' => $category->description,
                'image' => $category->image,
                'sort_order' => $category->sort_order,
                'items' => $category->menuItems->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'name' => $item->name,
                        'description' => $item->description,
                        'price' => $item->price,
                        'image' => $item->image,
                        'status' => $item->status,
                        'is_available' => $item->isActive(),
                    ];
                }),
            ];
        });
    }

    /**
     * Format order for mobile response
     */
    protected function formatOrderForMobile($order): array
    {
        return [
            'id' => $order->id,
            'order_number' => $order->order_number,
            'status' => $order->status,
            'total_amount' => $order->total_amount,
            'payment_status' => $order->payment_status,
            'payment_method' => $order->payment_method,
            'created_at' => $order->created_at->toISOString(),
            'customer' => $order->customer ? [
                'name' => $order->customer->name,
                'phone' => $order->customer->phone,
            ] : null,
        ];
    }

    /**
     * Get restaurant statistics
     */
    protected function getRestaurantStats(Restaurant $restaurant): array
    {
        return [
            'total_orders' => $restaurant->orders()->count(),
            'pending_orders' => $restaurant->orders()->where('status', 'pending')->count(),
            'completed_orders' => $restaurant->orders()->where('status', 'completed')->count(),
            'revenue_today' => $this->restaurantService->getTodayRevenue($restaurant),
            'revenue_this_month' => $this->restaurantService->getMonthlyRevenue($restaurant),
            'menu_items_count' => $restaurant->menuItems()->count(),
            'staff_count' => $restaurant->staff()->count(),
        ];
    }

    /**
     * Get quick actions for mobile
     */
    protected function getQuickActions(Restaurant $restaurant): array
    {
        return [
            [
                'id' => 'view_orders',
                'title' => 'View Orders',
                'icon' => 'orders',
                'route' => 'mobile.orders.index',
            ],
            [
                'id' => 'manage_menu',
                'title' => 'Manage Menu',
                'icon' => 'menu',
                'route' => 'mobile.menu.index',
            ],
            [
                'id' => 'view_analytics',
                'title' => 'Analytics',
                'icon' => 'analytics',
                'route' => 'mobile.analytics.index',
            ],
            [
                'id' => 'manage_staff',
                'title' => 'Manage Staff',
                'icon' => 'staff',
                'route' => 'mobile.staff.index',
            ],
        ];
    }

    /**
     * Check if restaurant is currently open
     */
    protected function isRestaurantOpen(Restaurant $restaurant): bool
    {
        $businessHours = $restaurant->business_hours;
        if (!$businessHours) return false;

        $currentDay = strtolower(now()->format('l')); // monday, tuesday, etc.
        $currentTime = now()->format('H:i');

        if (!isset($businessHours[$currentDay])) return false;

        $hours = $businessHours[$currentDay];
        return $currentTime >= $hours['open'] && $currentTime <= $hours['close'];
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
                    // Same day
                    if (now()->format('H:i') < $openTime) {
                        return $openTime;
                    }
                } else {
                    // Future day
                    return $openTime;
                }
            }
        }

        return null;
    }
}

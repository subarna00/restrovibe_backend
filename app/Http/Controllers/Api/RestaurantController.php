<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CreateRestaurantRequest;
use App\Http\Requests\Api\UpdateRestaurantRequest;
use App\Models\Restaurant;
use App\Services\Api\RestaurantService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    use AuthorizesRequests;
    
    protected $restaurantService;

    public function __construct(RestaurantService $restaurantService)
    {
        $this->restaurantService = $restaurantService;
    }

    /**
     * Display a listing of restaurants for the current tenant
     */
    public function index(Request $request)
    {
        $restaurants = $this->restaurantService->getRestaurants($request->all());
        
        return response()->json([
            'restaurants' => $restaurants,
        ]);
    }

    /**
     * Store a newly created restaurant
     */
    public function store(CreateRestaurantRequest $request)
    {
        $restaurant = $this->restaurantService->createRestaurant($request->validated());
        
        return response()->json([
            'message' => 'Restaurant created successfully',
            'restaurant' => $restaurant,
        ], 201);
    }

    /**
     * Display the specified restaurant
     */
    public function show(Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);
        
        return response()->json([
            'restaurant' => $restaurant->load(['menuCategories', 'staff']),
        ]);
    }

    /**
     * Update the specified restaurant
     */
    public function update(UpdateRestaurantRequest $request, Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);
        
        $restaurant = $this->restaurantService->updateRestaurant($restaurant, $request->validated());
        
        return response()->json([
            'message' => 'Restaurant updated successfully',
            'restaurant' => $restaurant,
        ]);
    }

    /**
     * Remove the specified restaurant
     */
    public function destroy(Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'delete', $restaurant);
        
        $this->restaurantService->deleteRestaurant($restaurant);
        
        return response()->json([
            'message' => 'Restaurant deleted successfully',
        ]);
    }

    /**
     * Get restaurant dashboard data
     */
    public function dashboard(Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);
        
        return response()->json([
            'dashboard' => $this->restaurantService->getDashboardData($restaurant),
        ]);
    }

    /**
     * Update restaurant settings
     */
    public function updateSettings(Request $request, Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);
        
        $restaurant = $this->restaurantService->updateSettings($restaurant, $request->all());
        
        return response()->json([
            'message' => 'Settings updated successfully',
            'restaurant' => $restaurant,
        ]);
    }
}

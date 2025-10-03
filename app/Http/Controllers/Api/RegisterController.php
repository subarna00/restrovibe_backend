<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\RegisterRequest;
use App\Models\Tenant;
use App\Models\User;
use App\Models\Restaurant;
use App\Services\TenantService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisterController extends Controller
{
    protected $tenantService;

    public function __construct(TenantService $tenantService)
    {
        $this->tenantService = $tenantService;
    }

    /**
     * Handle user registration
     */
    public function store(RegisterRequest $request)
    {

        // Create tenant first
        $tenant = $this->createTenant($request);

        // Create restaurant
        $restaurant = $this->createRestaurant($request, $tenant);

        // Create user (restaurant owner)
        $user = $this->createUser($request, $tenant, $restaurant);

        // Send email verification (temporarily disabled for testing)
        // event(new Registered($user));

        // Log the user in
        Auth::login($user);

        return response()->json([
            'message' => 'Registration successful! Please verify your email.',
            'user' => $user,
            'tenant' => $tenant,
            'restaurant' => $restaurant,
        ], 201);
    }

    /**
     * Create a new tenant
     */
    protected function createTenant(Request $request): Tenant
    {
        return $this->tenantService->createTenant([
            'name' => $request->restaurant_name . ' Group',
            'domain' => $this->generateDomain($request->restaurant_name),
            'subscription_plan' => $request->subscription_plan,
            'settings' => [
                'timezone' => $request->input('timezone', 'America/New_York'),
                'currency' => $request->input('currency', 'USD'),
                'language' => $request->input('language', 'en'),
            ],
        ]);
    }

    /**
     * Create a new restaurant
     */
    protected function createRestaurant(Request $request, Tenant $tenant): Restaurant
    {
        return Restaurant::create([
            'tenant_id' => $tenant->id,
            'name' => $request->restaurant_name,
            'slug' => $this->generateSlug($request->restaurant_name),
            'description' => $request->input('restaurant_description'),
            'address' => $request->restaurant_address,
            'city' => $request->restaurant_city,
            'state' => $request->restaurant_state,
            'zip_code' => $request->restaurant_zip,
            'country' => $request->input('restaurant_country', 'US'),
            'phone' => $request->restaurant_phone,
            'email' => $request->email,
            'website' => $request->input('restaurant_website'),
            'cuisine_type' => $request->input('cuisine_type'),
            'price_range' => $request->input('price_range'),
            'status' => 'active',
            'business_hours' => $this->getDefaultBusinessHours(),
            'settings' => [
                'accepts_online_orders' => true,
                'delivery_available' => $request->input('delivery_available', false),
                'pickup_available' => true,
                'max_delivery_distance' => $request->input('max_delivery_distance', 10),
            ],
        ]);
    }

    /**
     * Create a new user
     */
    protected function createUser(Request $request, Tenant $tenant, Restaurant $restaurant): User
    {
        return User::create([
            'tenant_id' => $tenant->id,
            'restaurant_id' => $restaurant->id,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'restaurant_owner',
            'status' => 'active',
            'permissions' => $this->getOwnerPermissions(),
        ]);
    }

    /**
     * Generate a unique domain for the tenant
     */
    protected function generateDomain(string $restaurantName): string
    {
        $slug = \Str::slug($restaurantName);
        $domain = $slug . '.restrovibe.com';
        
        // Check if domain exists and make it unique
        $counter = 1;
        $originalSlug = $slug;
        
        while (Tenant::where('domain', $domain)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $domain = $slug . '.restrovibe.com';
            $counter++;
        }
        
        return $domain;
    }

    /**
     * Generate a unique slug for the restaurant
     */
    protected function generateSlug(string $restaurantName): string
    {
        $slug = \Str::slug($restaurantName);
        $originalSlug = $slug;
        $counter = 1;
        
        while (Restaurant::where('slug', $slug)->exists()) {
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
     * Get default permissions for restaurant owner
     */
    protected function getOwnerPermissions(): array
    {
        return [
            'manage_restaurant',
            'manage_menu',
            'manage_orders',
            'manage_staff',
            'manage_inventory',
            'view_reports',
            'manage_settings',
            'manage_subscription',
        ];
    }
}

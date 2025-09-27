<?php

namespace App\Services\Api\Mobile;

use App\Models\Tenant;
use App\Models\User;
use App\Models\Restaurant;
use App\Services\TenantService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    protected $tenantService;

    public function __construct(TenantService $tenantService)
    {
        $this->tenantService = $tenantService;
    }

    /**
     * Register a new user for mobile app
     */
    public function register(array $data): array
    {
        return DB::transaction(function () use ($data) {
            // Create tenant
            $tenant = $this->createTenant($data);

            // Create restaurant
            $restaurant = $this->createRestaurant($data, $tenant);

            // Create user
            $user = $this->createUser($data, $tenant, $restaurant);

            // Create access token (short-lived)
            $accessToken = $user->createToken('mobile-access', ['mobile:*'], now()->addMinutes(60))->plainTextToken;
            
            // Create refresh token (long-lived)
            $refreshToken = $user->createToken('mobile-refresh', ['mobile:refresh'], now()->addDays(30))->plainTextToken;

            return [
                'user' => $user,
                'tenant' => $tenant,
                'restaurant' => $restaurant,
                'access_token' => $accessToken,
                'refresh_token' => $refreshToken,
            ];
        });
    }

    /**
     * Login user for mobile app
     */
    public function login(array $credentials): ?array
    {
        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return null;
        }

        // Check if user is active
        if (!$user->isActive()) {
            return null;
        }

        // Check if tenant is active
        if (!$user->tenant || !$user->tenant->isActive()) {
            return null;
        }

        // Check if tenant has valid subscription
        if (!$user->tenant->hasValidSubscription()) {
            return null;
        }

        // Update last login
        $user->update(['last_login_at' => now()]);

        // Create access token (short-lived)
        $accessToken = $user->createToken('mobile-access', ['mobile:*'], now()->addMinutes(60))->plainTextToken;
        
        // Create refresh token (long-lived)
        $refreshToken = $user->createToken('mobile-refresh', ['mobile:refresh'], now()->addDays(30))->plainTextToken;

        return [
            'user' => $user,
            'tenant' => $user->tenant,
            'restaurant' => $user->restaurant,
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
        ];
    }

    /**
     * Logout user from mobile app
     */
    public function logout(User $user): void
    {
        // Revoke all mobile tokens (both access and refresh)
        $user->tokens()->whereIn('name', ['mobile-access', 'mobile-refresh'])->delete();
    }

    /**
     * Create tenant for mobile registration
     */
    protected function createTenant(array $data): Tenant
    {
        return $this->tenantService->createTenant([
            'name' => $data['restaurant_name'] . ' Group',
            'domain' => $this->generateDomain($data['restaurant_name']),
            'subscription_plan' => $data['subscription_plan'] ?? 'basic',
            'settings' => [
                'timezone' => $data['timezone'] ?? 'America/New_York',
                'currency' => $data['currency'] ?? 'USD',
                'language' => $data['language'] ?? 'en',
            ],
        ]);
    }

    /**
     * Create restaurant for mobile registration
     */
    protected function createRestaurant(array $data, Tenant $tenant): Restaurant
    {
        return Restaurant::create([
            'tenant_id' => $tenant->id,
            'name' => $data['restaurant_name'],
            'slug' => $this->generateSlug($data['restaurant_name']),
            'description' => $data['restaurant_description'] ?? null,
            'address' => $data['restaurant_address'],
            'city' => $data['restaurant_city'],
            'state' => $data['restaurant_state'],
            'zip_code' => $data['restaurant_zip'],
            'country' => $data['restaurant_country'] ?? 'US',
            'phone' => $data['restaurant_phone'],
            'email' => $data['email'],
            'website' => $data['restaurant_website'] ?? null,
            'cuisine_type' => $data['cuisine_type'] ?? null,
            'price_range' => $data['price_range'] ?? null,
            'status' => 'active',
            'business_hours' => $this->getDefaultBusinessHours(),
            'settings' => [
                'accepts_online_orders' => true,
                'delivery_available' => $data['delivery_available'] ?? false,
                'pickup_available' => true,
                'max_delivery_distance' => $data['max_delivery_distance'] ?? 10,
                'minimum_order_amount' => 0,
                'delivery_fee' => 0,
                'tax_rate' => 0.08,
                'service_fee' => 0,
                'auto_accept_orders' => false,
                'require_phone_verification' => false,
            ],
        ]);
    }

    /**
     * Create user for mobile registration
     */
    protected function createUser(array $data, Tenant $tenant, Restaurant $restaurant): User
    {
        return User::create([
            'tenant_id' => $tenant->id,
            'restaurant_id' => $restaurant->id,
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'phone' => $data['phone'] ?? null,
            'role' => 'restaurant_owner',
            'status' => 'active',
            'email_verified_at' => now(), // Auto-verify for mobile
            'permissions' => [
                'manage_restaurant',
                'manage_menu',
                'manage_orders',
                'manage_staff',
                'manage_inventory',
                'view_reports',
                'manage_settings',
                'manage_subscription',
            ],
        ]);
    }

    /**
     * Generate unique domain
     */
    protected function generateDomain(string $restaurantName): string
    {
        $slug = \Str::slug($restaurantName);
        $domain = $slug . '.restrovibe.com';
        
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
     * Generate unique slug
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
}

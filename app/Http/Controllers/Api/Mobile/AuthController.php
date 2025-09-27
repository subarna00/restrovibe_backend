<?php

namespace App\Http\Controllers\Api\Mobile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Mobile\LoginRequest;
use App\Http\Requests\Api\Mobile\RegisterRequest;
use App\Models\Tenant;
use App\Models\User;
use App\Models\Restaurant;
use App\Services\Api\Mobile\AuthService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use ApiResponse;
    
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Mobile user registration
     */
    public function register(RegisterRequest $request)
    {
        $result = $this->authService->register($request->validated());
        
        return $this->successResponse([
            'user' => $this->formatUserForMobile($result['user']),
            'tenant' => $this->formatTenantForMobile($result['tenant']),
            'restaurant' => $this->formatRestaurantForMobile($result['restaurant']),
            'access_token' => $result['access_token'],
            'refresh_token' => $result['refresh_token'],
            'token_type' => 'Bearer',
            'expires_in' => 3600, // 1 hour in seconds
        ], 'Registration successful', 201);
    }

    /**
     * Mobile user login
     */
    public function login(LoginRequest $request)
    {
        $result = $this->authService->login($request->validated());
        
        if (!$result) {
            return $this->unauthorizedResponse('Invalid credentials');
        }

        return $this->successResponse([
            'user' => $this->formatUserForMobile($result['user']),
            'tenant' => $this->formatTenantForMobile($result['tenant']),
            'restaurant' => $result['restaurant'] ? $this->formatRestaurantForMobile($result['restaurant']) : null,
            'access_token' => $result['access_token'],
            'refresh_token' => $result['refresh_token'],
            'token_type' => 'Bearer',
            'expires_in' => 3600, // 1 hour in seconds
        ], 'Login successful');
    }

    /**
     * Mobile user logout
     */
    public function logout(Request $request)
    {
        $this->authService->logout($request->user());
        
        return $this->successResponse(null, 'Logged out successfully');
    }

    /**
     * Get current user profile
     */
    public function profile(Request $request)
    {
        $user = $request->user();
        
        return $this->successResponse([
            'user' => $this->formatUserForMobile($user),
            'tenant' => $this->formatTenantForMobile($user->tenant),
            'restaurant' => $user->restaurant ? $this->formatRestaurantForMobile($user->restaurant) : null,
        ], 'User profile retrieved successfully');
    }

    /**
     * Refresh authentication token
     */
    public function refresh(Request $request)
    {
        $user = $request->user();
        
        // Verify the current token is a refresh token
        $currentToken = $user->currentAccessToken();
        if (!$currentToken || !in_array('mobile:refresh', $currentToken->abilities)) {
            return $this->unauthorizedResponse('Invalid refresh token');
        }
        
        // Revoke current refresh token
        $currentToken->delete();
        
        // Create new access token
        $accessToken = $user->createToken('mobile-access', ['mobile:*'], now()->addMinutes(60))->plainTextToken;
        
        // Create new refresh token
        $refreshToken = $user->createToken('mobile-refresh', ['mobile:refresh'], now()->addDays(30))->plainTextToken;
        
        return $this->successResponse([
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
            'token_type' => 'Bearer',
            'expires_in' => 3600, // 1 hour in seconds
        ], 'Token refreshed successfully');
    }

    /**
     * Format user data for mobile response
     */
    protected function formatUserForMobile(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'avatar' => $user->avatar,
            'role' => $user->role,
            'role_name' => $user->role_name,
            'status' => $user->status,
            'permissions' => $user->permissions,
            'last_login_at' => $user->last_login_at?->toISOString(),
            'created_at' => $user->created_at->toISOString(),
        ];
    }

    /**
     * Format tenant data for mobile response
     */
    protected function formatTenantForMobile(Tenant $tenant): array
    {
        return [
            'id' => $tenant->id,
            'name' => $tenant->name,
            'slug' => $tenant->slug,
            'domain' => $tenant->domain,
            'status' => $tenant->status,
            'subscription_plan' => $tenant->subscription_plan,
            'subscription_status' => $tenant->subscription_status,
            'subscription_expires_at' => $tenant->subscription_expires_at?->toISOString(),
            'settings' => $tenant->settings,
            'primary_color' => $tenant->primary_color,
            'secondary_color' => $tenant->secondary_color,
        ];
    }

    /**
     * Format restaurant data for mobile response
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
            'business_hours' => $restaurant->business_hours,
            'settings' => $restaurant->settings,
        ];
    }
}

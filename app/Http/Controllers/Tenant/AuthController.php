<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tenant\TenantLoginRequest;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * @group Tenant Authentication
 * 
 * Authentication endpoints for tenant users (restaurant owners, managers, and staff).
 * These endpoints allow tenant users to access their restaurant management features.
 */
class AuthController extends Controller
{
    use ApiResponse;
    /**
     * Tenant user login
     */
    public function login(TenantLoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        // Find user by email
        $user = User::where('email', $credentials['email'])->first();

        // Verify credentials
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        // Check if user is active
        if (!$user->isActive()) {
            throw ValidationException::withMessages([
                'email' => 'Your account is inactive. Please contact support.',
            ]);
        }

        // Check if user has a valid tenant
        if (!$user->tenant) {
            throw ValidationException::withMessages([
                'email' => 'No valid tenant found for your account.',
            ]);
        }

        // Check if tenant is active
        if (!$user->tenant->isActive()) {
            throw ValidationException::withMessages([
                'email' => 'Your tenant account is inactive.',
            ]);
        }

        // Check if tenant has valid subscription
        if (!$user->tenant->hasValidSubscription()) {
            throw ValidationException::withMessages([
                'email' => 'Your subscription has expired. Please renew to continue.',
            ]);
        }

        // Create access token with appropriate scopes (short-lived)
        $scopes = $this->getUserScopes($user);
        $accessToken = $user->createToken('tenant-access', $scopes, now()->addMinutes(60))->plainTextToken;
        
        // Create refresh token (long-lived)
        $refreshToken = $user->createToken('tenant-refresh', ['tenant:refresh'], now()->addDays(30))->plainTextToken;

        // Update last login
        $user->update(['last_login_at' => now()]);

        return $this->successResponse([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'role_name' => $user->role_name,
                'permissions' => $user->permissions,
                'last_login_at' => $user->last_login_at,
            ],
            'tenant' => [
                'id' => $user->tenant->id,
                'name' => $user->tenant->name,
                'slug' => $user->tenant->slug,
                'subscription_plan' => $user->tenant->subscription_plan,
                'subscription_status' => $user->tenant->subscription_status,
            ],
            'restaurant' => $user->restaurant ? [
                'id' => $user->restaurant->id,
                'name' => $user->restaurant->name,
                'slug' => $user->restaurant->slug,
                'status' => $user->restaurant->status,
            ] : null,
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
            'token_type' => 'Bearer',
            'expires_in' => 3600, // 1 hour in seconds
        ], 'Login successful');
    }

    /**
     * Tenant user logout
     */
    public function logout(Request $request)
    {
        $user = $request->user();
        
        if ($user) {
            // Revoke all tenant tokens (both access and refresh)
            $user->tokens()->whereIn('name', ['tenant-access', 'tenant-refresh'])->delete();
        }

        return $this->successResponse(null, 'Logged out successfully');
    }

    /**
     * Get current tenant user
     */
    public function me(Request $request)
    {
        $user = $request->user();

        return $this->successResponse([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'role_name' => $user->role_name,
                'permissions' => $user->permissions,
                'last_login_at' => $user->last_login_at,
            ],
            'tenant' => [
                'id' => $user->tenant->id,
                'name' => $user->tenant->name,
                'slug' => $user->tenant->slug,
                'subscription_plan' => $user->tenant->subscription_plan,
                'subscription_status' => $user->tenant->subscription_status,
            ],
            'restaurant' => $user->restaurant ? [
                'id' => $user->restaurant->id,
                'name' => $user->restaurant->name,
                'slug' => $user->restaurant->slug,
                'status' => $user->restaurant->status,
            ] : null,
        ], 'Tenant user retrieved successfully');
    }

    /**
     * Refresh tenant token
     */
    public function refresh(Request $request)
    {
        $user = $request->user();
        
        // Verify the current token is a refresh token
        $currentToken = $user->currentAccessToken();
        if (!$currentToken || !in_array('tenant:refresh', $currentToken->abilities)) {
            return $this->unauthorizedResponse('Invalid refresh token');
        }
        
        // Revoke current refresh token
        $currentToken->delete();
        
        // Create new access token with appropriate scopes
        $scopes = $this->getUserScopes($user);
        $accessToken = $user->createToken('tenant-access', $scopes, now()->addMinutes(60))->plainTextToken;
        
        // Create new refresh token
        $refreshToken = $user->createToken('tenant-refresh', ['tenant:refresh'], now()->addDays(30))->plainTextToken;

        return $this->successResponse([
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
            'token_type' => 'Bearer',
            'expires_in' => 3600, // 1 hour in seconds
        ], 'Token refreshed successfully');
    }

    /**
     * Get user scopes based on role
     */
    protected function getUserScopes(User $user): array
    {
        $baseScopes = ['tenant:read'];

        switch ($user->role) {
            case 'restaurant_owner':
                return array_merge($baseScopes, [
                    'restaurant:*',
                    'menu:*',
                    'orders:*',
                    'staff:*',
                    'analytics:*',
                    'settings:*',
                ]);

            case 'manager':
                return array_merge($baseScopes, [
                    'restaurant:read',
                    'menu:*',
                    'orders:*',
                    'staff:read',
                    'analytics:read',
                    'settings:read',
                ]);

            case 'staff':
                return array_merge($baseScopes, [
                    'restaurant:read',
                    'menu:read',
                    'orders:read',
                    'orders:update',
                ]);

            default:
                return $baseScopes;
        }
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminLoginRequest;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * @group Admin Authentication
 * 
 * Authentication endpoints for super admin users.
 * These endpoints allow super admins to manage the entire RestroVibe platform.
 */
class AuthController extends Controller
{
    use ApiResponse;
    /**
     * Admin Login
     * 
     * Authenticate a super admin user and return an access token.
     * 
     * @bodyParam email string required The admin's email address. Example: admin@restrovibe.com
     * @bodyParam password string required The admin's password. Example: password
     * 
     * @response 200 {
     *   "data": {
     *     "user": {
     *       "id": 1,
     *       "name": "Super Admin",
     *       "email": "admin@restrovibe.com",
     *       "role": "super_admin"
     *     },
     *     "access_token": "1|abc123...",
     *     "token_type": "Bearer"
     *   },
     *   "message": "Login successful",
     *   "status": "success",
     *   "statusCode": 200
     * }
     * 
     * @response 401 {
     *   "data": null,
     *   "message": "Invalid credentials",
     *   "status": "failed",
     *   "statusCode": 401
     * }
     */
    public function login(AdminLoginRequest $request)
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

        // Verify user is super admin
        if (!$user->isSuperAdmin()) {
            throw ValidationException::withMessages([
                'email' => 'Access denied. Super admin privileges required.',
            ]);
        }

        // Check if user is active
        if (!$user->isActive()) {
            throw ValidationException::withMessages([
                'email' => 'Your account is inactive. Please contact support.',
            ]);
        }

        // Create access token (short-lived)
        $accessToken = $user->createToken('admin-access', ['admin:*'], now()->addMinutes(60))->plainTextToken;
        
        // Create refresh token (long-lived)
        $refreshToken = $user->createToken('admin-refresh', ['admin:refresh'], now()->addDays(30))->plainTextToken;

        // Update last login
        $user->update(['last_login_at' => now()]);

        return $this->successResponse([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'role_name' => $user->role_name,
                'last_login_at' => $user->last_login_at,
            ],
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
            'token_type' => 'Bearer',
            'expires_in' => 3600, // 1 hour in seconds
            'permissions' => [
                'manage_tenants' => true,
                'view_analytics' => true,
                'manage_system' => true,
                'switch_tenants' => true,
            ],
        ], 'Admin login successful');
    }

    /**
     * Admin Logout
     * 
     * Revoke the current admin's access token.
     * 
     * @authenticated
     * 
     * @response 200 {
     *   "data": null,
     *   "message": "Logout successful",
     *   "status": "success",
     *   "statusCode": 200
     * }
     */
    public function logout(Request $request)
    {
        $user = $request->user();
        
        if ($user) {
            // Revoke all admin tokens (both access and refresh)
            $user->tokens()->whereIn('name', ['admin-access', 'admin-refresh'])->delete();
        }

        return $this->successResponse(null, 'Admin logged out successfully');
    }

    /**
     * Get Current Admin
     * 
     * Get the currently authenticated admin user's information.
     * 
     * @authenticated
     * 
     * @response 200 {
     *   "data": {
     *     "user": {
     *       "id": 1,
     *       "name": "Super Admin",
     *       "email": "admin@restrovibe.com",
     *       "role": "super_admin",
     *       "permissions": ["manage_tenants", "view_analytics", "system_settings"]
     *     }
     *   },
     *   "message": "Admin information retrieved successfully",
     *   "status": "success",
     *   "statusCode": 200
     * }
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
                'last_login_at' => $user->last_login_at,
                'created_at' => $user->created_at,
            ],
            'permissions' => [
                'manage_tenants' => true,
                'view_analytics' => true,
                'manage_system' => true,
                'switch_tenants' => true,
            ],
        ], 'Admin user retrieved successfully');
    }

    /**
     * Refresh Admin Token
     * 
     * Refresh the current admin's access token using a valid refresh token.
     * 
     * @bodyParam refresh_token string required The refresh token. Example: def456...
     * 
     * @response 200 {
     *   "data": {
     *     "access_token": "2|xyz789...",
     *     "token_type": "Bearer",
     *     "expires_in": 3600
     *   },
     *   "message": "Token refreshed successfully",
     *   "status": "success",
     *   "statusCode": 200
     * }
     * 
     * @response 401 {
     *   "data": null,
     *   "message": "Invalid refresh token",
     *   "status": "failed",
     *   "statusCode": 401
     * }
     */
    public function refresh(Request $request)
    {
        $user = $request->user();
        
        // Verify the current token is a refresh token
        $currentToken = $user->currentAccessToken();
        if (!$currentToken || !in_array('admin:refresh', $currentToken->abilities)) {
            return $this->unauthorizedResponse('Invalid refresh token');
        }
        
        // Revoke current refresh token
        $currentToken->delete();
        
        // Create new access token
        $accessToken = $user->createToken('admin-access', ['admin:*'], now()->addMinutes(60))->plainTextToken;
        
        // Create new refresh token
        $refreshToken = $user->createToken('admin-refresh', ['admin:refresh'], now()->addDays(30))->plainTextToken;

        return $this->successResponse([
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
            'token_type' => 'Bearer',
            'expires_in' => 3600, // 1 hour in seconds
        ], 'Token refreshed successfully');
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    /**
     * Handle user login
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $credentials = $request->only('email', 'password');
        $remember = $request->boolean('remember');

        if (!Auth::attempt($credentials, $remember)) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        $user = Auth::user();

        // Check if user is active
        if (!$user->isActive()) {
            Auth::logout();
            throw ValidationException::withMessages([
                'email' => 'Your account is inactive. Please contact support.',
            ]);
        }

        // Check if user has a valid tenant
        if (!$user->tenant) {
            Auth::logout();
            throw ValidationException::withMessages([
                'email' => 'No valid tenant found for your account.',
            ]);
        }

        // Check if tenant is active
        if (!$user->tenant->isActive()) {
            Auth::logout();
            throw ValidationException::withMessages([
                'email' => 'Your tenant account is inactive.',
            ]);
        }

        // Check if tenant has valid subscription
        if (!$user->tenant->hasValidSubscription()) {
            Auth::logout();
            throw ValidationException::withMessages([
                'email' => 'Your subscription has expired. Please renew to continue.',
            ]);
        }

        // Update last login time
        $user->update(['last_login_at' => now()]);

        // Regenerate session
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Login successful',
            'user' => $user->load(['tenant', 'restaurant']),
            'redirect' => $this->getRedirectPath($user),
        ]);
    }

    /**
     * Handle user logout
     */
    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }

    /**
     * Get redirect path based on user role
     */
    protected function getRedirectPath(User $user): string
    {
        return match($user->role) {
            'super_admin' => '/admin/dashboard',
            'restaurant_owner' => '/restaurant/dashboard',
            'manager' => '/restaurant/orders',
            'staff' => '/restaurant/orders',
            'customer' => '/customer/dashboard',
            default => '/dashboard',
        };
    }
}

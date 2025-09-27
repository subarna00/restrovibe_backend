<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Tenant;
use Symfony\Component\HttpFoundation\Response;

class TenantMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Skip tenant validation for super admin
        if (Auth::check() && Auth::user()->isSuperAdmin()) {
            return $next($request);
        }

        // Ensure user is authenticated
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();
        $tenant = $user->tenant;

        // Check if user has a valid tenant
        if (!$tenant) {
            Auth::logout();
            return redirect()->route('login')->with('error', 'No valid tenant found for your account.');
        }

        // Check if tenant is active
        if (!$tenant->isActive()) {
            Auth::logout();
            return redirect()->route('login')->with('error', 'Your tenant account is inactive.');
        }

        // Check if tenant has valid subscription
        if (!$tenant->hasValidSubscription()) {
            return redirect()->route('subscription.expired')->with('error', 'Your subscription has expired.');
        }

        // Set tenant in request for easy access
        $request->merge(['current_tenant' => $tenant]);

        return $next($request);
    }
}

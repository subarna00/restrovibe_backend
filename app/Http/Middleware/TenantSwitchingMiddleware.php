<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Tenant;
use Symfony\Component\HttpFoundation\Response;

class TenantSwitchingMiddleware
{
    /**
     * Handle an incoming request for tenant switching (Super Admin only)
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Only allow super admin to switch tenants
        if (!Auth::check() || !Auth::user()->isSuperAdmin()) {
            abort(403, 'Unauthorized access to tenant switching.');
        }

        $tenantId = $request->route('tenant_id') ?? $request->input('tenant_id');

        if ($tenantId) {
            $tenant = Tenant::find($tenantId);
            
            if (!$tenant) {
                abort(404, 'Tenant not found.');
            }

            // Store the switched tenant in session
            session(['switched_tenant_id' => $tenantId]);
            $request->merge(['current_tenant' => $tenant]);
        }

        return $next($request);
    }
}

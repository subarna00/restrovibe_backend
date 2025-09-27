<?php

namespace App\Helpers;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TenantContext
{
    private static ?Tenant $currentTenant = null;

    /**
     * Get the current tenant
     */
    public static function getCurrentTenant(): ?Tenant
    {
        if (self::$currentTenant) {
            return self::$currentTenant;
        }

        if (!Auth::check()) {
            return null;
        }

        $user = Auth::user();

        // Check if super admin is switching tenants
        if ($user->isSuperAdmin() && session('switched_tenant_id')) {
            self::$currentTenant = Tenant::find(session('switched_tenant_id'));
            return self::$currentTenant;
        }

        self::$currentTenant = $user->tenant;
        return self::$currentTenant;
    }

    /**
     * Set the current tenant (for super admin switching)
     */
    public static function setCurrentTenant(Tenant $tenant): void
    {
        self::$currentTenant = $tenant;
    }

    /**
     * Clear the current tenant
     */
    public static function clearCurrentTenant(): void
    {
        self::$currentTenant = null;
    }

    /**
     * Get the current tenant ID
     */
    public static function getCurrentTenantId(): ?int
    {
        $tenant = self::getCurrentTenant();
        return $tenant?->id;
    }

    /**
     * Check if we're in tenant switching mode
     */
    public static function isSwitchingTenant(): bool
    {
        return Auth::check() && 
               Auth::user()->isSuperAdmin() && 
               session()->has('switched_tenant_id');
    }

    /**
     * Get the original tenant (before switching)
     */
    public static function getOriginalTenant(): ?Tenant
    {
        if (!Auth::check()) {
            return null;
        }

        return Auth::user()->tenant;
    }

    /**
     * Check if current user can access tenant data
     */
    public static function canAccessTenant(int $tenantId): bool
    {
        if (!Auth::check()) {
            return false;
        }

        $user = Auth::user();

        // Super admin can access any tenant
        if ($user->isSuperAdmin()) {
            return true;
        }

        // Regular users can only access their own tenant
        return $user->tenant_id === $tenantId;
    }

    /**
     * Get tenant-aware database connection
     */
    public static function getTenantConnection(): string
    {
        // For now, we use the default connection
        // In the future, this could return different connections per tenant
        return 'mysql';
    }

    /**
     * Execute a callback with a specific tenant context
     */
    public static function withTenant(Tenant $tenant, callable $callback)
    {
        $originalTenant = self::$currentTenant;
        self::$currentTenant = $tenant;

        try {
            return $callback();
        } finally {
            self::$currentTenant = $originalTenant;
        }
    }
}

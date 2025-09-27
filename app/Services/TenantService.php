<?php

namespace App\Services;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TenantService
{
    /**
     * Get the current tenant for the authenticated user
     */
    public function getCurrentTenant(): ?Tenant
    {
        if (!Auth::check()) {
            return null;
        }

        $user = Auth::user();

        // Check if super admin is switching tenants
        if ($user->isSuperAdmin() && session('switched_tenant_id')) {
            return Tenant::find(session('switched_tenant_id'));
        }

        return $user->tenant;
    }

    /**
     * Switch to a different tenant (Super Admin only)
     */
    public function switchTenant(int $tenantId): bool
    {
        $user = Auth::user();

        if (!$user || !$user->isSuperAdmin()) {
            return false;
        }

        $tenant = Tenant::find($tenantId);
        if (!$tenant) {
            return false;
        }

        session(['switched_tenant_id' => $tenantId]);
        return true;
    }

    /**
     * Stop tenant switching and return to original tenant
     */
    public function stopTenantSwitching(): void
    {
        session()->forget('switched_tenant_id');
    }

    /**
     * Create a new tenant
     */
    public function createTenant(array $data): Tenant
    {
        return DB::transaction(function () use ($data) {
            $tenant = Tenant::create([
                'name' => $data['name'],
                'slug' => $this->generateUniqueSlug($data['name']),
                'domain' => $data['domain'] ?? null,
                'status' => 'active',
                'subscription_plan' => $data['subscription_plan'] ?? 'basic',
                'subscription_status' => 'active',
                'subscription_expires_at' => now()->addYear(),
                'settings' => $data['settings'] ?? [],
            ]);

            return $tenant;
        });
    }

    /**
     * Generate a unique slug for tenant
     */
    private function generateUniqueSlug(string $name): string
    {
        $slug = \Str::slug($name);
        $originalSlug = $slug;
        $counter = 1;

        while (Tenant::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    /**
     * Get tenant statistics
     */
    public function getTenantStats(Tenant $tenant): array
    {
        return [
            'restaurants_count' => $tenant->restaurants()->count(),
            'users_count' => $tenant->users()->count(),
            'active_restaurants' => $tenant->restaurants()->where('status', 'active')->count(),
            'subscription_status' => $tenant->subscription_status,
            'subscription_expires_at' => $tenant->subscription_expires_at,
        ];
    }

    /**
     * Check if tenant can perform action based on subscription
     */
    public function canPerformAction(Tenant $tenant, string $action): bool
    {
        $plan = $tenant->subscription_plan;
        
        $limits = [
            'basic' => [
                'restaurants' => 1,
                'users' => 5,
                'orders_per_month' => 1000,
            ],
            'professional' => [
                'restaurants' => 5,
                'users' => 25,
                'orders_per_month' => 10000,
            ],
            'enterprise' => [
                'restaurants' => -1, // unlimited
                'users' => -1, // unlimited
                'orders_per_month' => -1, // unlimited
            ],
        ];

        $limit = $limits[$plan][$action] ?? 0;

        if ($limit === -1) {
            return true; // unlimited
        }

        switch ($action) {
            case 'restaurants':
                return $tenant->restaurants()->count() < $limit;
            case 'users':
                return $tenant->users()->count() < $limit;
            case 'orders_per_month':
                // This would need to be implemented based on your order tracking
                return true; // Placeholder
            default:
                return false;
        }
    }
}

<?php

namespace App\Services\Admin;

use App\Models\Tenant;
use App\Models\User;
use App\Models\Restaurant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TenantService
{
    /**
     * Get all tenants with pagination and filters
     */
    public function getAllTenants(array $filters = [])
    {
        $query = Tenant::with(['restaurants', 'users']);

        // Apply filters
        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['subscription_plan'])) {
            $query->where('subscription_plan', $filters['subscription_plan']);
        }

        if (isset($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%")
                  ->orWhere('domain', 'like', "%{$search}%");
            });
        }

        return $query->paginate($filters['per_page'] ?? 15);
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
                'status' => $data['status'] ?? 'active',
                'subscription_plan' => $data['subscription_plan'] ?? 'basic',
                'subscription_status' => $data['subscription_status'] ?? 'active',
                'subscription_expires_at' => $data['subscription_expires_at'] ?? now()->addYear(),
                'settings' => $data['settings'] ?? [],
                'primary_color' => $data['primary_color'] ?? '#3B82F6',
                'secondary_color' => $data['secondary_color'] ?? '#1E40AF',
            ]);

            // Create owner user if provided
            if (isset($data['owner'])) {
                $this->createOwnerUser($tenant, $data['owner']);
            }

            return $tenant;
        });
    }

    /**
     * Update tenant
     */
    public function updateTenant(Tenant $tenant, array $data): Tenant
    {
        $tenant->update($data);
        return $tenant->fresh();
    }

    /**
     * Delete tenant
     */
    public function deleteTenant(Tenant $tenant): void
    {
        DB::transaction(function () use ($tenant) {
            // Soft delete all related data
            $tenant->restaurants()->delete();
            $tenant->users()->delete();
            $tenant->delete();
        });
    }

    /**
     * Suspend tenant
     */
    public function suspendTenant(Tenant $tenant): void
    {
        $tenant->update(['status' => 'suspended']);
    }

    /**
     * Activate tenant
     */
    public function activateTenant(Tenant $tenant): void
    {
        $tenant->update(['status' => 'active']);
    }

    /**
     * Switch to tenant (Super Admin only)
     */
    public function switchToTenant(Tenant $tenant): void
    {
        session(['switched_tenant_id' => $tenant->id]);
    }

    /**
     * Get tenant statistics
     */
    public function getTenantStats(?Tenant $tenant = null): array
    {
        if ($tenant) {
            return [
                'restaurants_count' => $tenant->restaurants()->count(),
                'users_count' => $tenant->users()->count(),
                'active_restaurants' => $tenant->restaurants()->where('status', 'active')->count(),
                'subscription_status' => $tenant->subscription_status,
                'subscription_expires_at' => $tenant->subscription_expires_at,
                'created_at' => $tenant->created_at,
            ];
        }

        return [
            'total_tenants' => Tenant::count(),
            'active_tenants' => Tenant::where('status', 'active')->count(),
            'suspended_tenants' => Tenant::where('status', 'suspended')->count(),
            'total_restaurants' => Restaurant::count(),
            'total_users' => User::count(),
            'subscription_plans' => [
                'basic' => Tenant::where('subscription_plan', 'basic')->count(),
                'professional' => Tenant::where('subscription_plan', 'professional')->count(),
                'enterprise' => Tenant::where('subscription_plan', 'enterprise')->count(),
            ],
        ];
    }

    /**
     * Get tenant analytics
     */
    public function getTenantAnalytics(Tenant $tenant): array
    {
        return [
            'growth' => [
                'restaurants' => $this->getGrowthData($tenant->restaurants()),
                'users' => $this->getGrowthData($tenant->users()),
            ],
            'subscription' => [
                'plan' => $tenant->subscription_plan,
                'status' => $tenant->subscription_status,
                'expires_at' => $tenant->subscription_expires_at,
                'days_remaining' => $tenant->subscription_expires_at ? 
                    now()->diffInDays($tenant->subscription_expires_at, false) : null,
            ],
            'activity' => [
                'last_login' => $tenant->users()->max('last_login_at'),
                'created_at' => $tenant->created_at,
            ],
        ];
    }

    /**
     * Create owner user for tenant
     */
    protected function createOwnerUser(Tenant $tenant, array $ownerData): User
    {
        return User::create([
            'tenant_id' => $tenant->id,
            'name' => $ownerData['name'],
            'email' => $ownerData['email'],
            'password' => Hash::make($ownerData['password']),
            'role' => 'restaurant_owner',
            'status' => 'active',
            'email_verified_at' => now(),
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
     * Generate unique slug
     */
    protected function generateUniqueSlug(string $name): string
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
     * Get growth data for a model
     */
    protected function getGrowthData($query): array
    {
        $currentMonth = $query->whereMonth('created_at', now()->month)->count();
        $lastMonth = $query->whereMonth('created_at', now()->subMonth()->month)->count();
        
        $growth = $lastMonth > 0 ? (($currentMonth - $lastMonth) / $lastMonth) * 100 : 0;

        return [
            'current' => $currentMonth,
            'previous' => $lastMonth,
            'growth_percentage' => round($growth, 2),
        ];
    }
}

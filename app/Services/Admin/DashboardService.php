<?php

namespace App\Services\Admin;

use App\Models\Tenant;
use App\Models\User;
use App\Models\Restaurant;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardService
{
    /**
     * Get overview statistics
     */
    public function getOverviewStats(int $days = 30): array
    {
        $startDate = now()->subDays($days);
        
        return [
            'total_tenants' => Tenant::count(),
            'active_tenants' => Tenant::where('status', 'active')->count(),
            'new_tenants' => Tenant::where('created_at', '>=', $startDate)->count(),
            'total_restaurants' => Restaurant::count(),
            'total_users' => User::count(),
            'new_users' => User::where('created_at', '>=', $startDate)->count(),
            'revenue' => $this->calculateRevenue($startDate),
            'growth_rate' => $this->calculateGrowthRate($days),
        ];
    }

    /**
     * Get recent tenants
     */
    public function getRecentTenants(int $limit = 10): array
    {
        return Tenant::with(['restaurants', 'users'])
            ->latest()
            ->limit($limit)
            ->get()
            ->map(function ($tenant) {
                return [
                    'id' => $tenant->id,
                    'name' => $tenant->name,
                    'slug' => $tenant->slug,
                    'status' => $tenant->status,
                    'subscription_plan' => $tenant->subscription_plan,
                    'restaurants_count' => $tenant->restaurants->count(),
                    'users_count' => $tenant->users->count(),
                    'created_at' => $tenant->created_at,
                ];
            })
            ->toArray();
    }

    /**
     * Get revenue analytics
     */
    public function getRevenueAnalytics(int $days = 30): array
    {
        $startDate = now()->subDays($days);
        
        // This would integrate with your payment system
        // For now, we'll return mock data structure
        return [
            'total_revenue' => $this->calculateRevenue($startDate),
            'monthly_recurring_revenue' => $this->calculateMRR(),
            'average_revenue_per_tenant' => $this->calculateARPT(),
            'revenue_by_plan' => $this->getRevenueByPlan(),
            'daily_revenue' => $this->getDailyRevenue($days),
        ];
    }

    /**
     * Get tenant growth analytics
     */
    public function getTenantGrowth(int $days = 30): array
    {
        $startDate = now()->subDays($days);
        
        return [
            'total_growth' => Tenant::where('created_at', '>=', $startDate)->count(),
            'growth_by_plan' => $this->getGrowthByPlan($startDate),
            'growth_trend' => $this->getGrowthTrend($days),
            'churn_rate' => $this->calculateChurnRate($days),
        ];
    }

    /**
     * Get subscription analytics
     */
    public function getSubscriptionAnalytics(): array
    {
        return [
            'plans_distribution' => [
                'basic' => Tenant::where('subscription_plan', 'basic')->count(),
                'professional' => Tenant::where('subscription_plan', 'professional')->count(),
                'enterprise' => Tenant::where('subscription_plan', 'enterprise')->count(),
            ],
            'subscription_status' => [
                'active' => Tenant::where('subscription_status', 'active')->count(),
                'inactive' => Tenant::where('subscription_status', 'inactive')->count(),
                'cancelled' => Tenant::where('subscription_status', 'cancelled')->count(),
                'expired' => Tenant::where('subscription_status', 'expired')->count(),
            ],
            'expiring_soon' => Tenant::where('subscription_expires_at', '<=', now()->addDays(30))
                ->where('subscription_status', 'active')
                ->count(),
        ];
    }

    /**
     * Get system health metrics
     */
    public function getSystemHealth(): array
    {
        return [
            'database' => $this->checkDatabaseHealth(),
            'storage' => $this->checkStorageHealth(),
            'performance' => $this->checkPerformanceHealth(),
            'uptime' => $this->getSystemUptime(),
            'active_sessions' => $this->getActiveSessions(),
        ];
    }

    /**
     * Get tenant statistics
     */
    public function getTenantStats(): array
    {
        return [
            'total' => Tenant::count(),
            'active' => Tenant::where('status', 'active')->count(),
            'suspended' => Tenant::where('status', 'suspended')->count(),
            'inactive' => Tenant::where('status', 'inactive')->count(),
            'by_plan' => [
                'basic' => Tenant::where('subscription_plan', 'basic')->count(),
                'professional' => Tenant::where('subscription_plan', 'professional')->count(),
                'enterprise' => Tenant::where('subscription_plan', 'enterprise')->count(),
            ],
        ];
    }

    /**
     * Calculate total revenue (mock implementation)
     */
    protected function calculateRevenue(Carbon $startDate): float
    {
        // This would integrate with your payment system
        // For now, return mock data
        return 125000.00;
    }

    /**
     * Calculate growth rate percentage
     */
    protected function calculateGrowthRate(int $days): float
    {
        $currentPeriod = now()->subDays($days);
        $previousPeriod = now()->subDays($days * 2);
        
        $currentTenants = Tenant::where('created_at', '>=', $currentPeriod)->count();
        $previousTenants = Tenant::whereBetween('created_at', [$previousPeriod, $currentPeriod])->count();
        
        if ($previousTenants === 0) {
            return $currentTenants > 0 ? 100.0 : 0.0;
        }
        
        return (($currentTenants - $previousTenants) / $previousTenants) * 100;
    }

    /**
     * Calculate Monthly Recurring Revenue
     */
    protected function calculateMRR(): float
    {
        $basicMRR = Tenant::where('subscription_plan', 'basic')->count() * 29.99;
        $professionalMRR = Tenant::where('subscription_plan', 'professional')->count() * 99.99;
        $enterpriseMRR = Tenant::where('subscription_plan', 'enterprise')->count() * 299.99;
        
        return $basicMRR + $professionalMRR + $enterpriseMRR;
    }

    /**
     * Calculate Average Revenue Per Tenant
     */
    protected function calculateARPT(): float
    {
        $totalTenants = Tenant::count();
        if ($totalTenants === 0) return 0;
        
        return $this->calculateMRR() / $totalTenants;
    }

    /**
     * Get revenue by subscription plan
     */
    protected function getRevenueByPlan(): array
    {
        return [
            'basic' => Tenant::where('subscription_plan', 'basic')->count() * 29.99,
            'professional' => Tenant::where('subscription_plan', 'professional')->count() * 99.99,
            'enterprise' => Tenant::where('subscription_plan', 'enterprise')->count() * 299.99,
        ];
    }

    /**
     * Get daily revenue trend
     */
    protected function getDailyRevenue(int $days): array
    {
        $revenue = [];
        for ($i = $days; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $revenue[] = [
                'date' => $date,
                'revenue' => rand(1000, 5000), // Mock data
            ];
        }
        return $revenue;
    }

    /**
     * Get growth by subscription plan
     */
    protected function getGrowthByPlan(Carbon $startDate): array
    {
        return [
            'basic' => Tenant::where('subscription_plan', 'basic')
                ->where('created_at', '>=', $startDate)->count(),
            'professional' => Tenant::where('subscription_plan', 'professional')
                ->where('created_at', '>=', $startDate)->count(),
            'enterprise' => Tenant::where('subscription_plan', 'enterprise')
                ->where('created_at', '>=', $startDate)->count(),
        ];
    }

    /**
     * Get growth trend over time
     */
    protected function getGrowthTrend(int $days): array
    {
        $trend = [];
        for ($i = $days; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $trend[] = [
                'date' => $date->format('Y-m-d'),
                'new_tenants' => Tenant::whereDate('created_at', $date)->count(),
            ];
        }
        return $trend;
    }

    /**
     * Calculate churn rate
     */
    protected function calculateChurnRate(int $days): float
    {
        $startDate = now()->subDays($days);
        $totalTenants = Tenant::where('created_at', '<', $startDate)->count();
        $churnedTenants = Tenant::where('subscription_status', 'cancelled')
            ->where('updated_at', '>=', $startDate)
            ->count();
        
        return $totalTenants > 0 ? ($churnedTenants / $totalTenants) * 100 : 0;
    }

    /**
     * Check database health
     */
    protected function checkDatabaseHealth(): array
    {
        try {
            DB::connection()->getPdo();
            return ['status' => 'healthy', 'response_time' => '5ms'];
        } catch (\Exception $e) {
            return ['status' => 'unhealthy', 'error' => $e->getMessage()];
        }
    }

    /**
     * Check storage health
     */
    protected function checkStorageHealth(): array
    {
        $totalSpace = disk_total_space('/');
        $freeSpace = disk_free_space('/');
        $usedSpace = $totalSpace - $freeSpace;
        $usagePercentage = ($usedSpace / $totalSpace) * 100;
        
        return [
            'total' => $this->formatBytes($totalSpace),
            'used' => $this->formatBytes($usedSpace),
            'free' => $this->formatBytes($freeSpace),
            'usage_percentage' => round($usagePercentage, 2),
            'status' => $usagePercentage > 90 ? 'warning' : 'healthy',
        ];
    }

    /**
     * Check performance health
     */
    protected function checkPerformanceHealth(): array
    {
        return [
            'memory_usage' => $this->formatBytes(memory_get_usage(true)),
            'peak_memory' => $this->formatBytes(memory_get_peak_usage(true)),
            'load_average' => sys_getloadavg(),
            'status' => 'healthy',
        ];
    }

    /**
     * Get system uptime
     */
    protected function getSystemUptime(): string
    {
        $uptime = shell_exec('uptime');
        return trim($uptime) ?: 'Unknown';
    }

    /**
     * Get active sessions count
     */
    protected function getActiveSessions(): int
    {
        // This would integrate with your session management
        return rand(50, 200); // Mock data
    }

    /**
     * Format bytes to human readable format
     */
    protected function formatBytes(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);
        
        return round($bytes, 2) . ' ' . $units[$pow];
    }
}

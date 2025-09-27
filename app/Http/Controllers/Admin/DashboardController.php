<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\DashboardService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    protected $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    /**
     * Get admin dashboard data
     */
    public function index(Request $request)
    {
        $period = $request->get('period', '30'); // days
        
        return response()->json([
            'overview' => $this->dashboardService->getOverviewStats($period),
            'recent_tenants' => $this->dashboardService->getRecentTenants(),
            'revenue_analytics' => $this->dashboardService->getRevenueAnalytics($period),
            'tenant_growth' => $this->dashboardService->getTenantGrowth($period),
            'subscription_analytics' => $this->dashboardService->getSubscriptionAnalytics(),
            'system_health' => $this->dashboardService->getSystemHealth(),
        ]);
    }

    /**
     * Get tenant statistics
     */
    public function tenantStats()
    {
        return response()->json([
            'stats' => $this->dashboardService->getTenantStats(),
        ]);
    }

    /**
     * Get revenue analytics
     */
    public function revenue(Request $request)
    {
        $period = $request->get('period', '30');
        
        return response()->json([
            'revenue' => $this->dashboardService->getRevenueAnalytics($period),
        ]);
    }

    /**
     * Get system health metrics
     */
    public function systemHealth()
    {
        return response()->json([
            'health' => $this->dashboardService->getSystemHealth(),
        ]);
    }
}

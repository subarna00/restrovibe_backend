<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CreateTenantRequest;
use App\Http\Requests\Admin\UpdateTenantRequest;
use App\Models\Tenant;
use App\Services\Admin\TenantService;
use Illuminate\Http\Request;

class TenantController extends Controller
{
    protected $tenantService;

    public function __construct(TenantService $tenantService)
    {
        $this->tenantService = $tenantService;
    }

    /**
     * Display a listing of all tenants
     */
    public function index(Request $request)
    {
        $tenants = $this->tenantService->getAllTenants($request->all());
        
        return response()->json([
            'tenants' => $tenants,
            'stats' => $this->tenantService->getTenantStats(),
        ]);
    }

    /**
     * Store a newly created tenant
     */
    public function store(CreateTenantRequest $request)
    {
        $tenant = $this->tenantService->createTenant($request->validated());
        
        return response()->json([
            'message' => 'Tenant created successfully',
            'tenant' => $tenant->load(['restaurants', 'users']),
        ], 201);
    }

    /**
     * Display the specified tenant
     */
    public function show(Tenant $tenant)
    {
        $this->authorize('view', $tenant);
        
        return response()->json([
            'tenant' => $tenant->load(['restaurants', 'users']),
            'stats' => $this->tenantService->getTenantStats($tenant),
        ]);
    }

    /**
     * Update the specified tenant
     */
    public function update(UpdateTenantRequest $request, Tenant $tenant)
    {
        $this->authorize('update', $tenant);
        
        $tenant = $this->tenantService->updateTenant($tenant, $request->validated());
        
        return response()->json([
            'message' => 'Tenant updated successfully',
            'tenant' => $tenant,
        ]);
    }

    /**
     * Remove the specified tenant
     */
    public function destroy(Tenant $tenant)
    {
        $this->authorize('delete', $tenant);
        
        $this->tenantService->deleteTenant($tenant);
        
        return response()->json([
            'message' => 'Tenant deleted successfully',
        ]);
    }

    /**
     * Suspend a tenant
     */
    public function suspend(Tenant $tenant)
    {
        $this->authorize('suspend', $tenant);
        
        $this->tenantService->suspendTenant($tenant);
        
        return response()->json([
            'message' => 'Tenant suspended successfully',
        ]);
    }

    /**
     * Activate a tenant
     */
    public function activate(Tenant $tenant)
    {
        $this->authorize('activate', $tenant);
        
        $this->tenantService->activateTenant($tenant);
        
        return response()->json([
            'message' => 'Tenant activated successfully',
        ]);
    }

    /**
     * Switch to a tenant (Super Admin only)
     */
    public function switch(Tenant $tenant)
    {
        $this->authorize('switch', $tenant);
        
        $this->tenantService->switchToTenant($tenant);
        
        return response()->json([
            'message' => 'Switched to tenant: ' . $tenant->name,
            'tenant' => $tenant,
        ]);
    }

    /**
     * Get tenant analytics
     */
    public function analytics(Tenant $tenant)
    {
        $this->authorize('view', $tenant);
        
        return response()->json([
            'analytics' => $this->tenantService->getTenantAnalytics($tenant),
        ]);
    }
}

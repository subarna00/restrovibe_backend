<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TenantController;
use App\Http\Controllers\ProgressController;

// Admin Dashboard Routes (for React frontend)
Route::prefix('admin')->middleware(['auth:sanctum', 'tenant.switch'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/dashboard/tenant-stats', [DashboardController::class, 'tenantStats']);
    Route::get('/dashboard/revenue', [DashboardController::class, 'revenue']);
    Route::get('/dashboard/system-health', [DashboardController::class, 'systemHealth']);
    
    // Tenant Management
    Route::apiResource('tenants', TenantController::class);
    Route::post('/tenants/{tenant}/suspend', [TenantController::class, 'suspend']);
    Route::post('/tenants/{tenant}/activate', [TenantController::class, 'activate']);
    Route::post('/tenants/{tenant}/switch', [TenantController::class, 'switch']);
    Route::get('/tenants/{tenant}/analytics', [TenantController::class, 'analytics']);
});

// Web Application Routes (for restaurant owners/managers)
Route::prefix('web')->middleware(['auth:sanctum', 'tenant'])->group(function () {
    // Restaurant Dashboard
    Route::get('/dashboard', function () {
        return view('dashboard');
    });
    
    // Restaurant Management
    Route::get('/restaurants', function () {
        return view('restaurants.index');
    });
    
    Route::get('/restaurants/{restaurant}', function () {
        return view('restaurants.show');
    });
});

// Public Routes
Route::get('/', function () {
    return view('welcome');
});

Route::get('/progress', [ProgressController::class, 'index'])->name('progress');

Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::get('/register', function () {
    return view('auth.register');
})->name('register');
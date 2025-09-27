<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TenantController;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register admin routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "admin" middleware group. Make something great!
|
*/

// Public admin authentication routes
Route::prefix('admin/auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
});

// Protected admin routes
Route::prefix('admin')->middleware(['auth.admin'])->group(function () {
    // Authentication routes
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
    });

    // Dashboard routes
    Route::prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'index']);
        Route::get('/tenant-stats', [DashboardController::class, 'tenantStats']);
        Route::get('/revenue', [DashboardController::class, 'revenue']);
        Route::get('/system-health', [DashboardController::class, 'systemHealth']);
    });

    // Tenant management routes
    Route::apiResource('tenants', TenantController::class);
    Route::post('/tenants/{tenant}/suspend', [TenantController::class, 'suspend']);
    Route::post('/tenants/{tenant}/activate', [TenantController::class, 'activate']);
    Route::post('/tenants/{tenant}/switch', [TenantController::class, 'switch']);
    Route::get('/tenants/{tenant}/analytics', [TenantController::class, 'analytics']);

    // System management routes
    Route::prefix('system')->group(function () {
        Route::get('/health', function () {
            return response()->json([
                'success' => true,
                'data' => [
                    'status' => 'healthy',
                    'timestamp' => now()->toISOString(),
                    'version' => config('app.version', '1.0.0'),
                ],
            ]);
        });

        Route::get('/stats', function () {
            return response()->json([
                'success' => true,
                'data' => [
                    'total_tenants' => \App\Models\Tenant::count(),
                    'active_tenants' => \App\Models\Tenant::where('status', 'active')->count(),
                    'total_restaurants' => \App\Models\Restaurant::count(),
                    'total_users' => \App\Models\User::count(),
                ],
            ]);
        });
    });

    // Analytics routes
    Route::prefix('analytics')->group(function () {
        Route::get('/overview', function () {
            return response()->json([
                'success' => true,
                'data' => [
                    'revenue' => [
                        'total' => 125000.00,
                        'monthly' => 15000.00,
                        'growth' => 12.5,
                    ],
                    'tenants' => [
                        'total' => \App\Models\Tenant::count(),
                        'new_this_month' => \App\Models\Tenant::whereMonth('created_at', now()->month)->count(),
                        'growth' => 8.3,
                    ],
                    'subscriptions' => [
                        'active' => \App\Models\Tenant::where('subscription_status', 'active')->count(),
                        'expired' => \App\Models\Tenant::where('subscription_status', 'expired')->count(),
                        'cancelled' => \App\Models\Tenant::where('subscription_status', 'cancelled')->count(),
                    ],
                ],
            ]);
        });

        Route::get('/revenue', function () {
            return response()->json([
                'success' => true,
                'data' => [
                    'daily' => [
                        ['date' => '2024-01-01', 'revenue' => 1500.00],
                        ['date' => '2024-01-02', 'revenue' => 1800.00],
                        ['date' => '2024-01-03', 'revenue' => 1200.00],
                    ],
                    'monthly' => [
                        ['month' => '2024-01', 'revenue' => 45000.00],
                        ['month' => '2024-02', 'revenue' => 52000.00],
                        ['month' => '2024-03', 'revenue' => 48000.00],
                    ],
                ],
            ]);
        });
    });
});

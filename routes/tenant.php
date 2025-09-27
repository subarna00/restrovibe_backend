<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Tenant\AuthController;
use App\Http\Controllers\Api\RestaurantController;
use App\Http\Controllers\Tenant\MenuController;
use App\Http\Controllers\Tenant\MenuCategoryController;
use App\Http\Controllers\Tenant\MenuItemController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\StaffController;
use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Tenant\TableController;
use App\Http\Controllers\Tenant\TableCategoryController;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here is where you can register tenant routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "tenant" middleware group. Make something great!
|
*/

// Public tenant authentication routes
Route::prefix('tenant/auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
});

// Protected tenant routes
Route::prefix('tenant')->middleware(['auth.tenant'])->group(function () {
    // Authentication routes
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
    });

    // Dashboard routes
    Route::get('/dashboard', function () {
        $user = auth()->user();
        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'tenant' => $user->tenant,
                'restaurant' => $user->restaurant,
                'stats' => [
                    'total_orders' => $user->restaurant?->orders()->count() ?? 0,
                    'pending_orders' => $user->restaurant?->orders()->where('status', 'pending')->count() ?? 0,
                    'revenue_today' => $user->restaurant?->orders()
                        ->whereDate('created_at', today())
                        ->where('payment_status', 'paid')
                        ->sum('total_amount') ?? 0,
                ],
            ],
        ]);
    });

    // Restaurant management routes
    Route::prefix('restaurants')->group(function () {
        Route::get('/', [RestaurantController::class, 'index']);
        Route::post('/', [RestaurantController::class, 'store']);
        Route::get('/{restaurant}', [RestaurantController::class, 'show']);
        Route::put('/{restaurant}', [RestaurantController::class, 'update']);
        Route::delete('/{restaurant}', [RestaurantController::class, 'destroy']);
        Route::get('/{restaurant}/dashboard', [RestaurantController::class, 'dashboard']);
        Route::put('/{restaurant}/settings', [RestaurantController::class, 'updateSettings']);
    });

    // Menu management routes
    Route::prefix('restaurants/{restaurant}/menu')->group(function () {
        // Menu overview and stats
        Route::get('/overview', [MenuController::class, 'overview']);
        Route::get('/stats', [MenuController::class, 'stats']);
        Route::get('/popular', [MenuController::class, 'popular']);
        Route::get('/low-stock', [MenuController::class, 'lowStock']);
        Route::post('/bulk-update-availability', [MenuController::class, 'bulkUpdateAvailability']);
        Route::get('/items-by-category', [MenuController::class, 'itemsByCategory']);

        // Menu categories
        Route::get('/categories', [MenuCategoryController::class, 'index']);
        Route::post('/categories', [MenuCategoryController::class, 'store']);
        Route::get('/categories/{category}', [MenuCategoryController::class, 'show']);
        Route::put('/categories/{category}', [MenuCategoryController::class, 'update']);
        Route::delete('/categories/{category}', [MenuCategoryController::class, 'destroy']);
        Route::post('/categories/reorder', [MenuCategoryController::class, 'reorder']);

        // Menu items
        Route::get('/items', [MenuItemController::class, 'index']);
        Route::post('/items', [MenuItemController::class, 'store']);
        Route::get('/items/{item}', [MenuItemController::class, 'show']);
        Route::put('/items/{item}', [MenuItemController::class, 'update']);
        Route::delete('/items/{item}', [MenuItemController::class, 'destroy']);
        Route::put('/items/{item}/availability', [MenuItemController::class, 'updateAvailability']);
        Route::put('/items/{item}/stock', [MenuItemController::class, 'updateStock']);
        Route::post('/items/reorder', [MenuItemController::class, 'reorder']);
        Route::post('/items/bulk-update', [MenuItemController::class, 'bulkUpdate']);
    });

    // Order management routes
    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index']);
        Route::post('/', [OrderController::class, 'store']);
        Route::get('/{order}', [OrderController::class, 'show']);
        Route::put('/{order}', [OrderController::class, 'update']);
        Route::delete('/{order}', [OrderController::class, 'destroy']);
        Route::put('/{order}/status', [OrderController::class, 'updateStatus']);
        Route::put('/{order}/payment', [OrderController::class, 'updatePayment']);
    });

    // Staff management routes
    Route::prefix('staff')->group(function () {
        Route::get('/', [StaffController::class, 'index']);
        Route::post('/', [StaffController::class, 'store']);
        Route::get('/{user}', [StaffController::class, 'show']);
        Route::put('/{user}', [StaffController::class, 'update']);
        Route::delete('/{user}', [StaffController::class, 'destroy']);
        Route::put('/{user}/permissions', [StaffController::class, 'updatePermissions']);
        Route::put('/{user}/status', [StaffController::class, 'updateStatus']);
    });

    // Table management routes
    Route::prefix('restaurants/{restaurant}/tables')->group(function () {
        // Table categories
        Route::get('/categories', [TableCategoryController::class, 'index']);
        Route::post('/categories', [TableCategoryController::class, 'store']);
        Route::get('/categories/{category}', [TableCategoryController::class, 'show']);
        Route::put('/categories/{category}', [TableCategoryController::class, 'update']);
        Route::delete('/categories/{category}', [TableCategoryController::class, 'destroy']);
        Route::put('/categories/{category}/status', [TableCategoryController::class, 'updateStatus']);
        Route::get('/categories/{category}/stats', [TableCategoryController::class, 'stats']);
        Route::post('/categories/reorder', [TableCategoryController::class, 'reorder']);
        Route::get('/categories-with-tables', [TableCategoryController::class, 'withTables']);

        // Tables
        Route::get('/', [TableController::class, 'index']);
        Route::post('/', [TableController::class, 'store']);
        Route::get('/{table}', [TableController::class, 'show']);
        Route::put('/{table}', [TableController::class, 'update']);
        Route::delete('/{table}', [TableController::class, 'destroy']);
        Route::put('/{table}/status', [TableController::class, 'updateStatus']);
        Route::get('/stats/overview', [TableController::class, 'stats']);
        Route::get('/available', [TableController::class, 'available']);
        Route::get('/layout', [TableController::class, 'layout']);
        Route::post('/bulk-update-status', [TableController::class, 'bulkUpdateStatus']);
    });

    // Analytics routes
    Route::prefix('analytics')->group(function () {
        Route::get('/overview', [AnalyticsController::class, 'overview']);
        Route::get('/revenue', [AnalyticsController::class, 'revenue']);
        Route::get('/orders', [AnalyticsController::class, 'orders']);
        Route::get('/menu', [AnalyticsController::class, 'menu']);
        Route::get('/staff', [AnalyticsController::class, 'staff']);
    });

    // Settings routes
    Route::prefix('settings')->group(function () {
        Route::get('/', function () {
            $user = auth()->user();
            return response()->json([
                'success' => true,
                'data' => [
                    'tenant' => $user->tenant,
                    'restaurant' => $user->restaurant,
                    'user' => $user,
                ],
            ]);
        });

        Route::put('/tenant', function () {
            $user = auth()->user();
            $tenant = $user->tenant;
            
            // Update tenant settings logic here
            return response()->json([
                'success' => true,
                'message' => 'Tenant settings updated successfully',
                'data' => ['tenant' => $tenant],
            ]);
        });

        Route::put('/restaurant', function () {
            $user = auth()->user();
            $restaurant = $user->restaurant;
            
            // Update restaurant settings logic here
            return response()->json([
                'success' => true,
                'message' => 'Restaurant settings updated successfully',
                'data' => ['restaurant' => $restaurant],
            ]);
        });

        Route::put('/profile', function () {
            $user = auth()->user();
            
            // Update user profile logic here
            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => ['user' => $user],
            ]);
        });
    });

    // Subscription routes
    Route::prefix('subscription')->group(function () {
        Route::get('/', function () {
            $user = auth()->user();
            return response()->json([
                'success' => true,
                'data' => [
                    'plan' => $user->tenant->subscription_plan,
                    'status' => $user->tenant->subscription_status,
                    'expires_at' => $user->tenant->subscription_expires_at,
                    'features' => $this->getPlanFeatures($user->tenant->subscription_plan),
                ],
            ]);
        });

        Route::post('/upgrade', function () {
            // Subscription upgrade logic here
            return response()->json([
                'success' => true,
                'message' => 'Subscription upgraded successfully',
            ]);
        });

        Route::post('/cancel', function () {
            // Subscription cancellation logic here
            return response()->json([
                'success' => true,
                'message' => 'Subscription cancelled successfully',
            ]);
        });
    });
});

// Helper function for plan features
if (!function_exists('getPlanFeatures')) {
    function getPlanFeatures($plan) {
    $features = [
        'basic' => [
            'restaurants' => 1,
            'users' => 5,
            'orders_per_month' => 1000,
            'analytics' => 'basic',
            'support' => 'email',
        ],
        'professional' => [
            'restaurants' => 5,
            'users' => 25,
            'orders_per_month' => 10000,
            'analytics' => 'advanced',
            'support' => 'priority',
        ],
        'enterprise' => [
            'restaurants' => -1, // unlimited
            'users' => -1, // unlimited
            'orders_per_month' => -1, // unlimited
            'analytics' => 'premium',
            'support' => 'dedicated',
        ],
    ];

    return $features[$plan] ?? $features['basic'];
    }
}

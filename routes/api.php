<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\RestaurantController;
use App\Http\Controllers\Api\Mobile\AuthController as MobileAuthController;
use App\Http\Controllers\Api\Mobile\RestaurantController as MobileRestaurantController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Mobile API Routes (for mobile apps)
Route::prefix('mobile')->group(function () {
    // Public mobile authentication routes
    Route::prefix('auth')->group(function () {
        Route::post('/register', [MobileAuthController::class, 'register']);
        Route::post('/login', [MobileAuthController::class, 'login']);
        Route::post('/logout', [MobileAuthController::class, 'logout'])->middleware('auth.api');
        Route::post('/refresh', [MobileAuthController::class, 'refresh'])->middleware('auth.api');
    });

    // Protected mobile routes
    Route::middleware('auth.api')->group(function () {
        Route::get('/profile', [MobileAuthController::class, 'profile']);
        
        // Restaurant routes for mobile
        Route::middleware('tenant')->prefix('restaurant')->group(function () {
            Route::get('/', [MobileRestaurantController::class, 'index']);
            Route::get('/{restaurant}', [MobileRestaurantController::class, 'show']);
            Route::get('/{restaurant}/dashboard', [MobileRestaurantController::class, 'dashboard']);
            Route::put('/{restaurant}/settings', [MobileRestaurantController::class, 'updateSettings']);
            Route::get('/{restaurant}/business-hours', [MobileRestaurantController::class, 'businessHours']);
        });
    });
});

// Legacy API routes (for backward compatibility)
Route::prefix('auth')->group(function () {
    Route::post('/register', [RegisterController::class, 'store']);
    Route::post('/login', [LoginController::class, 'store']);
    Route::post('/logout', [LoginController::class, 'destroy'])->middleware('auth.api');
});

Route::middleware('auth.api')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user()->load(['tenant', 'restaurant']);
    });
});
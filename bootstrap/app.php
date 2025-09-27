<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/admin.php'));
                
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/tenant.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'tenant' => \App\Http\Middleware\TenantMiddleware::class,
            'tenant.switch' => \App\Http\Middleware\TenantSwitchingMiddleware::class,
            'auth.admin' => \App\Http\Middleware\AdminAuthMiddleware::class,
            'auth.tenant' => \App\Http\Middleware\TenantAuthMiddleware::class,
            'auth.api' => \App\Http\Middleware\ApiAuthMiddleware::class,
        ]);
        
        // Add Laravel Request Docs middleware to API routes
        $middleware->appendToGroup('api', \Rakutentech\LaravelRequestDocs\LaravelRequestDocsMiddleware::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();

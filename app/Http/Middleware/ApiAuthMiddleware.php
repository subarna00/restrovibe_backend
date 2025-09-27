<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get the bearer token from the request
        $token = $request->bearerToken();
        
        if (!$token) {
            return response()->json([
                'data' => null,
                'message' => 'Unauthorized access. API authentication required.',
                'status' => 'failed',
                'statusCode' => 401
            ], 401);
        }
        
        // Find the token in the database
        $personalAccessToken = PersonalAccessToken::findToken($token);
        
        if (!$personalAccessToken) {
            return response()->json([
                'data' => null,
                'message' => 'Invalid token. API authentication required.',
                'status' => 'failed',
                'statusCode' => 401
            ], 401);
        }
        
        // Get the user from the token
        $user = $personalAccessToken->tokenable;
        
        if (!$user) {
            return response()->json([
                'data' => null,
                'message' => 'Invalid user. API authentication required.',
                'status' => 'failed',
                'statusCode' => 401
            ], 401);
        }

        // Check if user is active
        if (!$user->isActive()) {
            return response()->json([
                'data' => null,
                'message' => 'Your account is inactive. Please contact support.',
                'status' => 'failed',
                'statusCode' => 403
            ], 403);
        }

        // For API users, we need to check their role and tenant access
        if ($user->isSuperAdmin()) {
            // Super admin can access everything
            $request->setUserResolver(function () use ($user) {
                return $user;
            });
            return $next($request);
        }

        // Regular users need tenant validation
        if (!$user->tenant) {
            return response()->json([
                'data' => null,
                'message' => 'No valid tenant found for your account.',
                'status' => 'failed',
                'statusCode' => 403
            ], 403);
        }

        // Check if tenant is active
        if (!$user->tenant->isActive()) {
            return response()->json([
                'data' => null,
                'message' => 'Your tenant account is inactive.',
                'status' => 'failed',
                'statusCode' => 403
            ], 403);
        }

        // Check if tenant has valid subscription
        if (!$user->tenant->hasValidSubscription()) {
            return response()->json([
                'data' => null,
                'message' => 'Your subscription has expired. Please renew to continue.',
                'status' => 'failed',
                'statusCode' => 403
            ], 403);
        }

        // Set the authenticated user for the request
        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        return $next($request);
    }
}

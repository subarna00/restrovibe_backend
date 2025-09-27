<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

class AdminAuthMiddleware
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
                'message' => 'Unauthorized access. Admin authentication required.',
                'status' => 'failed',
                'statusCode' => 401
            ], 401);
        }
        
        // Find the token in the database
        $personalAccessToken = PersonalAccessToken::findToken($token);
        
        if (!$personalAccessToken) {
            return response()->json([
                'data' => null,
                'message' => 'Invalid token. Admin authentication required.',
                'status' => 'failed',
                'statusCode' => 401
            ], 401);
        }
        
        // Get the user from the token
        $user = $personalAccessToken->tokenable;
        
        if (!$user) {
            return response()->json([
                'data' => null,
                'message' => 'Invalid user. Admin authentication required.',
                'status' => 'failed',
                'statusCode' => 401
            ], 401);
        }

        // Check if user is super admin
        if (!$user->isSuperAdmin()) {
            return response()->json([
                'data' => null,
                'message' => 'Access denied. Super admin privileges required.',
                'status' => 'failed',
                'statusCode' => 403
            ], 403);
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

        // Set the authenticated user for the request
        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        return $next($request);
    }
}

<?php

namespace App\Traits;

trait ApiResponse
{
    /**
     * Return a success response
     */
    protected function successResponse($data = null, $message = 'Success', $statusCode = 200)
    {
        return response()->json([
            'data' => $data,
            'message' => $message,
            'status' => 'success',
            'statusCode' => $statusCode
        ], $statusCode);
    }

    /**
     * Return an error response
     */
    protected function errorResponse($message = 'Error', $statusCode = 400, $data = null)
    {
        return response()->json([
            'data' => $data,
            'message' => $message,
            'status' => 'failed',
            'statusCode' => $statusCode
        ], $statusCode);
    }

    /**
     * Return a validation error response
     */
    protected function validationErrorResponse($errors, $message = 'Validation failed')
    {
        return response()->json([
            'data' => null,
            'message' => $message,
            'status' => 'failed',
            'statusCode' => 422,
            'errors' => $errors
        ], 422);
    }

    /**
     * Return a not found response
     */
    protected function notFoundResponse($message = 'Resource not found')
    {
        return response()->json([
            'data' => null,
            'message' => $message,
            'status' => 'failed',
            'statusCode' => 404
        ], 404);
    }

    /**
     * Return an unauthorized response
     */
    protected function unauthorizedResponse($message = 'Unauthorized')
    {
        return response()->json([
            'data' => null,
            'message' => $message,
            'status' => 'failed',
            'statusCode' => 401
        ], 401);
    }

    /**
     * Return a forbidden response
     */
    protected function forbiddenResponse($message = 'Forbidden')
    {
        return response()->json([
            'data' => null,
            'message' => $message,
            'status' => 'failed',
            'statusCode' => 403
        ], 403);
    }

    /**
     * Return a server error response
     */
    protected function serverErrorResponse($message = 'Internal server error')
    {
        return response()->json([
            'data' => null,
            'message' => $message,
            'status' => 'failed',
            'statusCode' => 500
        ], 500);
    }
}

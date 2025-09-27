<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Models\Table;
use App\Services\Tenant\TableService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TableController extends Controller
{
    use AuthorizesRequests, ApiResponse;

    protected $tableService;

    public function __construct(TableService $tableService)
    {
        $this->tableService = $tableService;
    }

    /**
     * Display a listing of tables for a restaurant
     */
    public function index(Request $request, Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        $query = $restaurant->tables();

        // Apply filters
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('floor')) {
            $query->where('floor', $request->floor);
        }

        if ($request->has('section')) {
            $query->where('section', $request->section);
        }

        if ($request->has('table_type')) {
            $query->where('table_type', $request->table_type);
        }

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('min_capacity')) {
            $query->where('capacity', '>=', $request->min_capacity);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('number', 'like', "%{$search}%")
                  ->orWhere('floor', 'like', "%{$search}%")
                  ->orWhere('section', 'like', "%{$search}%");
            });
        }

        $tables = $query->orderBy('floor')
            ->orderBy('section')
            ->orderBy('name')
            ->paginate($request->get('per_page', 15));

        return $this->successResponse([
            'tables' => $tables,
            'filters' => [
                'statuses' => Table::getStatuses(),
                'table_type_suggestions' => Table::getTableTypeSuggestions(),
                'floors' => $this->tableService->getFloors($restaurant),
                'sections' => $this->tableService->getSections($restaurant),
                'categories' => $restaurant->tableCategories()->active()->get(['id', 'name', 'floor', 'section']),
            ]
        ], 'Tables retrieved successfully');
    }

    /**
     * Store a newly created table
     */
    public function store(Request $request, Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        $validated = $request->validate([
            'category_id' => 'nullable|integer|exists:table_categories,id',
            'name' => 'required|string|max:255',
            'number' => 'nullable|string|max:50',
            'floor' => 'nullable|string|max:100',
            'section' => 'nullable|string|max:100',
            'capacity' => 'required|integer|min:1|max:20',
            'table_type' => 'required|string|max:100',
            'status' => 'nullable|string|in:available,occupied,reserved,out_of_service,cleaning',
            'position_x' => 'nullable|numeric',
            'position_y' => 'nullable|numeric',
            'shape' => 'nullable|string|in:rectangle,circle,square,oval',
            'settings' => 'nullable|array',
            'notes' => 'nullable|string',
        ]);

        $table = $this->tableService->createTable($restaurant, $validated);

        return $this->successResponse([
            'table' => $table
        ], 'Table created successfully', 201);
    }

    /**
     * Display the specified table
     */
    public function show(Restaurant $restaurant, Table $table)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        // Ensure table belongs to restaurant
        if ($table->restaurant_id !== $restaurant->id) {
            return $this->notFoundResponse('Table not found');
        }

        $table->load(['category', 'activeOrders', 'orders' => function ($query) {
            $query->latest()->limit(5);
        }]);

        return $this->successResponse([
            'table' => $table
        ], 'Table retrieved successfully');
    }

    /**
     * Update the specified table
     */
    public function update(Request $request, Restaurant $restaurant, Table $table)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        // Ensure table belongs to restaurant
        if ($table->restaurant_id !== $restaurant->id) {
            return $this->notFoundResponse('Table not found');
        }

        $validated = $request->validate([
            'category_id' => 'nullable|integer|exists:table_categories,id',
            'name' => 'sometimes|string|max:255',
            'number' => 'nullable|string|max:50',
            'floor' => 'nullable|string|max:100',
            'section' => 'nullable|string|max:100',
            'capacity' => 'sometimes|integer|min:1|max:20',
            'table_type' => 'sometimes|string|max:100',
            'status' => 'sometimes|string|in:available,occupied,reserved,out_of_service,cleaning',
            'position_x' => 'nullable|numeric',
            'position_y' => 'nullable|numeric',
            'shape' => 'nullable|string|in:rectangle,circle,square,oval',
            'settings' => 'nullable|array',
            'notes' => 'nullable|string',
        ]);

        $table = $this->tableService->updateTable($table, $validated);

        return $this->successResponse([
            'table' => $table
        ], 'Table updated successfully');
    }

    /**
     * Remove the specified table
     */
    public function destroy(Restaurant $restaurant, Table $table)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        // Ensure table belongs to restaurant
        if ($table->restaurant_id !== $restaurant->id) {
            return $this->notFoundResponse('Table not found');
        }

        // Check if table has active orders
        if ($table->activeOrders()->exists()) {
            return $this->errorResponse('Cannot delete table with active orders', 400);
        }

        $this->tableService->deleteTable($table);

        return $this->successResponse(null, 'Table deleted successfully');
    }

    /**
     * Update table status
     */
    public function updateStatus(Request $request, Restaurant $restaurant, Table $table)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        // Ensure table belongs to restaurant
        if ($table->restaurant_id !== $restaurant->id) {
            return $this->notFoundResponse('Table not found');
        }

        $validated = $request->validate([
            'status' => 'required|string|in:available,occupied,reserved,out_of_service,cleaning',
        ]);

        $table->updateStatus($validated['status']);

        return $this->successResponse([
            'table' => $table->fresh()
        ], 'Table status updated successfully');
    }

    /**
     * Get table statistics
     */
    public function stats(Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        $stats = $this->tableService->getTableStats($restaurant);

        return $this->successResponse([
            'stats' => $stats
        ], 'Table statistics retrieved successfully');
    }

    /**
     * Get available tables for a given capacity
     */
    public function available(Request $request, Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        $validated = $request->validate([
            'capacity' => 'required|integer|min:1',
            'floor' => 'nullable|string',
            'section' => 'nullable|string',
        ]);

        $tables = $this->tableService->getAvailableTables($restaurant, $validated);

        return $this->successResponse([
            'tables' => $tables
        ], 'Available tables retrieved successfully');
    }

    /**
     * Get table layout/floor plan
     */
    public function layout(Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        $layout = $this->tableService->getTableLayout($restaurant);

        return $this->successResponse([
            'layout' => $layout
        ], 'Table layout retrieved successfully');
    }

    /**
     * Bulk update table statuses
     */
    public function bulkUpdateStatus(Request $request, Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        $validated = $request->validate([
            'table_ids' => 'required|array',
            'table_ids.*' => 'integer|exists:tables,id',
            'status' => 'required|string|in:available,occupied,reserved,out_of_service,cleaning',
        ]);

        $updated = $this->tableService->bulkUpdateStatus($restaurant, $validated);

        return $this->successResponse([
            'updated_count' => $updated
        ], "Updated {$updated} tables successfully");
    }
}

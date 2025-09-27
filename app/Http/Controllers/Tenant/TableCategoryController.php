<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Models\TableCategory;
use App\Services\Tenant\TableCategoryService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TableCategoryController extends Controller
{
    use AuthorizesRequests, ApiResponse;

    protected $tableCategoryService;

    public function __construct(TableCategoryService $tableCategoryService)
    {
        $this->tableCategoryService = $tableCategoryService;
    }

    /**
     * Display a listing of table categories for a restaurant
     */
    public function index(Request $request, Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        $query = $restaurant->tableCategories();

        // Apply filters
        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        if ($request->has('floor')) {
            $query->where('floor', $request->floor);
        }

        if ($request->has('section')) {
            $query->where('section', $request->section);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('floor', 'like', "%{$search}%")
                  ->orWhere('section', 'like', "%{$search}%");
            });
        }

        $categories = $query->withCount(['tables', 'availableTables', 'occupiedTables'])
            ->ordered()
            ->paginate($request->get('per_page', 15));

        return $this->successResponse([
            'categories' => $categories,
            'suggestions' => [
                'category_types' => TableCategory::getCategoryTypeSuggestions(),
                'floors' => $this->tableCategoryService->getFloors($restaurant),
                'sections' => $this->tableCategoryService->getSections($restaurant),
            ]
        ], 'Table categories retrieved successfully');
    }

    /**
     * Store a newly created table category
     */
    public function store(Request $request, Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'floor' => 'nullable|string|max:100',
            'section' => 'nullable|string|max:100',
            'display_order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'settings' => 'nullable|array',
            'color' => 'nullable|string|max:50',
            'icon' => 'nullable|string|max:50',
        ]);

        $category = $this->tableCategoryService->createCategory($restaurant, $validated);

        return $this->successResponse([
            'category' => $category
        ], 'Table category created successfully', 201);
    }

    /**
     * Display the specified table category
     */
    public function show(Restaurant $restaurant, TableCategory $category)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        // Ensure category belongs to restaurant
        if ($category->restaurant_id !== $restaurant->id) {
            return $this->notFoundResponse('Table category not found');
        }

        $category->load(['tables' => function ($query) {
            $query->orderBy('name');
        }]);

        return $this->successResponse([
            'category' => $category,
            'stats' => $category->getStats()
        ], 'Table category retrieved successfully');
    }

    /**
     * Update the specified table category
     */
    public function update(Request $request, Restaurant $restaurant, TableCategory $category)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        // Ensure category belongs to restaurant
        if ($category->restaurant_id !== $restaurant->id) {
            return $this->notFoundResponse('Table category not found');
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'floor' => 'nullable|string|max:100',
            'section' => 'nullable|string|max:100',
            'display_order' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
            'settings' => 'nullable|array',
            'color' => 'nullable|string|max:50',
            'icon' => 'nullable|string|max:50',
        ]);

        $category = $this->tableCategoryService->updateCategory($category, $validated);

        return $this->successResponse([
            'category' => $category
        ], 'Table category updated successfully');
    }

    /**
     * Remove the specified table category
     */
    public function destroy(Restaurant $restaurant, TableCategory $category)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        // Ensure category belongs to restaurant
        if ($category->restaurant_id !== $restaurant->id) {
            return $this->notFoundResponse('Table category not found');
        }

        // Check if category has tables
        if ($category->tables()->exists()) {
            return $this->errorResponse('Cannot delete category with tables. Please move or delete tables first.', 400);
        }

        $this->tableCategoryService->deleteCategory($category);

        return $this->successResponse(null, 'Table category deleted successfully');
    }

    /**
     * Update category status
     */
    public function updateStatus(Request $request, Restaurant $restaurant, TableCategory $category)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        // Ensure category belongs to restaurant
        if ($category->restaurant_id !== $restaurant->id) {
            return $this->notFoundResponse('Table category not found');
        }

        $validated = $request->validate([
            'is_active' => 'required|boolean',
        ]);

        $category->update(['is_active' => $validated['is_active']]);

        return $this->successResponse([
            'category' => $category->fresh()
        ], 'Table category status updated successfully');
    }

    /**
     * Get category statistics
     */
    public function stats(Restaurant $restaurant, TableCategory $category)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        // Ensure category belongs to restaurant
        if ($category->restaurant_id !== $restaurant->id) {
            return $this->notFoundResponse('Table category not found');
        }

        $stats = $category->getStats();

        return $this->successResponse([
            'stats' => $stats
        ], 'Table category statistics retrieved successfully');
    }

    /**
     * Reorder categories
     */
    public function reorder(Request $request, Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        $validated = $request->validate([
            'categories' => 'required|array',
            'categories.*.id' => 'required|integer|exists:table_categories,id',
            'categories.*.display_order' => 'required|integer|min:0',
        ]);

        $updated = $this->tableCategoryService->reorderCategories($restaurant, $validated['categories']);

        return $this->successResponse([
            'updated_count' => $updated
        ], "Updated {$updated} categories successfully");
    }

    /**
     * Get all categories with their tables
     */
    public function withTables(Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        $categories = $restaurant->tableCategories()
            ->active()
            ->with(['tables' => function ($query) {
                $query->orderBy('name');
            }])
            ->ordered()
            ->get();

        return $this->successResponse([
            'categories' => $categories
        ], 'Table categories with tables retrieved successfully');
    }
}

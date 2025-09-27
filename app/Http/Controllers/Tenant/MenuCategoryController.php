<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Models\MenuCategory;
use App\Http\Requests\Tenant\CreateMenuCategoryRequest;
use App\Http\Requests\Tenant\UpdateMenuCategoryRequest;
use App\Services\Tenant\MenuCategoryService;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class MenuCategoryController extends Controller
{
    use AuthorizesRequests;

    protected $categoryService;

    public function __construct(MenuCategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    /**
     * Display a listing of menu categories
     */
    public function index(Restaurant $restaurant, Request $request)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        $filters = $request->only(['is_active']);
        
        return response()->json([
            'categories' => $this->categoryService->getCategories($restaurant, $filters),
        ]);
    }

    /**
     * Store a newly created menu category
     */
    public function store(CreateMenuCategoryRequest $request, Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        $category = $this->categoryService->createCategory($restaurant, $request->validated());

        return response()->json([
            'message' => 'Menu category created successfully',
            'category' => $category,
        ], 201);
    }

    /**
     * Display the specified menu category
     */
    public function show(Restaurant $restaurant, MenuCategory $category)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        // Ensure category belongs to restaurant
        if ($category->restaurant_id !== $restaurant->id) {
            abort(404);
        }

        $category->load('menuItems');
        
        return response()->json([
            'category' => $category,
            'stats' => $this->categoryService->getCategoryStats($category),
        ]);
    }

    /**
     * Update the specified menu category
     */
    public function update(UpdateMenuCategoryRequest $request, Restaurant $restaurant, MenuCategory $category)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        // Ensure category belongs to restaurant
        if ($category->restaurant_id !== $restaurant->id) {
            abort(404);
        }

        $category = $this->categoryService->updateCategory($category, $request->validated());

        return response()->json([
            'message' => 'Menu category updated successfully',
            'category' => $category,
        ]);
    }

    /**
     * Remove the specified menu category
     */
    public function destroy(Restaurant $restaurant, MenuCategory $category)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        // Ensure category belongs to restaurant
        if ($category->restaurant_id !== $restaurant->id) {
            abort(404);
        }

        $this->categoryService->deleteCategory($category);

        return response()->json([
            'message' => 'Menu category deleted successfully',
        ]);
    }

    /**
     * Reorder menu categories
     */
    public function reorder(Request $request)
    {
        $request->validate([
            'categories' => 'required|array',
            'categories.*.id' => 'required|integer|exists:menu_categories,id',
            'categories.*.sort_order' => 'required|integer|min:0',
        ]);

        $this->categoryService->reorderCategories($request->categories);

        return response()->json([
            'message' => 'Categories reordered successfully',
        ]);
    }
}

<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Services\Tenant\MenuService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class MenuController extends Controller
{
    use AuthorizesRequests, ApiResponse;

    protected $menuService;

    public function __construct(MenuService $menuService)
    {
        $this->menuService = $menuService;
    }

    /**
     * Get menu overview for a restaurant
     */
    public function overview(Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        return $this->successResponse([
            'overview' => $this->menuService->getMenuOverview($restaurant),
        ], 'Menu overview retrieved successfully');
    }

    /**
     * Get menu statistics
     */
    public function stats(Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        return $this->successResponse([
            'stats' => $this->menuService->getMenuStats($restaurant),
        ], 'Menu statistics retrieved successfully');
    }

    /**
     * Get popular menu items
     */
    public function popular(Restaurant $restaurant, Request $request)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        $limit = $request->get('limit', 10);
        
        return response()->json([
            'popular_items' => $this->menuService->getPopularItems($restaurant, $limit),
        ]);
    }

    /**
     * Get low stock items
     */
    public function lowStock(Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        return response()->json([
            'low_stock_items' => $this->menuService->getLowStockItems($restaurant),
        ]);
    }

    /**
     * Bulk update item availability
     */
    public function bulkUpdateAvailability(Request $request)
    {
        $request->validate([
            'item_ids' => 'required|array',
            'item_ids.*' => 'integer|exists:menu_items,id',
            'is_available' => 'required|boolean',
        ]);

        $updated = $this->menuService->bulkUpdateAvailability(
            $request->item_ids,
            $request->is_available
        );

        return response()->json([
            'message' => "Updated availability for {$updated} items",
            'updated_count' => $updated,
        ]);
    }

    /**
     * Get menu items by category
     */
    public function itemsByCategory(Restaurant $restaurant, Request $request)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        $categoryId = $request->get('category_id');
        
        return response()->json([
            'items' => $this->menuService->getItemsByCategory($restaurant, $categoryId),
        ]);
    }
}

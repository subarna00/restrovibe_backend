<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Models\MenuItem;
use App\Http\Requests\Tenant\CreateMenuItemRequest;
use App\Http\Requests\Tenant\UpdateMenuItemRequest;
use App\Services\Tenant\MenuItemService;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class MenuItemController extends Controller
{
    use AuthorizesRequests;

    protected $itemService;

    public function __construct(MenuItemService $itemService)
    {
        $this->itemService = $itemService;
    }

    /**
     * Display a listing of menu items
     */
    public function index(Restaurant $restaurant, Request $request)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        $filters = $request->only(['category_id', 'is_available', 'is_featured', 'search']);
        
        return response()->json([
            'items' => $this->itemService->getItems($restaurant, $filters),
        ]);
    }

    /**
     * Store a newly created menu item
     */
    public function store(CreateMenuItemRequest $request, Restaurant $restaurant)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        $item = $this->itemService->createItem($restaurant, $request->validated());

        return response()->json([
            'message' => 'Menu item created successfully',
            'item' => $item,
        ], 201);
    }

    /**
     * Display the specified menu item
     */
    public function show(Restaurant $restaurant, MenuItem $item)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'view', $restaurant);

        // Ensure item belongs to restaurant
        if ($item->restaurant_id !== $restaurant->id) {
            abort(404);
        }

        $item->load('menuCategory');
        
        return response()->json([
            'item' => $item,
            'stats' => $this->itemService->getItemStats($item),
        ]);
    }

    /**
     * Update the specified menu item
     */
    public function update(UpdateMenuItemRequest $request, Restaurant $restaurant, MenuItem $item)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        // Ensure item belongs to restaurant
        if ($item->restaurant_id !== $restaurant->id) {
            abort(404);
        }

        $item = $this->itemService->updateItem($item, $request->validated());

        return response()->json([
            'message' => 'Menu item updated successfully',
            'item' => $item,
        ]);
    }

    /**
     * Remove the specified menu item
     */
    public function destroy(Restaurant $restaurant, MenuItem $item)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        // Ensure item belongs to restaurant
        if ($item->restaurant_id !== $restaurant->id) {
            abort(404);
        }

        $this->itemService->deleteItem($item);

        return response()->json([
            'message' => 'Menu item deleted successfully',
        ]);
    }

    /**
     * Update item availability
     */
    public function updateAvailability(Request $request, Restaurant $restaurant, MenuItem $item)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        // Ensure item belongs to restaurant
        if ($item->restaurant_id !== $restaurant->id) {
            abort(404);
        }

        $request->validate([
            'is_available' => 'required|boolean',
        ]);

        $this->itemService->updateAvailability($item, $request->is_available);

        return response()->json([
            'message' => 'Item availability updated successfully',
            'item' => $item->fresh(),
        ]);
    }

    /**
     * Update item stock
     */
    public function updateStock(Request $request, Restaurant $restaurant, MenuItem $item)
    {
        $user = auth('tenant')->user();
        $this->authorizeForUser($user, 'update', $restaurant);

        // Ensure item belongs to restaurant
        if ($item->restaurant_id !== $restaurant->id) {
            abort(404);
        }

        $request->validate([
            'quantity' => 'required|integer|min:0',
        ]);

        $updated = $this->itemService->updateStock($item, $request->quantity);

        if (!$updated) {
            return response()->json([
                'message' => 'This item does not track inventory',
            ], 400);
        }

        return response()->json([
            'message' => 'Item stock updated successfully',
            'item' => $item->fresh(),
        ]);
    }

    /**
     * Reorder menu items
     */
    public function reorder(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|integer|exists:menu_items,id',
            'items.*.sort_order' => 'required|integer|min:0',
        ]);

        $this->itemService->reorderItems($request->items);

        return response()->json([
            'message' => 'Items reordered successfully',
        ]);
    }

    /**
     * Bulk update menu items
     */
    public function bulkUpdate(Request $request)
    {
        $request->validate([
            'item_ids' => 'required|array',
            'item_ids.*' => 'integer|exists:menu_items,id',
            'data' => 'required|array',
        ]);

        $updated = $this->itemService->bulkUpdate($request->item_ids, $request->data);

        return response()->json([
            'message' => "Updated {$updated} items successfully",
            'updated_count' => $updated,
        ]);
    }
}

<?php

namespace App\Services\Tenant;

use App\Models\Restaurant;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use Illuminate\Support\Facades\DB;

class MenuService
{
    /**
     * Get menu overview for a restaurant
     */
    public function getMenuOverview(Restaurant $restaurant): array
    {
        return [
            'total_categories' => $restaurant->menuCategories()->count(),
            'total_items' => $restaurant->menuItems()->count(),
            'available_items' => $restaurant->menuItems()->where('is_available', true)->count(),
            'featured_items' => $restaurant->menuItems()->where('is_featured', true)->count(),
            'low_stock_items' => $restaurant->menuItems()
                ->where('track_inventory', true)
                ->whereColumn('stock_quantity', '<=', 'min_stock_level')
                ->count(),
            'categories_with_items' => $restaurant->menuCategories()
                ->whereHas('menuItems')
                ->count(),
        ];
    }

    /**
     * Get menu statistics
     */
    public function getMenuStats(Restaurant $restaurant): array
    {
        $items = $restaurant->menuItems();
        
        return [
            'average_price' => $items->avg('price'),
            'highest_price' => $items->max('price'),
            'lowest_price' => $items->min('price'),
            'total_value' => $items->sum('price'),
            'vegetarian_items' => $items->where('is_vegetarian', true)->count(),
            'vegan_items' => $items->where('is_vegan', true)->count(),
            'gluten_free_items' => $items->where('is_gluten_free', true)->count(),
            'spicy_items' => $items->where('is_spicy', true)->count(),
        ];
    }

    /**
     * Get popular menu items
     */
    public function getPopularItems(Restaurant $restaurant, int $limit = 10): array
    {
        // This would integrate with order data in the future
        // For now, return featured items
        return $restaurant->menuItems()
            ->where('is_featured', true)
            ->orderBy('sort_order')
            ->limit($limit)
            ->get()
            ->toArray();
    }

    /**
     * Get low stock items
     */
    public function getLowStockItems(Restaurant $restaurant): array
    {
        return $restaurant->menuItems()
            ->where('track_inventory', true)
            ->whereColumn('stock_quantity', '<=', 'min_stock_level')
            ->with('menuCategory')
            ->get()
            ->toArray();
    }

    /**
     * Update menu item stock
     */
    public function updateStock(MenuItem $menuItem, int $quantity): bool
    {
        if (!$menuItem->track_inventory) {
            return false;
        }

        $menuItem->update(['stock_quantity' => $quantity]);
        return true;
    }

    /**
     * Bulk update menu item availability
     */
    public function bulkUpdateAvailability(array $itemIds, bool $isAvailable): int
    {
        return MenuItem::whereIn('id', $itemIds)
            ->update(['is_available' => $isAvailable]);
    }

    /**
     * Get menu items by category
     */
    public function getItemsByCategory(Restaurant $restaurant, int $categoryId = null): array
    {
        $query = $restaurant->menuItems()->with('menuCategory');
        
        if ($categoryId) {
            $query->where('menu_category_id', $categoryId);
        }
        
        return $query->orderBy('sort_order')->get()->toArray();
    }
}

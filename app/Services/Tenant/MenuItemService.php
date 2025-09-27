<?php

namespace App\Services\Tenant;

use App\Models\Restaurant;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use Illuminate\Support\Str;

class MenuItemService
{
    /**
     * Get all menu items for a restaurant
     */
    public function getItems(Restaurant $restaurant, array $filters = []): array
    {
        $query = $restaurant->menuItems()->with('menuCategory');
        
        if (isset($filters['category_id'])) {
            $query->where('menu_category_id', $filters['category_id']);
        }
        
        if (isset($filters['is_available'])) {
            $query->where('is_available', $filters['is_available']);
        }
        
        if (isset($filters['is_featured'])) {
            $query->where('is_featured', $filters['is_featured']);
        }
        
        if (isset($filters['search'])) {
            $query->where(function($q) use ($filters) {
                $q->where('name', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('description', 'like', '%' . $filters['search'] . '%');
            });
        }
        
        return $query->orderBy('sort_order')->get()->toArray();
    }

    /**
     * Create a new menu item
     */
    public function createItem(Restaurant $restaurant, array $data): MenuItem
    {
        $data['tenant_id'] = $restaurant->tenant_id;
        $data['restaurant_id'] = $restaurant->id;
        $data['slug'] = $this->generateUniqueSlug($data['name'], $restaurant);
        
        return MenuItem::create($data);
    }

    /**
     * Update a menu item
     */
    public function updateItem(MenuItem $item, array $data): MenuItem
    {
        if (isset($data['name']) && $data['name'] !== $item->name) {
            $data['slug'] = $this->generateUniqueSlug($data['name'], $item->restaurant, $item->id);
        }
        
        $item->update($data);
        return $item->fresh();
    }

    /**
     * Delete a menu item
     */
    public function deleteItem(MenuItem $item): bool
    {
        return $item->delete();
    }

    /**
     * Reorder menu items
     */
    public function reorderItems(array $itemOrders): bool
    {
        foreach ($itemOrders as $order) {
            MenuItem::where('id', $order['id'])
                ->update(['sort_order' => $order['sort_order']]);
        }
        
        return true;
    }

    /**
     * Update item availability
     */
    public function updateAvailability(MenuItem $item, bool $isAvailable): bool
    {
        return $item->update(['is_available' => $isAvailable]);
    }

    /**
     * Update item stock
     */
    public function updateStock(MenuItem $item, int $quantity): bool
    {
        if (!$item->track_inventory) {
            return false;
        }
        
        return $item->update(['stock_quantity' => $quantity]);
    }

    /**
     * Bulk update items
     */
    public function bulkUpdate(array $itemIds, array $data): int
    {
        return MenuItem::whereIn('id', $itemIds)->update($data);
    }

    /**
     * Get item statistics
     */
    public function getItemStats(MenuItem $item): array
    {
        return [
            'profit_margin' => $item->profit_margin,
            'is_in_stock' => $item->isInStock(),
            'is_low_stock' => $item->isLowStock(),
            'formatted_price' => $item->formatted_price,
        ];
    }

    /**
     * Generate unique slug for menu item
     */
    private function generateUniqueSlug(string $name, Restaurant $restaurant, ?int $excludeId = null): string
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        $counter = 1;
        
        do {
            $query = MenuItem::where('restaurant_id', $restaurant->id)
                ->where('slug', $slug);
                
            if ($excludeId) {
                $query->where('id', '!=', $excludeId);
            }
            
            $exists = $query->exists();
            
            if ($exists) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }
        } while ($exists);
        
        return $slug;
    }
}

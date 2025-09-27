<?php

namespace App\Services\Tenant;

use App\Models\Restaurant;
use App\Models\MenuCategory;
use Illuminate\Support\Str;

class MenuCategoryService
{
    /**
     * Get all categories for a restaurant
     */
    public function getCategories(Restaurant $restaurant, array $filters = []): array
    {
        $query = $restaurant->menuCategories()->withCount('menuItems');
        
        if (isset($filters['is_active'])) {
            $query->where('is_active', $filters['is_active']);
        }
        
        return $query->orderBy('sort_order')->get()->toArray();
    }

    /**
     * Create a new menu category
     */
    public function createCategory(Restaurant $restaurant, array $data): MenuCategory
    {
        $data['tenant_id'] = $restaurant->tenant_id;
        $data['restaurant_id'] = $restaurant->id;
        $data['slug'] = $this->generateUniqueSlug($data['name'], $restaurant);
        
        return MenuCategory::create($data);
    }

    /**
     * Update a menu category
     */
    public function updateCategory(MenuCategory $category, array $data): MenuCategory
    {
        if (isset($data['name']) && $data['name'] !== $category->name) {
            $data['slug'] = $this->generateUniqueSlug($data['name'], $category->restaurant, $category->id);
        }
        
        $category->update($data);
        return $category->fresh();
    }

    /**
     * Delete a menu category
     */
    public function deleteCategory(MenuCategory $category): bool
    {
        // Check if category has items
        if ($category->menuItems()->count() > 0) {
            throw new \Exception('Cannot delete category with menu items. Please move or delete items first.');
        }
        
        return $category->delete();
    }

    /**
     * Reorder categories
     */
    public function reorderCategories(array $categoryOrders): bool
    {
        foreach ($categoryOrders as $order) {
            MenuCategory::where('id', $order['id'])
                ->update(['sort_order' => $order['sort_order']]);
        }
        
        return true;
    }

    /**
     * Get category statistics
     */
    public function getCategoryStats(MenuCategory $category): array
    {
        $items = $category->menuItems();
        
        return [
            'total_items' => $items->count(),
            'available_items' => $items->where('is_available', true)->count(),
            'featured_items' => $items->where('is_featured', true)->count(),
            'average_price' => $items->avg('price'),
            'total_value' => $items->sum('price'),
        ];
    }

    /**
     * Generate unique slug for category
     */
    private function generateUniqueSlug(string $name, Restaurant $restaurant, ?int $excludeId = null): string
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        $counter = 1;
        
        do {
            $query = MenuCategory::where('restaurant_id', $restaurant->id)
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

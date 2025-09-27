<?php

namespace App\Services\Tenant;

use App\Models\Restaurant;
use App\Models\TableCategory;
use Illuminate\Support\Collection;

class TableCategoryService
{
    /**
     * Create a new table category
     */
    public function createCategory(Restaurant $restaurant, array $data): TableCategory
    {
        $data['tenant_id'] = $restaurant->tenant_id;
        $data['restaurant_id'] = $restaurant->id;
        
        // Set display order if not provided
        if (!isset($data['display_order'])) {
            $data['display_order'] = $restaurant->tableCategories()->max('display_order') + 1;
        }
        
        return TableCategory::create($data);
    }

    /**
     * Update a table category
     */
    public function updateCategory(TableCategory $category, array $data): TableCategory
    {
        $category->update($data);
        return $category->fresh();
    }

    /**
     * Delete a table category
     */
    public function deleteCategory(TableCategory $category): bool
    {
        return $category->delete();
    }

    /**
     * Get all floors for a restaurant
     */
    public function getFloors(Restaurant $restaurant): array
    {
        return $restaurant->tableCategories()
            ->whereNotNull('floor')
            ->distinct()
            ->pluck('floor')
            ->sort()
            ->values()
            ->toArray();
    }

    /**
     * Get all sections for a restaurant
     */
    public function getSections(Restaurant $restaurant): array
    {
        return $restaurant->tableCategories()
            ->whereNotNull('section')
            ->distinct()
            ->pluck('section')
            ->sort()
            ->values()
            ->toArray();
    }

    /**
     * Reorder categories
     */
    public function reorderCategories(Restaurant $restaurant, array $categories): int
    {
        $updated = 0;
        
        foreach ($categories as $categoryData) {
            $category = $restaurant->tableCategories()
                ->where('id', $categoryData['id'])
                ->first();
                
            if ($category) {
                $category->update(['display_order' => $categoryData['display_order']]);
                $updated++;
            }
        }
        
        return $updated;
    }

    /**
     * Get category statistics for a restaurant
     */
    public function getCategoryStats(Restaurant $restaurant): array
    {
        $categories = $restaurant->tableCategories()
            ->withCount(['tables', 'availableTables', 'occupiedTables'])
            ->get();

        $totalCategories = $categories->count();
        $activeCategories = $categories->where('is_active', true)->count();
        $totalTables = $categories->sum('tables_count');
        $availableTables = $categories->sum('available_tables_count');
        $occupiedTables = $categories->sum('occupied_tables_count');

        // Get floor distribution
        $floorDistribution = $categories->groupBy('floor')
            ->map(function ($floorCategories) {
                return [
                    'count' => $floorCategories->count(),
                    'tables' => $floorCategories->sum('tables_count'),
                    'available' => $floorCategories->sum('available_tables_count'),
                    'occupied' => $floorCategories->sum('occupied_tables_count'),
                ];
            })
            ->toArray();

        // Get section distribution
        $sectionDistribution = $categories->groupBy('section')
            ->map(function ($sectionCategories) {
                return [
                    'count' => $sectionCategories->count(),
                    'tables' => $sectionCategories->sum('tables_count'),
                    'available' => $sectionCategories->sum('available_tables_count'),
                    'occupied' => $sectionCategories->sum('occupied_tables_count'),
                ];
            })
            ->toArray();

        return [
            'total_categories' => $totalCategories,
            'active_categories' => $activeCategories,
            'inactive_categories' => $totalCategories - $activeCategories,
            'total_tables' => $totalTables,
            'available_tables' => $availableTables,
            'occupied_tables' => $occupiedTables,
            'floor_distribution' => $floorDistribution,
            'section_distribution' => $sectionDistribution,
        ];
    }

    /**
     * Get categories by floor
     */
    public function getCategoriesByFloor(Restaurant $restaurant, string $floor): Collection
    {
        return $restaurant->tableCategories()
            ->where('floor', $floor)
            ->active()
            ->withCount(['tables', 'availableTables', 'occupiedTables'])
            ->ordered()
            ->get();
    }

    /**
     * Get categories by section
     */
    public function getCategoriesBySection(Restaurant $restaurant, string $section): Collection
    {
        return $restaurant->tableCategories()
            ->where('section', $section)
            ->active()
            ->withCount(['tables', 'availableTables', 'occupiedTables'])
            ->ordered()
            ->get();
    }

    /**
     * Search categories
     */
    public function searchCategories(Restaurant $restaurant, string $search): Collection
    {
        return $restaurant->tableCategories()
            ->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      ->orWhere('floor', 'like', "%{$search}%")
                      ->orWhere('section', 'like', "%{$search}%");
            })
            ->withCount(['tables', 'availableTables', 'occupiedTables'])
            ->ordered()
            ->get();
    }

    /**
     * Get category layout/floor plan
     */
    public function getCategoryLayout(Restaurant $restaurant): array
    {
        $categories = $restaurant->tableCategories()
            ->active()
            ->with(['tables' => function ($query) {
                $query->orderBy('name');
            }])
            ->ordered()
            ->get();

        $layout = [];
        foreach ($categories as $category) {
            $layout[] = [
                'id' => $category->id,
                'name' => $category->name,
                'description' => $category->description,
                'floor' => $category->floor,
                'section' => $category->section,
                'color' => $category->color,
                'icon' => $category->icon,
                'display_order' => $category->display_order,
                'stats' => $category->getStats(),
                'tables' => $category->tables->map(function ($table) {
                    return [
                        'id' => $table->id,
                        'name' => $table->name,
                        'number' => $table->number,
                        'capacity' => $table->capacity,
                        'table_type' => $table->table_type,
                        'status' => $table->status,
                        'status_color' => $table->status_color,
                        'position_x' => $table->position_x,
                        'position_y' => $table->position_y,
                        'shape' => $table->shape,
                    ];
                })->toArray(),
            ];
        }

        return $layout;
    }

    /**
     * Bulk update category status
     */
    public function bulkUpdateStatus(Restaurant $restaurant, array $data): int
    {
        return $restaurant->tableCategories()
            ->whereIn('id', $data['category_ids'])
            ->update(['is_active' => $data['is_active']]);
    }

    /**
     * Get category utilization report
     */
    public function getCategoryUtilizationReport(Restaurant $restaurant, string $dateFrom = null, string $dateTo = null): array
    {
        $dateFrom = $dateFrom ?: now()->startOfDay();
        $dateTo = $dateTo ?: now()->endOfDay();

        $categories = $restaurant->tableCategories()
            ->active()
            ->with(['tables.orders' => function ($query) use ($dateFrom, $dateTo) {
                $query->whereBetween('created_at', [$dateFrom, $dateTo]);
            }])
            ->get();

        $report = [];
        foreach ($categories as $category) {
            $totalOrders = 0;
            $totalRevenue = 0;
            
            foreach ($category->tables as $table) {
                $tableOrders = $table->orders->count();
                $tableRevenue = $table->orders->sum('total_amount');
                
                $totalOrders += $tableOrders;
                $totalRevenue += $tableRevenue;
            }
            
            $averageOrderValue = $totalOrders > 0 ? $totalRevenue / $totalOrders : 0;

            $report[] = [
                'category_id' => $category->id,
                'category_name' => $category->name,
                'floor' => $category->floor,
                'section' => $category->section,
                'total_tables' => $category->tables->count(),
                'available_tables' => $category->available_tables_count,
                'occupied_tables' => $category->occupied_tables_count,
                'total_orders' => $totalOrders,
                'total_revenue' => $totalRevenue,
                'average_order_value' => round($averageOrderValue, 2),
                'utilization_rate' => $category->utilization_rate,
            ];
        }

        return $report;
    }
}

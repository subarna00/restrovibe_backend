<?php

namespace App\Services\Tenant;

use App\Models\Restaurant;
use App\Models\Table;
use Illuminate\Support\Collection;

class TableService
{
    /**
     * Create a new table
     */
    public function createTable(Restaurant $restaurant, array $data): Table
    {
        $data['tenant_id'] = $restaurant->tenant_id;
        $data['restaurant_id'] = $restaurant->id;
        
        return Table::create($data);
    }

    /**
     * Update a table
     */
    public function updateTable(Table $table, array $data): Table
    {
        $table->update($data);
        return $table->fresh();
    }

    /**
     * Delete a table
     */
    public function deleteTable(Table $table): bool
    {
        return $table->delete();
    }

    /**
     * Get table statistics for a restaurant
     */
    public function getTableStats(Restaurant $restaurant): array
    {
        $tables = $restaurant->tables();
        
        $totalTables = $tables->count();
        $availableTables = $tables->available()->count();
        $occupiedTables = $tables->occupied()->count();
        $reservedTables = $tables->where('status', 'reserved')->count();
        $outOfServiceTables = $tables->where('status', 'out_of_service')->count();
        $cleaningTables = $tables->where('status', 'cleaning')->count();

        $totalCapacity = $tables->sum('capacity');
        $availableCapacity = $tables->available()->sum('capacity');

        // Get status distribution
        $statusDistribution = $tables->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        // Get table type distribution
        $typeDistribution = $tables->selectRaw('table_type, COUNT(*) as count')
            ->groupBy('table_type')
            ->pluck('count', 'table_type')
            ->toArray();

        // Get floor distribution
        $floorDistribution = $tables->selectRaw('floor, COUNT(*) as count')
            ->whereNotNull('floor')
            ->groupBy('floor')
            ->pluck('count', 'floor')
            ->toArray();

        // Get section distribution
        $sectionDistribution = $tables->selectRaw('section, COUNT(*) as count')
            ->whereNotNull('section')
            ->groupBy('section')
            ->pluck('count', 'section')
            ->toArray();

        // Calculate utilization rate
        $utilizationRate = $totalTables > 0 ? round((($occupiedTables + $reservedTables) / $totalTables) * 100, 2) : 0;

        return [
            'total_tables' => $totalTables,
            'available_tables' => $availableTables,
            'occupied_tables' => $occupiedTables,
            'reserved_tables' => $reservedTables,
            'out_of_service_tables' => $outOfServiceTables,
            'cleaning_tables' => $cleaningTables,
            'total_capacity' => $totalCapacity,
            'available_capacity' => $availableCapacity,
            'utilization_rate' => $utilizationRate,
            'status_distribution' => $statusDistribution,
            'type_distribution' => $typeDistribution,
            'floor_distribution' => $floorDistribution,
            'section_distribution' => $sectionDistribution,
        ];
    }

    /**
     * Get available tables for a given capacity
     */
    public function getAvailableTables(Restaurant $restaurant, array $filters): Collection
    {
        $query = $restaurant->tables()
            ->available()
            ->withMinCapacity($filters['capacity']);

        if (isset($filters['floor'])) {
            $query->where('floor', $filters['floor']);
        }

        if (isset($filters['section'])) {
            $query->where('section', $filters['section']);
        }

        return $query->orderBy('capacity')
            ->orderBy('name')
            ->get();
    }

    /**
     * Get table layout/floor plan
     */
    public function getTableLayout(Restaurant $restaurant): array
    {
        $tables = $restaurant->tables()
            ->whereNotNull('position_x')
            ->whereNotNull('position_y')
            ->get();

        $floors = $tables->groupBy('floor');
        $layout = [];

        foreach ($floors as $floor => $floorTables) {
            $layout[$floor] = [
                'floor' => $floor,
                'tables' => $floorTables->map(function ($table) {
                    return [
                        'id' => $table->id,
                        'name' => $table->name,
                        'number' => $table->number,
                        'section' => $table->section,
                        'capacity' => $table->capacity,
                        'table_type' => $table->table_type,
                        'status' => $table->status,
                        'status_color' => $table->status_color,
                        'position_x' => $table->position_x,
                        'position_y' => $table->position_y,
                        'shape' => $table->shape,
                        'active_orders_count' => $table->activeOrders()->count(),
                    ];
                })->toArray(),
            ];
        }

        return $layout;
    }

    /**
     * Get all floors for a restaurant
     */
    public function getFloors(Restaurant $restaurant): array
    {
        return $restaurant->tables()
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
        return $restaurant->tables()
            ->whereNotNull('section')
            ->distinct()
            ->pluck('section')
            ->sort()
            ->values()
            ->toArray();
    }

    /**
     * Get all table types used in a restaurant
     */
    public function getTableTypes(Restaurant $restaurant): array
    {
        return $restaurant->tables()
            ->whereNotNull('table_type')
            ->distinct()
            ->pluck('table_type')
            ->sort()
            ->values()
            ->toArray();
    }

    /**
     * Bulk update table statuses
     */
    public function bulkUpdateStatus(Restaurant $restaurant, array $data): int
    {
        return $restaurant->tables()
            ->whereIn('id', $data['table_ids'])
            ->update(['status' => $data['status']]);
    }

    /**
     * Get tables by status
     */
    public function getTablesByStatus(Restaurant $restaurant, string $status): Collection
    {
        return $restaurant->tables()
            ->where('status', $status)
            ->orderBy('floor')
            ->orderBy('section')
            ->orderBy('name')
            ->get();
    }

    /**
     * Get tables by type
     */
    public function getTablesByType(Restaurant $restaurant, string $type): Collection
    {
        return $restaurant->tables()
            ->where('table_type', $type)
            ->orderBy('floor')
            ->orderBy('section')
            ->orderBy('name')
            ->get();
    }

    /**
     * Get tables by floor
     */
    public function getTablesByFloor(Restaurant $restaurant, string $floor): Collection
    {
        return $restaurant->tables()
            ->where('floor', $floor)
            ->orderBy('section')
            ->orderBy('name')
            ->get();
    }

    /**
     * Get tables by section
     */
    public function getTablesBySection(Restaurant $restaurant, string $section): Collection
    {
        return $restaurant->tables()
            ->where('section', $section)
            ->orderBy('name')
            ->get();
    }

    /**
     * Search tables
     */
    public function searchTables(Restaurant $restaurant, string $search): Collection
    {
        return $restaurant->tables()
            ->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('number', 'like', "%{$search}%")
                      ->orWhere('floor', 'like', "%{$search}%")
                      ->orWhere('section', 'like', "%{$search}%")
                      ->orWhere('table_type', 'like', "%{$search}%");
            })
            ->orderBy('floor')
            ->orderBy('section')
            ->orderBy('name')
            ->get();
    }

    /**
     * Get table utilization report
     */
    public function getTableUtilizationReport(Restaurant $restaurant, string $dateFrom = null, string $dateTo = null): array
    {
        $dateFrom = $dateFrom ?: now()->startOfDay();
        $dateTo = $dateTo ?: now()->endOfDay();

        $tables = $restaurant->tables()->with(['orders' => function ($query) use ($dateFrom, $dateTo) {
            $query->whereBetween('created_at', [$dateFrom, $dateTo]);
        }])->get();

        $report = [];
        foreach ($tables as $table) {
            $ordersCount = $table->orders->count();
            $totalRevenue = $table->orders->sum('total_amount');
            $averageOrderValue = $ordersCount > 0 ? $totalRevenue / $ordersCount : 0;

            $report[] = [
                'table_id' => $table->id,
                'table_name' => $table->name,
                'floor' => $table->floor,
                'section' => $table->section,
                'capacity' => $table->capacity,
                'table_type' => $table->table_type,
                'current_status' => $table->status,
                'orders_count' => $ordersCount,
                'total_revenue' => $totalRevenue,
                'average_order_value' => round($averageOrderValue, 2),
                'utilization_percentage' => $ordersCount > 0 ? 100 : 0, // Simplified calculation
            ];
        }

        return $report;
    }
}

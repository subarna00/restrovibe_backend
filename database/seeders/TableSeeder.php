<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Table;
use App\Models\TableCategory;
use App\Models\Restaurant;
use App\Models\Tenant;

class TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tenants = Tenant::all();
        
        foreach ($tenants as $tenant) {
            $restaurants = $tenant->restaurants;
            
            foreach ($restaurants as $restaurant) {
                $this->createTables($restaurant);
            }
        }
    }

    private function createTables(Restaurant $restaurant): void
    {
        $categories = $restaurant->tableCategories;
        
        foreach ($categories as $category) {
            $this->createTablesForCategory($category);
        }
    }

    private function createTablesForCategory(TableCategory $category): void
    {
        $tables = [];
        
        switch ($category->name) {
            case 'Ground Floor':
                $tables = $this->getGroundFloorTables($category);
                break;
            case 'Private Cabins':
                $tables = $this->getPrivateCabinTables($category);
                break;
            case 'VIP Section':
                $tables = $this->getVipSectionTables($category);
                break;
            case 'Outdoor Seating':
                $tables = $this->getOutdoorSeatingTables($category);
                break;
            case 'Bar Area':
                $tables = $this->getBarAreaTables($category);
                break;
            case 'Family Section':
                $tables = $this->getFamilySectionTables($category);
                break;
            default:
                $tables = $this->getDefaultTables($category);
        }

        foreach ($tables as $tableData) {
            Table::create([
                'tenant_id' => $category->tenant_id,
                'restaurant_id' => $category->restaurant_id,
                'category_id' => $category->id,
                ...$tableData,
            ]);
        }
    }

    private function getGroundFloorTables(TableCategory $category): array
    {
        return [
            [
                'name' => 'Table 1',
                'number' => 'T001',
                'floor' => $category->floor,
                'section' => $category->section,
                'capacity' => 2,
                'table_type' => 'Regular Table',
                'status' => 'available',
                'position_x' => 10.5,
                'position_y' => 15.2,
                'shape' => 'rectangle',
                'notes' => 'Window table with city view',
            ],
            [
                'name' => 'Table 2',
                'number' => 'T002',
                'floor' => $category->floor,
                'section' => $category->section,
                'capacity' => 4,
                'table_type' => 'Regular Table',
                'status' => 'available',
                'position_x' => 25.0,
                'position_y' => 15.2,
                'shape' => 'rectangle',
                'notes' => 'Center table',
            ],
            [
                'name' => 'Table 3',
                'number' => 'T003',
                'floor' => $category->floor,
                'section' => $category->section,
                'capacity' => 4,
                'table_type' => 'Regular Table',
                'status' => 'occupied',
                'position_x' => 40.0,
                'position_y' => 15.2,
                'shape' => 'rectangle',
                'notes' => 'Near entrance',
            ],
        ];
    }

    private function getPrivateCabinTables(TableCategory $category): array
    {
        return [
            [
                'name' => 'Cabin 1',
                'number' => 'C001',
                'floor' => $category->floor,
                'section' => $category->section,
                'capacity' => 4,
                'table_type' => 'Private Cabin',
                'status' => 'available',
                'position_x' => 60.0,
                'position_y' => 10.0,
                'shape' => 'rectangle',
                'notes' => 'Intimate dining cabin with privacy curtains',
            ],
            [
                'name' => 'Cabin 2',
                'number' => 'C002',
                'floor' => $category->floor,
                'section' => $category->section,
                'capacity' => 6,
                'table_type' => 'Private Cabin',
                'status' => 'occupied',
                'position_x' => 80.0,
                'position_y' => 10.0,
                'shape' => 'rectangle',
                'notes' => 'Larger cabin for groups',
            ],
        ];
    }

    private function getVipSectionTables(TableCategory $category): array
    {
        return [
            [
                'name' => 'VIP 1',
                'number' => 'V001',
                'floor' => $category->floor,
                'section' => $category->section,
                'capacity' => 4,
                'table_type' => 'VIP Table',
                'status' => 'available',
                'position_x' => 10.0,
                'position_y' => 50.0,
                'shape' => 'rectangle',
                'notes' => 'Premium VIP table with city view',
            ],
        ];
    }

    private function getOutdoorSeatingTables(TableCategory $category): array
    {
        return [
            [
                'name' => 'Garden 1',
                'number' => 'G001',
                'floor' => $category->floor,
                'section' => $category->section,
                'capacity' => 2,
                'table_type' => 'Outdoor Table',
                'status' => 'available',
                'position_x' => 5.0,
                'position_y' => 70.0,
                'shape' => 'circle',
                'notes' => 'Garden view table',
            ],
        ];
    }

    private function getBarAreaTables(TableCategory $category): array
    {
        return [
            [
                'name' => 'Bar 1',
                'number' => 'B001',
                'floor' => $category->floor,
                'section' => $category->section,
                'capacity' => 1,
                'table_type' => 'Bar Table',
                'status' => 'available',
                'position_x' => 70.0,
                'position_y' => 40.0,
                'shape' => 'rectangle',
                'notes' => 'Single bar stool',
            ],
        ];
    }

    private function getFamilySectionTables(TableCategory $category): array
    {
        return [
            [
                'name' => 'Family 1',
                'number' => 'F001',
                'floor' => $category->floor,
                'section' => $category->section,
                'capacity' => 8,
                'table_type' => 'Family Table',
                'status' => 'available',
                'position_x' => 10.0,
                'position_y' => 90.0,
                'shape' => 'rectangle',
                'notes' => 'Large family table with high chairs',
            ],
        ];
    }

    private function getDefaultTables(TableCategory $category): array
    {
        return [
            [
                'name' => 'Table 1',
                'number' => 'T001',
                'floor' => $category->floor,
                'section' => $category->section,
                'capacity' => 4,
                'table_type' => 'Regular Table',
                'status' => 'available',
                'position_x' => 10.0,
                'position_y' => 10.0,
                'shape' => 'rectangle',
                'notes' => 'Default table',
            ],
        ];
    }
}

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
        $tables = [];
        $tableTypes = ['Regular Table', 'Booth', 'Window Table', 'Corner Table'];
        $shapes = ['rectangle', 'circle', 'oval', 'square'];
        $statuses = ['available', 'occupied', 'reserved', 'cleaning'];
        
        for ($i = 1; $i <= 12; $i++) {
            $capacity = rand(1, 2) === 1 ? 2 : 4; // 50% chance of 2 or 4 seats
            $status = $statuses[array_rand($statuses)];
            $tableType = $tableTypes[array_rand($tableTypes)];
            $shape = $shapes[array_rand($shapes)];
            
            $tables[] = [
                'name' => "Table {$i}",
                'number' => 'T' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'floor' => $category->floor,
                'section' => $category->section,
                'capacity' => $capacity,
                'table_type' => $tableType,
                'status' => $status,
                'position_x' => rand(5, 95),
                'position_y' => rand(5, 95),
                'shape' => $shape,
                'notes' => $this->getRandomTableNotes($tableType, $i),
                'settings' => [
                    'has_power_outlet' => rand(1, 10) <= 6,
                    'has_wifi' => true,
                    'wheelchair_accessible' => rand(1, 10) <= 8,
                ],
            ];
        }
        
        return $tables;
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

    /**
     * Get random table notes based on table type
     */
    private function getRandomTableNotes(string $tableType, int $tableNumber): ?string
    {
        $notes = [
            'Window table with city view',
            'Near entrance',
            'Center table',
            'Quiet corner',
            'Near restroom',
            'High traffic area',
            'Power outlet available',
            'Wheelchair accessible',
            'Good for groups',
            'Intimate setting',
            'Near kitchen',
            'Garden view',
            'Street view',
            'Private area',
            'Main dining area',
        ];

        // Add type-specific notes
        $typeNotes = [
            'Regular Table' => ['Standard seating', 'Comfortable chairs'],
            'Booth' => ['U-shaped seating', 'High back', 'Privacy'],
            'Window Table' => ['Natural light', 'City view', 'Garden view'],
            'Corner Table' => ['Quiet location', 'Private feel'],
            'Bar Table' => ['Bar height', 'Stool seating'],
            'Family Table' => ['Large capacity', 'High chairs available'],
            'VIP Table' => ['Premium location', 'Exclusive service'],
            'Outdoor Table' => ['Weather dependent', 'Garden setting'],
        ];

        $allNotes = array_merge($notes, $typeNotes[$tableType] ?? []);
        
        return rand(1, 10) <= 7 ? $allNotes[array_rand($allNotes)] : null;
    }
}

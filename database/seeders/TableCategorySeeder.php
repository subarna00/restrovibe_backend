<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TableCategory;
use App\Models\Restaurant;
use App\Models\Tenant;

class TableCategorySeeder extends Seeder
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
                $this->createTableCategories($restaurant);
            }
        }
    }

    private function createTableCategories(Restaurant $restaurant): void
    {
        $categories = [
            [
                'name' => 'Ground Floor',
                'description' => 'Main dining area on the ground floor',
                'floor' => 'Ground Floor',
                'section' => 'Main Hall',
                'display_order' => 1,
                'is_active' => true,
                'color' => '#3B82F6',
                'icon' => 'fas fa-home',
                'settings' => [
                    'max_capacity' => 50,
                    'reservation_required' => false,
                    'smoking_allowed' => false,
                ],
            ],
            [
                'name' => 'Private Cabins',
                'description' => 'Private dining cabins for intimate gatherings',
                'floor' => 'Ground Floor',
                'section' => 'Private Area',
                'display_order' => 2,
                'is_active' => true,
                'color' => '#8B5CF6',
                'icon' => 'fas fa-door-closed',
                'settings' => [
                    'max_capacity' => 8,
                    'reservation_required' => true,
                    'smoking_allowed' => false,
                    'minimum_order' => 2000,
                ],
            ],
            [
                'name' => 'VIP Section',
                'description' => 'Premium VIP dining area with exclusive service',
                'floor' => 'First Floor',
                'section' => 'VIP Area',
                'display_order' => 3,
                'is_active' => true,
                'color' => '#F59E0B',
                'icon' => 'fas fa-crown',
                'settings' => [
                    'max_capacity' => 20,
                    'reservation_required' => true,
                    'smoking_allowed' => false,
                    'minimum_order' => 5000,
                    'exclusive_service' => true,
                ],
            ],
            [
                'name' => 'Outdoor Seating',
                'description' => 'Open-air dining with garden view',
                'floor' => 'Ground Floor',
                'section' => 'Garden',
                'display_order' => 4,
                'is_active' => true,
                'color' => '#10B981',
                'icon' => 'fas fa-tree',
                'settings' => [
                    'max_capacity' => 30,
                    'reservation_required' => false,
                    'smoking_allowed' => true,
                    'weather_dependent' => true,
                ],
            ],
            [
                'name' => 'Bar Area',
                'description' => 'Casual dining at the bar counter',
                'floor' => 'Ground Floor',
                'section' => 'Bar',
                'display_order' => 5,
                'is_active' => true,
                'color' => '#EF4444',
                'icon' => 'fas fa-wine-glass',
                'settings' => [
                    'max_capacity' => 15,
                    'reservation_required' => false,
                    'smoking_allowed' => false,
                    'bar_service' => true,
                ],
            ],
            [
                'name' => 'Family Section',
                'description' => 'Spacious area perfect for family dining',
                'floor' => 'First Floor',
                'section' => 'Family Area',
                'display_order' => 6,
                'is_active' => true,
                'color' => '#06B6D4',
                'icon' => 'fas fa-users',
                'settings' => [
                    'max_capacity' => 40,
                    'reservation_required' => false,
                    'smoking_allowed' => false,
                    'family_friendly' => true,
                    'high_chairs_available' => true,
                ],
            ],
        ];

        foreach ($categories as $categoryData) {
            TableCategory::create([
                'tenant_id' => $restaurant->tenant_id,
                'restaurant_id' => $restaurant->id,
                ...$categoryData,
            ]);
        }
    }
}
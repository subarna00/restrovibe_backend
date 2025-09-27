<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Restaurant;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use Illuminate\Support\Str;

class MenuDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Creating menu data for restaurants...');

        // Get all restaurants
        $restaurants = Restaurant::all();

        foreach ($restaurants as $restaurant) {
            $this->command->info("Creating menu for restaurant: {$restaurant->name}");
            $this->createMenuForRestaurant($restaurant);
        }

        $this->command->info('Menu data created successfully!');
    }

    /**
     * Create menu categories and items for a restaurant
     */
    private function createMenuForRestaurant(Restaurant $restaurant): void
    {
        // Define menu categories based on restaurant cuisine type
        $categories = $this->getCategoriesForCuisine($restaurant->cuisine_type);

        foreach ($categories as $categoryData) {
            // Create menu category
            $category = MenuCategory::create([
                'tenant_id' => $restaurant->tenant_id,
                'restaurant_id' => $restaurant->id,
                'name' => $categoryData['name'],
                'slug' => $this->generateUniqueSlug($categoryData['name'], $restaurant),
                'description' => $categoryData['description'],
                'image' => null, // Will be set by MenuImageSeeder
                'sort_order' => $categoryData['sort_order'],
                'is_active' => true,
                'settings' => $categoryData['settings'] ?? null,
            ]);

            // Create menu items for this category
            if (isset($categoryData['items'])) {
                foreach ($categoryData['items'] as $itemData) {
                    MenuItem::create([
                        'tenant_id' => $restaurant->tenant_id,
                        'restaurant_id' => $restaurant->id,
                        'menu_category_id' => $category->id,
                        'name' => $itemData['name'],
                        'slug' => $this->generateUniqueSlug($itemData['name'], $restaurant),
                        'description' => $itemData['description'],
                        'price' => $itemData['price'],
                        'cost_price' => $itemData['cost_price'] ?? null,
                        'image' => null, // Will be set by MenuImageSeeder
                        'images' => null, // Will be set by MenuImageSeeder
                        'is_available' => $itemData['is_available'] ?? true,
                        'is_featured' => $itemData['is_featured'] ?? false,
                        'is_vegetarian' => $itemData['is_vegetarian'] ?? false,
                        'is_vegan' => $itemData['is_vegan'] ?? false,
                        'is_gluten_free' => $itemData['is_gluten_free'] ?? false,
                        'is_spicy' => $itemData['is_spicy'] ?? false,
                        'spice_level' => $itemData['spice_level'] ?? 0,
                        'preparation_time' => $itemData['preparation_time'] ?? null,
                        'calories' => $itemData['calories'] ?? null,
                        'allergens' => $itemData['allergens'] ?? null,
                        'ingredients' => $itemData['ingredients'] ?? null,
                        'nutritional_info' => $itemData['nutritional_info'] ?? null,
                        'sort_order' => $itemData['sort_order'] ?? 0,
                        'stock_quantity' => $itemData['stock_quantity'] ?? null,
                        'track_inventory' => $itemData['track_inventory'] ?? false,
                        'min_stock_level' => $itemData['min_stock_level'] ?? null,
                        'variants' => $itemData['variants'] ?? null,
                        'settings' => $itemData['settings'] ?? null,
                    ]);
                }
            }
        }
    }

    /**
     * Get menu categories and items based on cuisine type
     */
    private function getCategoriesForCuisine(string $cuisineType): array
    {
        $cuisineType = strtolower($cuisineType);

        switch ($cuisineType) {
            case 'italian':
                return \Database\Seeders\MenuData\ItalianMenuData::getMenu();
            case 'mexican':
                return \Database\Seeders\MenuData\MexicanMenuData::getMenu();
            case 'chinese':
                return \Database\Seeders\MenuData\ChineseMenuData::getMenu();
            case 'indian':
                return \Database\Seeders\MenuData\IndianMenuData::getMenu();
            case 'american':
            default:
                return \Database\Seeders\MenuData\AmericanMenuData::getMenu();
        }
    }

    /**
     * Generate unique slug for menu items/categories
     */
    private function generateUniqueSlug(string $name, Restaurant $restaurant): string
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        $counter = 1;

        do {
            $exists = MenuCategory::where('restaurant_id', $restaurant->id)
                ->where('slug', $slug)
                ->exists();

            if ($exists) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }
        } while ($exists);

        return $slug;
    }
}

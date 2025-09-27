<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MenuImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Generating placeholder images for menu data...');

        // Create images directory if it doesn't exist
        $this->createImagesDirectory();

        // Generate category images
        $this->generateCategoryImages();

        // Generate menu item images
        $this->generateMenuItemImages();

        $this->command->info('Menu images generated successfully!');
    }

    /**
     * Create the images directory structure
     */
    private function createImagesDirectory(): void
    {
        $directories = [
            'public/menu/categories',
            'public/menu/items',
            'public/menu/items/multiple',
        ];

        foreach ($directories as $directory) {
            if (!Storage::exists($directory)) {
                Storage::makeDirectory($directory);
                $this->command->info("Created directory: {$directory}");
            }
        }
    }

    /**
     * Generate placeholder images for menu categories
     */
    private function generateCategoryImages(): void
    {
        $categories = MenuCategory::all();

        foreach ($categories as $category) {
            $imageName = $this->generateCategoryImage($category);
            
            // Update the category with the generated image path
            $category->update([
                'image' => "menu/categories/{$imageName}"
            ]);

            $this->command->info("Generated image for category: {$category->name}");
        }
    }

    /**
     * Generate placeholder images for menu items
     */
    private function generateMenuItemImages(): void
    {
        $items = MenuItem::all();

        foreach ($items as $item) {
            // Generate main image
            $mainImageName = $this->generateMenuItemImage($item, 'main');
            
            // Generate multiple images (2-3 additional images)
            $multipleImages = [];
            $imageCount = rand(2, 3);
            
            for ($i = 1; $i <= $imageCount; $i++) {
                $additionalImageName = $this->generateMenuItemImage($item, "additional_{$i}");
                $multipleImages[] = "menu/items/multiple/{$additionalImageName}";
            }

            // Update the item with generated images
            $item->update([
                'image' => "menu/items/{$mainImageName}",
                'images' => $multipleImages
            ]);

            $this->command->info("Generated images for item: {$item->name}");
        }
    }

    /**
     * Generate a category image
     */
    private function generateCategoryImage(MenuCategory $category): string
    {
        $imageName = Str::slug($category->name) . '_' . $category->id . '.jpg';
        $imagePath = "public/menu/categories/{$imageName}";

        // Create a simple colored rectangle as placeholder
        $width = 400;
        $height = 300;
        
        // Generate different colors based on category name
        $colors = $this->getCategoryColors($category->name);
        
        $image = imagecreate($width, $height);
        $backgroundColor = imagecolorallocate($image, $colors['r'], $colors['g'], $colors['b']);
        
        // Add text overlay
        $textColor = imagecolorallocate($image, 255, 255, 255);
        $fontSize = 5;
        $text = strtoupper($category->name);
        
        // Center the text
        $textWidth = imagefontwidth($fontSize) * strlen($text);
        $textHeight = imagefontheight($fontSize);
        $x = ($width - $textWidth) / 2;
        $y = ($height - $textHeight) / 2;
        
        imagestring($image, $fontSize, $x, $y, $text, $textColor);
        
        // Ensure directory exists
        $fullPath = storage_path("app/{$imagePath}");
        $directory = dirname($fullPath);
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }
        
        // Save the image
        imagejpeg($image, $fullPath, 90);
        imagedestroy($image);

        return $imageName;
    }

    /**
     * Generate a menu item image
     */
    private function generateMenuItemImage(MenuItem $item, string $type = 'main'): string
    {
        $suffix = $type === 'main' ? '' : '_' . $type;
        $imageName = Str::slug($item->name) . '_' . $item->id . $suffix . '.jpg';
        $imagePath = $type === 'main' ? "public/menu/items/{$imageName}" : "public/menu/items/multiple/{$imageName}";

        // Create a more detailed image for menu items
        $width = 600;
        $height = 400;
        
        // Generate colors based on item characteristics
        $colors = $this->getMenuItemColors($item);
        
        $image = imagecreate($width, $height);
        $backgroundColor = imagecolorallocate($image, $colors['r'], $colors['g'], $colors['b']);
        
        // Add a border
        $borderColor = imagecolorallocate($image, 200, 200, 200);
        imagerectangle($image, 0, 0, $width - 1, $height - 1, $borderColor);
        
        // Add item name
        $textColor = imagecolorallocate($image, 255, 255, 255);
        $fontSize = 4;
        $text = strtoupper($item->name);
        
        // Center the text
        $textWidth = imagefontwidth($fontSize) * strlen($text);
        $textHeight = imagefontheight($fontSize);
        $x = ($width - $textWidth) / 2;
        $y = ($height - $textHeight) / 2 - 20;
        
        imagestring($image, $fontSize, $x, $y, $text, $textColor);
        
        // Add price
        $priceText = '$' . number_format($item->price, 2);
        $priceWidth = imagefontwidth($fontSize) * strlen($priceText);
        $priceX = ($width - $priceWidth) / 2;
        $priceY = $y + $textHeight + 10;
        
        imagestring($image, $fontSize, $priceX, $priceY, $priceText, $textColor);
        
        // Add dietary indicators
        $indicators = [];
        if ($item->is_vegetarian) $indicators[] = 'VEG';
        if ($item->is_vegan) $indicators[] = 'VEGAN';
        if ($item->is_gluten_free) $indicators[] = 'GF';
        if ($item->is_spicy) $indicators[] = 'SPICY';
        
        if (!empty($indicators)) {
            $indicatorText = implode(' | ', $indicators);
            $indicatorWidth = imagefontwidth(3) * strlen($indicatorText);
            $indicatorX = ($width - $indicatorWidth) / 2;
            $indicatorY = $priceY + $textHeight + 10;
            
            imagestring($image, 3, $indicatorX, $indicatorY, $indicatorText, $textColor);
        }
        
        // Ensure directory exists
        $fullPath = storage_path("app/{$imagePath}");
        $directory = dirname($fullPath);
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }
        
        // Save the image
        imagejpeg($image, $fullPath, 90);
        imagedestroy($image);

        return $imageName;
    }

    /**
     * Get colors for category images based on category name
     */
    private function getCategoryColors(string $categoryName): array
    {
        $colorMap = [
            'antipasti' => ['r' => 139, 'g' => 69, 'b' => 19],   // Brown
            'pasta' => ['r' => 255, 'g' => 215, 'b' => 0],      // Gold
            'pizza' => ['r' => 220, 'g' => 20, 'b' => 60],      // Crimson
            'appetizers' => ['r' => 255, 'g' => 140, 'b' => 0], // Orange
            'burgers' => ['r' => 139, 'g' => 0, 'b' => 0],      // Dark red
            'salads' => ['r' => 34, 'g' => 139, 'b' => 34],     // Forest green
            'tacos' => ['r' => 255, 'g' => 69, 'b' => 0],       // Red orange
            'burritos' => ['r' => 255, 'g' => 165, 'b' => 0],   // Orange
            'curries' => ['r' => 255, 'g' => 69, 'b' => 0],     // Red orange
            'breads' => ['r' => 210, 'g' => 180, 'b' => 140],   // Tan
            'main dishes' => ['r' => 128, 'g' => 0, 'b' => 128], // Purple
        ];

        $categoryKey = strtolower($categoryName);
        
        foreach ($colorMap as $key => $colors) {
            if (strpos($categoryKey, $key) !== false) {
                return $colors;
            }
        }

        // Default color if no match
        return ['r' => 70, 'g' => 130, 'b' => 180]; // Steel blue
    }

    /**
     * Get colors for menu item images based on item characteristics
     */
    private function getMenuItemColors(MenuItem $item): array
    {
        // Base colors for different food types
        if ($item->is_vegetarian || $item->is_vegan) {
            return ['r' => 34, 'g' => 139, 'b' => 34]; // Forest green
        }
        
        if ($item->is_spicy) {
            return ['r' => 255, 'g' => 69, 'b' => 0]; // Red orange
        }
        
        if (strpos(strtolower($item->name), 'pizza') !== false) {
            return ['r' => 220, 'g' => 20, 'b' => 60]; // Crimson
        }
        
        if (strpos(strtolower($item->name), 'pasta') !== false) {
            return ['r' => 255, 'g' => 215, 'b' => 0]; // Gold
        }
        
        if (strpos(strtolower($item->name), 'burger') !== false) {
            return ['r' => 139, 'g' => 0, 'b' => 0]; // Dark red
        }
        
        if (strpos(strtolower($item->name), 'salad') !== false) {
            return ['r' => 50, 'g' => 205, 'b' => 50]; // Lime green
        }
        
        if (strpos(strtolower($item->name), 'taco') !== false) {
            return ['r' => 255, 'g' => 140, 'b' => 0]; // Orange
        }
        
        if (strpos(strtolower($item->name), 'curry') !== false) {
            return ['r' => 255, 'g' => 69, 'b' => 0]; // Red orange
        }
        
        if (strpos(strtolower($item->name), 'chicken') !== false) {
            return ['r' => 255, 'g' => 165, 'b' => 0]; // Orange
        }
        
        if (strpos(strtolower($item->name), 'fish') !== false) {
            return ['r' => 0, 'g' => 191, 'b' => 255]; // Deep sky blue
        }
        
        // Default color
        return ['r' => 70, 'g' => 130, 'b' => 180]; // Steel blue
    }
}
# Menu Image Seeder Documentation

## Overview

The `MenuImageSeeder` automatically generates realistic placeholder images for all menu categories and items in the system. It creates visually appealing images with cuisine-specific colors, dietary indicators, and proper branding.

## Features

### 🎨 **Smart Image Generation**
- **Category Images**: 400x300px colored rectangles with category names
- **Menu Item Images**: 600x400px detailed images with item names, prices, and dietary indicators
- **Multiple Images**: Each menu item gets 2-3 additional images for galleries
- **Cuisine-Specific Colors**: Different color schemes based on cuisine type and food characteristics

### 🍽️ **Cuisine-Specific Color Schemes**

**Italian Cuisine:**
- Antipasti: Brown (#8B4513)
- Pasta: Gold (#FFD700)
- Pizza: Crimson (#DC143C)

**American Cuisine:**
- Appetizers: Orange (#FF8C00)
- Burgers: Dark Red (#8B0000)
- Salads: Forest Green (#228B22)

**Mexican Cuisine:**
- Tacos: Red Orange (#FF4500)
- Burritos: Orange (#FFA500)

**Indian Cuisine:**
- Curries: Red Orange (#FF4500)
- Breads: Tan (#D2B48C)

**Chinese Cuisine:**
- Main Dishes: Purple (#800080)

### 🏷️ **Dietary Indicators**
Menu item images automatically include dietary indicators:
- **VEG** - Vegetarian items (Green background)
- **VEGAN** - Vegan items (Green background)
- **GF** - Gluten-free items
- **SPICY** - Spicy items (Red Orange background)

### 📁 **File Structure**
```
storage/app/public/menu/
├── categories/           # Category images (400x300px)
│   ├── antipasti_1.jpg
│   ├── pasta_2.jpg
│   └── pizza_3.jpg
├── items/               # Main item images (600x400px)
│   ├── bruschetta-classica_1.jpg
│   ├── spaghetti-carbonara_2.jpg
│   └── margherita_3.jpg
└── items/multiple/      # Additional item images
    ├── bruschetta-classica_1_additional_1.jpg
    ├── bruschetta-classica_1_additional_2.jpg
    └── spaghetti-carbonara_2_additional_1.jpg
```

## Usage

### Run the Seeder
```bash
# Run all seeders (including image generation)
php artisan db:seed

# Run only the image seeder
php artisan db:seed --class=MenuImageSeeder
```

### Access Images via Web
Images are accessible via the web at:
```
http://localhost:8000/storage/menu/categories/antipasti_1.jpg
http://localhost:8000/storage/menu/items/bruschetta-classica_1.jpg
http://localhost:8000/storage/menu/items/multiple/bruschetta-classica_1_additional_1.jpg
```

## Technical Implementation

### Image Generation Process

1. **Directory Creation**: Creates necessary directory structure
2. **Category Images**: Generates colored rectangles with category names
3. **Menu Item Images**: Creates detailed images with:
   - Item name (centered, uppercase)
   - Price (formatted as currency)
   - Dietary indicators (if applicable)
   - Colored border
4. **Database Update**: Updates menu categories and items with image paths

### Color Logic

**Category Colors**: Based on category name matching
```php
$colorMap = [
    'antipasti' => ['r' => 139, 'g' => 69, 'b' => 19],   // Brown
    'pasta' => ['r' => 255, 'g' => 215, 'b' => 0],      // Gold
    'pizza' => ['r' => 220, 'g' => 20, 'b' => 60],      // Crimson
    // ... more mappings
];
```

**Item Colors**: Based on item characteristics
```php
if ($item->is_vegetarian || $item->is_vegan) {
    return ['r' => 34, 'g' => 139, 'b' => 34]; // Forest green
}
if ($item->is_spicy) {
    return ['r' => 255, 'g' => 69, 'b' => 0]; // Red orange
}
// ... more logic
```

### File Naming Convention

**Categories**: `{slug}_{id}.jpg`
- Example: `antipasti_1.jpg`, `pasta_2.jpg`

**Menu Items**: `{slug}_{id}.jpg`
- Example: `bruschetta-classica_1.jpg`, `spaghetti-carbonara_2.jpg`

**Multiple Images**: `{slug}_{id}_additional_{number}.jpg`
- Example: `bruschetta-classica_1_additional_1.jpg`

## Database Integration

### Image Path Storage
- **Categories**: `image` field stores `menu/categories/{filename}`
- **Menu Items**: 
  - `image` field stores `menu/items/{filename}`
  - `images` field stores JSON array of additional image paths

### Example Database Records
```php
// Category
MenuCategory::create([
    'name' => 'Antipasti',
    'image' => 'menu/categories/antipasti_1.jpg',
    // ... other fields
]);

// Menu Item
MenuItem::create([
    'name' => 'Bruschetta Classica',
    'image' => 'menu/items/bruschetta-classica_1.jpg',
    'images' => [
        'menu/items/multiple/bruschetta-classica_1_additional_1.jpg',
        'menu/items/multiple/bruschetta-classica_1_additional_2.jpg'
    ],
    // ... other fields
]);
```

## Integration with Menu Management

### API Endpoints
The generated images work seamlessly with all menu management endpoints:

- `GET /tenant/menu/categories` - Returns categories with image paths
- `GET /tenant/menu/items` - Returns items with image paths
- `POST /tenant/menu/categories` - Can accept image paths
- `POST /tenant/menu/items` - Can accept image paths

### Frontend Integration
```javascript
// Display category image
<img src={`/storage/${category.image}`} alt={category.name} />

// Display main item image
<img src={`/storage/${item.image}`} alt={item.name} />

// Display additional images
{item.images.map((image, index) => (
    <img key={index} src={`/storage/${image}`} alt={`${item.name} ${index + 1}`} />
))}
```

## Customization

### Adding New Color Schemes
Edit the `getCategoryColors()` and `getMenuItemColors()` methods:

```php
private function getCategoryColors(string $categoryName): array
{
    $colorMap = [
        'your-category' => ['r' => 255, 'g' => 0, 'b' => 0], // Red
        // ... existing mappings
    ];
    // ... rest of method
}
```

### Modifying Image Dimensions
Change the width and height variables in the image generation methods:

```php
// Category images
$width = 400;  // Change to desired width
$height = 300; // Change to desired height

// Menu item images
$width = 600;  // Change to desired width
$height = 400; // Change to desired height
```

### Adding More Dietary Indicators
Extend the dietary indicators logic:

```php
$indicators = [];
if ($item->is_vegetarian) $indicators[] = 'VEG';
if ($item->is_vegan) $indicators[] = 'VEGAN';
if ($item->is_gluten_free) $indicators[] = 'GF';
if ($item->is_spicy) $indicators[] = 'SPICY';
// Add new indicators
if ($item->is_halal) $indicators[] = 'HALAL';
if ($item->is_kosher) $indicators[] = 'KOSHER';
```

## Performance Considerations

### Image Generation
- **GD Library**: Uses PHP's GD library for image generation
- **JPEG Quality**: Set to 90% for good quality/size balance
- **Batch Processing**: Processes all images in a single seeder run

### Storage
- **Local Storage**: Images stored in `storage/app/public/`
- **Symlink**: `php artisan storage:link` creates public access
- **File Sizes**: Category images ~6KB, Item images ~20KB

## Testing

### Verify Image Generation
```bash
# Check if images were created
ls -la storage/app/public/menu/categories/
ls -la storage/app/public/menu/items/

# Check database records
php artisan tinker --execute="
\$category = App\Models\MenuCategory::first();
echo 'Category Image: ' . \$category->image . PHP_EOL;
\$item = App\Models\MenuItem::first();
echo 'Item Image: ' . \$item->image . PHP_EOL;
echo 'Additional Images: ' . json_encode(\$item->images) . PHP_EOL;
"
```

### Test Web Access
```bash
# Test image access via web
curl -I http://localhost:8000/storage/menu/categories/antipasti_1.jpg
curl -I http://localhost:8000/storage/menu/items/bruschetta-classica_1.jpg
```

## Future Enhancements

1. **Real Food Images**: Integration with food image APIs
2. **Image Optimization**: WebP format, responsive images
3. **CDN Integration**: Cloud storage for better performance
4. **Image Editing**: Built-in image editing capabilities
5. **Batch Upload**: Support for bulk image uploads
6. **Image Analytics**: Track image performance and usage

## Troubleshooting

### Common Issues

**Images not accessible via web:**
```bash
# Ensure storage link exists
php artisan storage:link
```

**Permission errors:**
```bash
# Fix storage permissions
chmod -R 755 storage/app/public/
```

**GD library not available:**
```bash
# Install GD extension (Ubuntu/Debian)
sudo apt-get install php-gd

# Install GD extension (macOS with Homebrew)
brew install php-gd
```

**Directory creation fails:**
```bash
# Ensure storage directory is writable
chmod -R 775 storage/
```

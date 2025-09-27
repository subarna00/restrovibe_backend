# Menu Data Seeder Documentation

## Overview

The `MenuDataSeeder` automatically creates realistic menu data for all restaurants in the system. It generates cuisine-specific categories and menu items based on each restaurant's cuisine type.

## Features

### 🍽️ **Cuisine-Specific Menus**
- **Italian**: Antipasti, Pasta, Pizza with authentic Italian dishes
- **American**: Appetizers, Burgers, Salads with classic American fare
- **Mexican**: Tacos, Burritos with traditional Mexican flavors
- **Chinese**: Appetizers, Main Dishes with authentic Chinese cuisine
- **Indian**: Curries, Breads with aromatic Indian spices

### 📊 **Comprehensive Menu Data**
Each menu item includes:
- **Basic Info**: Name, description, price, cost price
- **Images**: Single image and multiple images support
- **Dietary Info**: Vegetarian, vegan, gluten-free, spicy indicators
- **Nutritional Data**: Calories, allergens, ingredients, nutritional info
- **Inventory**: Stock tracking, minimum stock levels
- **Variants**: Size options, add-ons, customization
- **Settings**: Display preferences, preparation time

### 🏗️ **Automatic Integration**
- Runs automatically when `php artisan db:seed` is executed
- Creates menu data for all existing restaurants
- Generates unique slugs per restaurant
- Maintains proper tenant isolation

## File Structure

```
database/seeders/
├── MenuDataSeeder.php              # Main seeder class
└── MenuData/
    ├── ItalianMenuData.php         # Italian cuisine menu data
    ├── AmericanMenuData.php        # American cuisine menu data
    ├── MexicanMenuData.php         # Mexican cuisine menu data
    ├── ChineseMenuData.php         # Chinese cuisine menu data
    └── IndianMenuData.php          # Indian cuisine menu data
```

## Usage

### Run the Seeder
```bash
# Run all seeders (including menu data)
php artisan db:seed

# Run only the menu seeder
php artisan db:seed --class=MenuDataSeeder
```

### Database Structure
The seeder creates data in these tables:
- `menu_categories` - Menu category information
- `menu_items` - Individual menu items with full details

## Menu Data Examples

### Italian Restaurant Menu
```
Antipasti (2 items)
├── Bruschetta Classica - $8.99
└── Prosciutto e Melone - $12.99

Pasta (2 items)
├── Spaghetti Carbonara - $16.99
└── Fettuccine Alfredo - $15.99

Pizza (2 items)
├── Margherita - $14.99 (with size variants)
└── Quattro Stagioni - $18.99
```

### American Restaurant Menu
```
Appetizers (2 items)
├── Buffalo Wings - $11.99 (spicy level 3)
└── Loaded Nachos - $9.99

Burgers (2 items)
├── Classic Cheeseburger - $12.99 (with size variants)
└── BBQ Bacon Burger - $14.99

Salads (2 items)
├── Caesar Salad - $10.99
└── Grilled Chicken Salad - $13.99
```

## Data Generated

### Statistics
- **4 Restaurants** with different cuisine types
- **12 Menu Categories** (3 per restaurant)
- **24 Menu Items** (6 per restaurant)
- **Full tenant isolation** with proper tenant_id scoping

### Sample Data Created
1. **Bella Vista Italian Bistro** (Italian) - 3 categories, 6 items
2. **Mario's Pizza Palace** (Italian) - 3 categories, 6 items  
3. **Sakura Sushi Master** (Japanese) - 3 categories, 6 items
4. **Golden State Burger Co.** (American) - 3 categories, 6 items

## Technical Details

### Slug Generation
- Unique slugs per restaurant (not globally unique)
- Format: `category-name` or `category-name-1` if duplicate
- Database constraint: `unique(['restaurant_id', 'slug'])`

### Tenant Isolation
- All menu data properly scoped to tenant_id
- Categories and items belong to specific restaurants
- Maintains data isolation between tenants

### Relationship Structure
```
Tenant (1) -> Restaurant (N) -> MenuCategory (N) -> MenuItem (N)
```

## Integration with Restaurant Creation

The seeder is designed to work with the restaurant creation process:

1. **Automatic Execution**: Runs when `DatabaseSeeder` is called
2. **Restaurant Service Integration**: Can be called from `RestaurantService::createRestaurant()`
3. **Cuisine-Based**: Automatically selects appropriate menu based on restaurant's cuisine_type

## Customization

### Adding New Cuisines
1. Create new menu data file in `database/seeders/MenuData/`
2. Add case to `getCategoriesForCuisine()` method
3. Follow the existing data structure format

### Modifying Existing Menus
Edit the respective menu data files:
- `ItalianMenuData.php` for Italian restaurants
- `AmericanMenuData.php` for American restaurants
- etc.

## Database Constraints

### Menu Categories
- `unique(['restaurant_id', 'slug'])` - Unique slug per restaurant
- `foreignId('tenant_id')` - Tenant isolation
- `foreignId('restaurant_id')` - Restaurant association

### Menu Items
- `unique(['restaurant_id', 'slug'])` - Unique slug per restaurant
- `foreignId('tenant_id')` - Tenant isolation
- `foreignId('restaurant_id')` - Restaurant association
- `foreignId('menu_category_id')` - Category association

## Testing

### Verify Data Creation
```bash
# Check counts
php artisan tinker --execute="
echo 'Menu Categories: ' . App\Models\MenuCategory::count() . PHP_EOL;
echo 'Menu Items: ' . App\Models\MenuItem::count() . PHP_EOL;
echo 'Restaurants: ' . App\Models\Restaurant::count() . PHP_EOL;
"

# Check restaurant menu structure
php artisan tinker --execute="
\$restaurant = App\Models\Restaurant::with('menuCategories.menuItems')->first();
echo 'Restaurant: ' . \$restaurant->name . PHP_EOL;
echo 'Categories: ' . \$restaurant->menuCategories->count() . PHP_EOL;
"
```

## API Integration

The seeded menu data works seamlessly with the menu management API endpoints:

- `GET /tenant/menu/overview` - Menu statistics
- `GET /tenant/menu/categories` - List categories
- `GET /tenant/menu/items` - List items with filters
- `POST /tenant/menu/categories` - Create categories
- `POST /tenant/menu/items` - Create items
- And all other menu management endpoints

## Future Enhancements

1. **More Cuisines**: Add Japanese, Thai, Mediterranean, etc.
2. **Seasonal Menus**: Time-based menu variations
3. **Regional Variations**: Different menu styles per region
4. **Menu Templates**: Pre-defined menu templates for quick setup
5. **Import/Export**: CSV/JSON menu data import/export functionality

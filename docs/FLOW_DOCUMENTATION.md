# RestroVibe System Flow Documentation

## Overview
This document explains the complete flow from **Tenant → Restaurant → Menu → Order** in the RestroVibe Restaurant Management System.

## System Architecture Flow

```
TENANT (SaaS Platform)
    ↓
RESTAURANT (Business Unit)
    ↓
MENU (Categories & Items)
    ↓
ORDER (Customer Transactions)
```

## 1. TENANT Level

### What is a Tenant?
A **Tenant** represents a single SaaS subscriber - typically a restaurant group, franchise, or individual restaurant owner.

### Tenant Structure
```php
// app/Models/Tenant.php
class Tenant extends Model
{
    protected $fillable = [
        'name',                    // "Premium Restaurant Group"
        'slug',                    // "premium-restaurant-group"
        'domain',                  // "premium.restrovibe.com"
        'status',                  // "active", "suspended", "inactive"
        'subscription_plan',       // "basic", "professional", "enterprise"
        'subscription_status',     // "active", "expired", "cancelled"
        'subscription_expires_at', // DateTime
        'settings',                // JSON configuration
        'logo',                    // Company logo
        'primary_color',           // Brand colors
        'secondary_color',
    ];
}
```

### Tenant Relationships
```php
// One Tenant has many Restaurants
public function restaurants(): HasMany
{
    return $this->hasMany(Restaurant::class);
}

// One Tenant has many Users
public function users(): HasMany
{
    return $this->hasMany(User::class);
}
```

### Tenant Features
- **Multitenancy**: Data isolation between tenants
- **Subscription Management**: Plan-based feature access
- **Branding**: Custom colors, logos, domains
- **Settings**: Tenant-specific configurations

---

## 2. RESTAURANT Level

### What is a Restaurant?
A **Restaurant** is a business unit within a tenant - a physical location that serves food.

### Restaurant Structure
```php
// app/Models/Restaurant.php
class Restaurant extends Model
{
    protected $fillable = [
        'tenant_id',              // Links to Tenant
        'name',                   // "Bella Vista Italian Bistro"
        'slug',                   // "bella-vista-italian-bistro"
        'description',            // Restaurant description
        'address',                // Physical address
        'city', 'state', 'zip_code', 'country',
        'phone', 'email', 'website',
        'logo', 'cover_image',
        'cuisine_type',           // "Italian", "American", etc.
        'price_range',            // "$", "$$", "$$$", "$$$$"
        'status',                 // "active", "inactive"
        'settings',               // Restaurant-specific settings
        'business_hours',         // Operating hours
        'delivery_zones',         // Delivery areas
    ];
}
```

### Restaurant Relationships
```php
// Belongs to Tenant
public function tenant(): BelongsTo
{
    return $this->belongsTo(Tenant::class);
}

// Has many Menu Categories
public function menuCategories(): HasMany
{
    return $this->hasMany(MenuCategory::class);
}

// Has many Menu Items
public function menuItems(): HasMany
{
    return $this->hasMany(MenuItem::class);
}

// Has many Orders
public function orders(): HasMany
{
    return $this->hasMany(Order::class);
}

// Has many Staff
public function staff(): HasMany
{
    return $this->hasMany(User::class)->where('role', '!=', 'customer');
}
```

### Restaurant Features
- **Multi-location Support**: One tenant can have multiple restaurants
- **Business Management**: Hours, delivery zones, settings
- **Staff Management**: Role-based access per restaurant
- **Menu Management**: Categories and items per restaurant

---

## 3. MENU Level

### Menu Structure
The menu system has two levels:

#### 3.1 Menu Categories
```php
// app/Models/MenuCategory.php
class MenuCategory extends Model
{
    protected $fillable = [
        'tenant_id',              // Links to Tenant
        'restaurant_id',          // Links to Restaurant
        'name',                   // "Appetizers", "Main Courses"
        'slug',                   // "appetizers", "main-courses"
        'description',            // Category description
        'image',                  // Category image
        'sort_order',             // Display order
        'is_active',              // Active status
        'settings',               // Category settings
    ];
}
```

#### 3.2 Menu Items
```php
// app/Models/MenuItem.php
class MenuItem extends Model
{
    protected $fillable = [
        'tenant_id',              // Links to Tenant
        'restaurant_id',          // Links to Restaurant
        'menu_category_id',       // Links to Menu Category
        'name',                   // "Margherita Pizza"
        'slug',                   // "margherita-pizza"
        'description',            // Item description
        'price',                  // Selling price
        'cost_price',             // Cost price
        'image', 'images',        // Item images
        'is_available',           // Availability status
        'is_featured',            // Featured item
        'is_vegetarian', 'is_vegan', 'is_gluten_free',
        'is_spicy', 'spice_level',
        'preparation_time',       // Minutes to prepare
        'calories',               // Nutritional info
        'allergens',              // Allergen information
        'ingredients',            // Ingredient list
        'nutritional_info',       // Detailed nutrition
        'sort_order',             // Display order
        'stock_quantity',         // Inventory tracking
        'track_inventory',        // Enable inventory
        'min_stock_level',        // Low stock threshold
        'variants',               // Size/option variants
        'settings',               // Item settings
    ];
}
```

### Menu Relationships
```php
// MenuCategory relationships
public function tenant(): BelongsTo
{
    return $this->belongsTo(Tenant::class);
}

public function restaurant(): BelongsTo
{
    return $this->belongsTo(Restaurant::class);
}

public function menuItems(): HasMany
{
    return $this->hasMany(MenuItem::class);
}

// MenuItem relationships
public function tenant(): BelongsTo
{
    return $this->belongsTo(Tenant::class);
}

public function restaurant(): BelongsTo
{
    return $this->belongsTo(Restaurant::class);
}

public function menuCategory(): BelongsTo
{
    return $this->belongsTo(MenuCategory::class);
}
```

### Menu Features
- **Hierarchical Structure**: Categories → Items
- **Inventory Management**: Stock tracking, low stock alerts
- **Nutritional Information**: Calories, allergens, ingredients
- **Dietary Options**: Vegetarian, vegan, gluten-free
- **Pricing**: Cost price, selling price, profit margins
- **Availability**: Active/inactive status
- **Images**: Multiple images per item
- **Variants**: Size options, customizations

---

## 4. ORDER Level

### What is an Order?
An **Order** represents a customer transaction - a collection of menu items purchased from a restaurant.

### Order Structure
```php
// app/Models/Order.php
class Order extends Model
{
    protected $fillable = [
        'tenant_id',              // Links to Tenant
        'restaurant_id',          // Links to Restaurant
        'customer_id',            // Links to Customer (User)
        'order_number',           // Unique order identifier
        'status',                 // Order status
        'payment_status',         // Payment status
        'payment_method',         // Payment method
        'subtotal',               // Subtotal amount
        'tax_amount',             // Tax amount
        'delivery_fee',           // Delivery fee
        'total_amount',           // Total amount
        'delivery_address',       // Delivery address
        'notes',                  // Order notes
        'delivered_at',           // Delivery timestamp
        'cancelled_at',           // Cancellation timestamp
        'cancellation_reason',    // Cancellation reason
    ];
}
```

### Order Item Structure
```php
// app/Models/OrderItem.php
class OrderItem extends Model
{
    protected $fillable = [
        'tenant_id',              // Links to Tenant
        'order_id',               // Links to Order
        'menu_item_id',           // Links to Menu Item
        'quantity',               // Quantity ordered
        'price',                  // Price at time of order
        'total',                  // Line total (quantity × price)
        'notes',                  // Item-specific notes
    ];
}
```

### Order Relationships
```php
// Order relationships
public function tenant(): BelongsTo
{
    return $this->belongsTo(Tenant::class);
}

public function restaurant(): BelongsTo
{
    return $this->belongsTo(Restaurant::class);
}

public function customer(): BelongsTo
{
    return $this->belongsTo(User::class, 'customer_id');
}

public function items(): HasMany
{
    return $this->hasMany(OrderItem::class);
}

// OrderItem relationships
public function tenant(): BelongsTo
{
    return $this->belongsTo(Tenant::class);
}

public function order(): BelongsTo
{
    return $this->belongsTo(Order::class);
}

public function menuItem(): BelongsTo
{
    return $this->belongsTo(MenuItem::class);
}
```

### Order Features
- **Order Tracking**: Status progression (pending → confirmed → preparing → ready → delivered)
- **Payment Management**: Payment status and methods
- **Item Details**: Snapshot of menu items at time of order
- **Pricing**: Subtotal, tax, delivery fees, total
- **Customer Information**: Delivery address, contact details
- **Order History**: Complete order tracking and history

---

## Complete Flow Example

### 1. Tenant Setup
```php
// Create a tenant
$tenant = Tenant::create([
    'name' => 'Premium Restaurant Group',
    'slug' => 'premium-restaurant-group',
    'domain' => 'premium.restrovibe.com',
    'status' => 'active',
    'subscription_plan' => 'enterprise',
    'subscription_status' => 'active',
    'subscription_expires_at' => now()->addYear(),
    'settings' => [
        'currency' => 'USD',
        'features' => [
            'white_label' => true,
            'multi_location' => true,
            'priority_support' => true,
            'advanced_analytics' => true,
        ],
        'language' => 'en',
        'timezone' => 'America/New_York',
    ],
    'primary_color' => '#1E40AF',
    'secondary_color' => '#3B82F6',
]);
```

### 2. Restaurant Setup
```php
// Create a restaurant for the tenant
$restaurant = Restaurant::create([
    'tenant_id' => $tenant->id,
    'name' => 'Bella Vista Italian Bistro',
    'slug' => 'bella-vista-italian-bistro',
    'description' => 'Authentic Italian cuisine with a modern twist',
    'address' => '123 Little Italy Street',
    'city' => 'New York',
    'state' => 'NY',
    'zip_code' => '10013',
    'country' => 'US',
    'phone' => '+1 (555) 123-4567',
    'email' => 'info@bellavista.com',
    'website' => 'https://bellavista.com',
    'cuisine_type' => 'Italian',
    'price_range' => '$$$',
    'status' => 'active',
    'settings' => [
        'tax_rate' => 0.08,
        'service_fee' => 0.05,
        'delivery_fee' => 4.99,
        'pickup_available' => true,
        'auto_accept_orders' => false,
        'delivery_available' => true,
        'minimum_order_amount' => 25,
        'accepts_online_orders' => true,
        'max_delivery_distance' => 15,
        'require_phone_verification' => true,
    ],
    'business_hours' => [
        'monday' => ['open' => '11:00', 'close' => '22:00'],
        'tuesday' => ['open' => '11:00', 'close' => '22:00'],
        'wednesday' => ['open' => '11:00', 'close' => '22:00'],
        'thursday' => ['open' => '11:00', 'close' => '23:00'],
        'friday' => ['open' => '11:00', 'close' => '23:00'],
        'saturday' => ['open' => '10:00', 'close' => '23:00'],
        'sunday' => ['open' => '10:00', 'close' => '21:00'],
    ],
]);
```

### 3. Menu Setup
```php
// Create menu category
$category = MenuCategory::create([
    'tenant_id' => $tenant->id,
    'restaurant_id' => $restaurant->id,
    'name' => 'Pizza',
    'slug' => 'pizza',
    'description' => 'Wood-fired pizzas with fresh ingredients',
    'sort_order' => 1,
    'is_active' => true,
]);

// Create menu item
$menuItem = MenuItem::create([
    'tenant_id' => $tenant->id,
    'restaurant_id' => $restaurant->id,
    'menu_category_id' => $category->id,
    'name' => 'Margherita Pizza',
    'slug' => 'margherita-pizza',
    'description' => 'Fresh mozzarella, tomato sauce, basil, and olive oil',
    'price' => 18.99,
    'cost_price' => 8.50,
    'is_available' => true,
    'is_featured' => true,
    'is_vegetarian' => true,
    'is_vegan' => false,
    'is_gluten_free' => false,
    'preparation_time' => 15,
    'calories' => 850,
    'allergens' => ['gluten', 'dairy'],
    'ingredients' => ['pizza dough', 'tomato sauce', 'mozzarella', 'basil', 'olive oil'],
    'sort_order' => 1,
    'stock_quantity' => 50,
    'track_inventory' => true,
    'min_stock_level' => 10,
]);
```

### 4. Order Creation
```php
// Create an order
$order = Order::create([
    'tenant_id' => $tenant->id,
    'restaurant_id' => $restaurant->id,
    'customer_id' => $customer->id,
    'order_number' => 'ORD-2025-001',
    'status' => 'pending',
    'payment_status' => 'pending',
    'payment_method' => 'credit_card',
    'subtotal' => 18.99,
    'tax_amount' => 1.52,
    'delivery_fee' => 4.99,
    'total_amount' => 25.50,
    'delivery_address' => '456 Customer Street, New York, NY 10001',
    'notes' => 'Please ring the doorbell',
]);

// Create order item
$orderItem = OrderItem::create([
    'tenant_id' => $tenant->id,
    'order_id' => $order->id,
    'menu_item_id' => $menuItem->id,
    'quantity' => 1,
    'price' => 18.99,
    'total' => 18.99,
    'notes' => 'Extra basil please',
]);
```

---

## Data Flow Summary

### 1. **Tenant** (SaaS Platform Level)
- **Purpose**: Multi-tenant SaaS platform
- **Features**: Subscription management, branding, settings
- **Relationships**: Has many restaurants and users

### 2. **Restaurant** (Business Unit Level)
- **Purpose**: Physical restaurant location
- **Features**: Business management, staff, operations
- **Relationships**: Belongs to tenant, has many menu items and orders

### 3. **Menu** (Product Catalog Level)
- **Purpose**: Food and beverage offerings
- **Features**: Categories, items, pricing, inventory
- **Relationships**: Belongs to restaurant, referenced by orders

### 4. **Order** (Transaction Level)
- **Purpose**: Customer purchases and transactions
- **Features**: Order tracking, payment, delivery
- **Relationships**: Belongs to restaurant, contains menu items

## Key Benefits of This Flow

1. **Scalability**: One tenant can have multiple restaurants
2. **Isolation**: Data is properly segregated between tenants
3. **Flexibility**: Each restaurant can have its own menu and operations
4. **Traceability**: Complete audit trail from tenant to order
5. **Multi-tenancy**: Shared infrastructure with isolated data
6. **Role-based Access**: Users can be assigned to specific restaurants

## API Endpoints Flow

### Tenant Level
- `GET /api/admin/tenants` - List all tenants (admin)
- `GET /api/admin/tenants/{tenant}` - Get tenant details (admin)

### Restaurant Level
- `GET /api/tenant/restaurants` - List restaurants for tenant
- `POST /api/tenant/restaurants` - Create restaurant
- `GET /api/tenant/restaurants/{restaurant}` - Get restaurant details

### Menu Level
- `GET /api/tenant/restaurants/{restaurant}/menu/categories` - List categories
- `GET /api/tenant/restaurants/{restaurant}/menu/items` - List items
- `POST /api/tenant/restaurants/{restaurant}/menu/items` - Create item

### Order Level
- `GET /api/tenant/restaurants/{restaurant}/orders` - List orders
- `POST /api/tenant/restaurants/{restaurant}/orders` - Create order
- `GET /api/tenant/restaurants/{restaurant}/orders/{order}` - Get order details

This flow ensures proper data isolation, scalability, and a clear hierarchy from the SaaS platform level down to individual customer transactions.

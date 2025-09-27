# Tenant Creation During User Registration - Complete Flow

## 🔄 **Registration Process Overview**

When a user registers for the first time, the system automatically creates:
1. **Tenant** - The business entity
2. **Restaurant** - The first restaurant location
3. **User** - The restaurant owner account

## 📋 **Step-by-Step Registration Flow**

### **1. User Submits Registration Form**
```json
{
  "name": "John Doe",
  "email": "john@mypizza.com",
  "password": "password123",
  "password_confirmation": "password123",
  "restaurant_name": "Mario's Pizza",
  "restaurant_address": "123 Main St",
  "restaurant_city": "New York",
  "restaurant_state": "NY",
  "restaurant_zip": "10001",
  "restaurant_phone": "+1-555-123-4567",
  "subscription_plan": "professional",
  "terms_accepted": true,
  "privacy_accepted": true
}
```

### **2. System Creates Tenant**
```php
// In RegisterController::createTenant()
$tenant = Tenant::create([
    'name' => 'Mario\'s Pizza Group',           // Auto-generated from restaurant name
    'slug' => 'marios-pizza-group',             // Auto-generated unique slug
    'domain' => 'marios-pizza.restrovibe.com',  // Auto-generated unique domain
    'status' => 'active',
    'subscription_plan' => 'professional',
    'subscription_status' => 'active',
    'subscription_expires_at' => now()->addYear(),
    'settings' => [
        'timezone' => 'America/New_York',
        'currency' => 'USD',
        'language' => 'en'
    ]
]);
```

### **3. System Creates Restaurant**
```php
// In RegisterController::createRestaurant()
$restaurant = Restaurant::create([
    'tenant_id' => $tenant->id,                 // Links to tenant
    'name' => 'Mario\'s Pizza',
    'slug' => 'marios-pizza',                   // Auto-generated unique slug
    'address' => '123 Main St',
    'city' => 'New York',
    'state' => 'NY',
    'zip_code' => '10001',
    'phone' => '+1-555-123-4567',
    'email' => 'john@mypizza.com',
    'status' => 'active',
    'business_hours' => [/* default hours */],
    'settings' => [
        'accepts_online_orders' => true,
        'delivery_available' => false,
        'pickup_available' => true
    ]
]);
```

### **4. System Creates User (Restaurant Owner)**
```php
// In RegisterController::createUser()
$user = User::create([
    'tenant_id' => $tenant->id,                 // Links to tenant
    'restaurant_id' => $restaurant->id,         // Links to restaurant
    'name' => 'John Doe',
    'email' => 'john@mypizza.com',
    'password' => Hash::make('password123'),
    'role' => 'restaurant_owner',               // Auto-assigned role
    'status' => 'active',
    'permissions' => [                          // Full permissions for owner
        'manage_restaurant',
        'manage_menu',
        'manage_orders',
        'manage_staff',
        'manage_inventory',
        'view_reports',
        'manage_settings',
        'manage_subscription'
    ]
]);
```

### **5. System Sends Email Verification**
```php
event(new Registered($user));  // Triggers email verification
```

### **6. User is Logged In**
```php
Auth::login($user);  // Automatic login after registration
```

## 🏗️ **Database Relationships Created**

```
Tenant (ID: 1)
├── Restaurant (ID: 1, tenant_id: 1)
└── User (ID: 1, tenant_id: 1, restaurant_id: 1, role: 'restaurant_owner')
```

## 🔧 **Key Features of the Registration Process**

### **Automatic Tenant Creation**
- **Tenant Name**: Generated from restaurant name + "Group"
- **Slug**: URL-friendly version of tenant name
- **Domain**: Auto-generated subdomain (restaurant-name.restrovibe.com)
- **Subscription**: Based on selected plan with 1-year expiration

### **Unique Identifier Generation**
- **Tenant Slug**: Ensures uniqueness across all tenants
- **Restaurant Slug**: Ensures uniqueness within tenant
- **Domain**: Ensures uniqueness across all domains

### **Default Settings**
- **Business Hours**: Standard restaurant hours
- **Restaurant Settings**: Basic configuration for online orders
- **User Permissions**: Full owner permissions
- **Tenant Settings**: Default timezone, currency, language

### **Validation & Security**
- **Email Uniqueness**: Prevents duplicate accounts
- **Password Requirements**: Strong password validation
- **Terms Acceptance**: Required legal compliance
- **Data Validation**: Comprehensive input validation

## 🚀 **API Endpoints**

### **Registration Endpoint**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@mypizza.com",
  "password": "password123",
  "password_confirmation": "password123",
  "restaurant_name": "Mario's Pizza",
  "restaurant_address": "123 Main St",
  "restaurant_city": "New York",
  "restaurant_state": "NY",
  "restaurant_zip": "10001",
  "restaurant_phone": "+1-555-123-4567",
  "subscription_plan": "professional",
  "terms_accepted": true,
  "privacy_accepted": true
}
```

### **Response**
```json
{
  "message": "Registration successful! Please verify your email.",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@mypizza.com",
    "role": "restaurant_owner",
    "tenant_id": 1,
    "restaurant_id": 1
  },
  "tenant": {
    "id": 1,
    "name": "Mario's Pizza Group",
    "slug": "marios-pizza-group",
    "domain": "marios-pizza.restrovibe.com",
    "subscription_plan": "professional"
  },
  "restaurant": {
    "id": 1,
    "name": "Mario's Pizza",
    "slug": "marios-pizza",
    "address": "123 Main St",
    "city": "New York"
  }
}
```

## 🔄 **Login Process After Registration**

### **Login Endpoint**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@mypizza.com",
  "password": "password123"
}
```

### **Login Validation**
1. **Credentials Check**: Email/password validation
2. **User Status**: Ensures user is active
3. **Tenant Status**: Ensures tenant is active
4. **Subscription Check**: Ensures subscription is valid
5. **Last Login Update**: Records login timestamp

### **Login Response**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@mypizza.com",
    "role": "restaurant_owner",
    "tenant": {
      "id": 1,
      "name": "Mario's Pizza Group",
      "subscription_plan": "professional"
    },
    "restaurant": {
      "id": 1,
      "name": "Mario's Pizza",
      "address": "123 Main St"
    }
  },
  "redirect": "/restaurant/dashboard"
}
```

## 🎯 **Business Logic**

### **Subscription Plans**
- **Basic**: 1 restaurant, 5 users, 1000 orders/month
- **Professional**: 5 restaurants, 25 users, 10000 orders/month
- **Enterprise**: Unlimited restaurants, users, orders

### **Role Hierarchy**
- **Super Admin**: System-wide access
- **Restaurant Owner**: Full restaurant management
- **Manager**: Limited restaurant operations
- **Staff**: Basic order and menu access
- **Customer**: Order placement only

### **Tenant Isolation**
- All data automatically scoped by tenant_id
- Users can only access their tenant's data
- Super admin can switch between tenants

## 🔒 **Security Features**

### **Data Protection**
- Password hashing with bcrypt
- Email verification required
- Session management with Sanctum
- CSRF protection

### **Access Control**
- Role-based permissions
- Tenant isolation middleware
- Subscription status validation
- Account status checking

## 📊 **Example Registration Scenarios**

### **Scenario 1: Single Restaurant Owner**
```
User: "John Doe" → Tenant: "John's Pizza Group" → Restaurant: "John's Pizza"
```

### **Scenario 2: Restaurant Chain Owner**
```
User: "Jane Smith" → Tenant: "Smith Restaurant Group" → Restaurant: "Smith's Downtown"
(Later: Can add more restaurants to the same tenant)
```

### **Scenario 3: Franchisee**
```
User: "Bob Wilson" → Tenant: "Wilson Franchise Group" → Restaurant: "McDonald's Wilson Location"
```

This registration flow ensures that every new user gets a complete, isolated business environment ready for immediate use! 🚀

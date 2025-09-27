# Organized Structure Documentation - RestroVibe

## 🏗️ **Complete Folder Structure**

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Admin/                  # Super Admin Controllers
│   │   │   ├── AuthController.php
│   │   │   ├── DashboardController.php
│   │   │   └── TenantController.php
│   │   ├── Tenant/                 # Tenant User Controllers
│   │   │   └── AuthController.php
│   │   └── Api/                    # API Controllers
│   │       ├── RegisterController.php
│   │       ├── LoginController.php
│   │       ├── RestaurantController.php
│   │       └── Mobile/             # Mobile App Controllers
│   │           ├── AuthController.php
│   │           └── RestaurantController.php
│   ├── Middleware/
│   │   ├── AdminAuthMiddleware.php
│   │   ├── TenantAuthMiddleware.php
│   │   ├── ApiAuthMiddleware.php
│   │   ├── TenantMiddleware.php
│   │   └── TenantSwitchingMiddleware.php
│   └── Requests/
│       ├── Admin/                  # Admin Request Validation
│       │   ├── AdminLoginRequest.php
│       │   ├── CreateTenantRequest.php
│       │   └── UpdateTenantRequest.php
│       ├── Tenant/                 # Tenant Request Validation
│       │   └── TenantLoginRequest.php
│       └── Api/                    # API Request Validation
│           ├── RegisterRequest.php
│           └── Mobile/
│               ├── LoginRequest.php
│               └── RegisterRequest.php
└── Services/
    ├── Admin/                      # Admin Services
    │   ├── TenantService.php
    │   └── DashboardService.php
    ├── Tenant/                     # Tenant Services
    │   └── RestaurantService.php
    └── Api/                        # API Services
        ├── RestaurantService.php
        └── Mobile/
            ├── AuthService.php
            └── RestaurantService.php

routes/
├── admin.php                       # Super Admin Routes
├── tenant.php                      # Tenant User Routes
├── api.php                         # Mobile API Routes
└── web.php                         # Web Routes
```

## 🔐 **Authentication Guards**

### **1. Admin Guard (`admin`)**
- **Purpose**: Super admin authentication
- **Middleware**: `auth.admin`
- **Access**: System-wide administration
- **Features**: Tenant management, system analytics, tenant switching

### **2. Tenant Guard (`tenant`)**
- **Purpose**: Tenant user authentication
- **Middleware**: `auth.tenant`
- **Access**: Tenant-scoped operations
- **Features**: Restaurant management, staff management, analytics

### **3. API Guard (`api`)**
- **Purpose**: Mobile app authentication
- **Middleware**: `auth.api`
- **Access**: Mobile-optimized operations
- **Features**: Mobile-specific responses, device tracking

## 🛣️ **Route Structure**

### **Admin Routes (`/api/admin/*`)**
```php
// Authentication
POST /api/admin/auth/login
POST /api/admin/auth/logout
GET  /api/admin/auth/me
POST /api/admin/auth/refresh

// Dashboard
GET  /api/admin/dashboard
GET  /api/admin/dashboard/tenant-stats
GET  /api/admin/dashboard/revenue
GET  /api/admin/dashboard/system-health

// Tenant Management
GET    /api/admin/tenants
POST   /api/admin/tenants
GET    /api/admin/tenants/{id}
PUT    /api/admin/tenants/{id}
DELETE /api/admin/tenants/{id}
POST   /api/admin/tenants/{id}/suspend
POST   /api/admin/tenants/{id}/activate
POST   /api/admin/tenants/{id}/switch
GET    /api/admin/tenants/{id}/analytics

// System Management
GET /api/admin/system/health
GET /api/admin/system/stats

// Analytics
GET /api/admin/analytics/overview
GET /api/admin/analytics/revenue
```

### **Tenant Routes (`/api/tenant/*`)**
```php
// Authentication
POST /api/tenant/auth/login
POST /api/tenant/auth/logout
GET  /api/tenant/auth/me
POST /api/tenant/auth/refresh

// Dashboard
GET /api/tenant/dashboard

// Restaurant Management
GET    /api/tenant/restaurants
POST   /api/tenant/restaurants
GET    /api/tenant/restaurants/{id}
PUT    /api/tenant/restaurants/{id}
DELETE /api/tenant/restaurants/{id}
GET    /api/tenant/restaurants/{id}/dashboard
PUT    /api/tenant/restaurants/{id}/settings

// Menu Management
GET    /api/tenant/menu/categories
POST   /api/tenant/menu/categories
GET    /api/tenant/menu/categories/{id}
PUT    /api/tenant/menu/categories/{id}
DELETE /api/tenant/menu/categories/{id}

GET    /api/tenant/menu/items
POST   /api/tenant/menu/items
GET    /api/tenant/menu/items/{id}
PUT    /api/tenant/menu/items/{id}
DELETE /api/tenant/menu/items/{id}

// Order Management
GET    /api/tenant/orders
POST   /api/tenant/orders
GET    /api/tenant/orders/{id}
PUT    /api/tenant/orders/{id}
DELETE /api/tenant/orders/{id}
PUT    /api/tenant/orders/{id}/status
PUT    /api/tenant/orders/{id}/payment

// Staff Management
GET    /api/tenant/staff
POST   /api/tenant/staff
GET    /api/tenant/staff/{id}
PUT    /api/tenant/staff/{id}
DELETE /api/tenant/staff/{id}
PUT    /api/tenant/staff/{id}/permissions
PUT    /api/tenant/staff/{id}/status

// Analytics
GET /api/tenant/analytics/overview
GET /api/tenant/analytics/revenue
GET /api/tenant/analytics/orders
GET /api/tenant/analytics/menu
GET /api/tenant/analytics/staff

// Settings
GET /api/tenant/settings
PUT /api/tenant/settings/tenant
PUT /api/tenant/settings/restaurant
PUT /api/tenant/settings/profile

// Subscription
GET  /api/tenant/subscription
POST /api/tenant/subscription/upgrade
POST /api/tenant/subscription/cancel
```

### **Mobile API Routes (`/api/mobile/*`)**
```php
// Authentication
POST /api/mobile/auth/register
POST /api/mobile/auth/login
POST /api/mobile/auth/logout
POST /api/mobile/auth/refresh
GET  /api/mobile/profile

// Restaurant Management
GET  /api/mobile/restaurant
GET  /api/mobile/restaurant/{id}
GET  /api/mobile/restaurant/{id}/dashboard
PUT  /api/mobile/restaurant/{id}/settings
GET  /api/mobile/restaurant/{id}/business-hours
```

## 🔧 **Middleware Usage**

### **Admin Middleware**
```php
Route::middleware(['auth.admin'])->group(function () {
    // Super admin only routes
});
```

### **Tenant Middleware**
```php
Route::middleware(['auth.tenant'])->group(function () {
    // Tenant user routes
});
```

### **API Middleware**
```php
Route::middleware(['auth.api'])->group(function () {
    // Mobile API routes
});
```

### **Combined Middleware**
```php
Route::middleware(['auth.admin', 'tenant.switch'])->group(function () {
    // Admin with tenant switching capability
});

Route::middleware(['auth.tenant', 'tenant'])->group(function () {
    // Tenant user with tenant scoping
});
```

## 📱 **Response Format Differences**

### **Admin API Response**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "tenants": [
      {
        "id": 1,
        "name": "Restaurant Group",
        "slug": "restaurant-group",
        "status": "active",
        "subscription_plan": "professional",
        "restaurants": [...],
        "users": [...],
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

### **Tenant API Response**
```json
{
  "success": true,
  "data": {
    "restaurants": [
      {
        "id": 1,
        "name": "Mario's Pizza",
        "description": "Authentic Italian cuisine",
        "address": "123 Main St",
        "city": "New York",
        "state": "NY",
        "phone": "+1-555-123-4567",
        "status": "active",
        "menu_categories": [...],
        "staff": [...],
        "orders": [...]
      }
    ]
  }
}
```

### **Mobile API Response**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "restaurants": [
      {
        "id": 1,
        "name": "Mario's Pizza",
        "address": "123 Main St, New York, NY 10001",
        "phone": "+1-555-123-4567",
        "logo": "logo.jpg",
        "is_open": true,
        "menu_items_count": 25
      }
    ],
    "pagination": {
      "current_page": 1,
      "last_page": 5,
      "per_page": 20,
      "total": 75
    }
  }
}
```

## 🎯 **Service Layer Organization**

### **Admin Services**
- **TenantService**: Tenant CRUD operations, analytics
- **DashboardService**: System-wide analytics, health monitoring

### **Tenant Services**
- **RestaurantService**: Restaurant management, tenant-scoped operations

### **API Services**
- **RestaurantService**: Web restaurant management
- **Mobile/AuthService**: Mobile authentication
- **Mobile/RestaurantService**: Mobile-optimized restaurant operations

## 🔒 **Security Features**

### **Guard Isolation**
- Each guard has separate authentication
- Different token scopes and permissions
- Isolated session management

### **Role-Based Access**
- **Super Admin**: Full system access
- **Restaurant Owner**: Full tenant access
- **Manager**: Limited tenant access
- **Staff**: Basic operations only

### **Token Scopes**
```php
// Admin tokens
$user->createToken('admin-dashboard', ['admin:*'])

// Tenant tokens
$user->createToken('tenant-dashboard', ['restaurant:*', 'menu:*', 'orders:*'])

// API tokens
$user->createToken('mobile-app', ['api:read', 'api:write'])
```

## 🚀 **Benefits of This Structure**

### **1. Clear Separation**
- Admin, tenant, and API concerns are separated
- Easy to maintain and extend
- Clear responsibility boundaries

### **2. Security**
- Different authentication guards
- Role-based access control
- Token scoping and permissions

### **3. Scalability**
- Each module can scale independently
- Easy to add new features
- Clean dependency management

### **4. Developer Experience**
- Intuitive folder structure
- Clear naming conventions
- Easy to navigate and understand

### **5. Testing**
- Isolated components for testing
- Clear boundaries for unit tests
- Easy to mock dependencies

This organized structure provides a solid foundation for a scalable, maintainable, and secure multi-tenant SaaS application! 🎊

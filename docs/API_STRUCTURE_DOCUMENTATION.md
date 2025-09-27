# API Structure Documentation - RestroVibe

## 🏗️ **Folder Structure Overview**

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Web/                    # Web Dashboard Controllers (React Frontend)
│   │   │   └── Admin/              # Super Admin Dashboard
│   │   │       ├── DashboardController.php
│   │   │       └── TenantController.php
│   │   └── Api/                    # API Controllers
│   │       ├── RegisterController.php      # Web Registration
│   │       ├── LoginController.php         # Web Login
│   │       ├── RestaurantController.php    # Web Restaurant Management
│   │       └── Mobile/                     # Mobile App Controllers
│   │           ├── AuthController.php
│   │           └── RestaurantController.php
│   └── Requests/
│       ├── Api/                    # Web API Requests
│       │   └── RegisterRequest.php
│       └── Api/Mobile/             # Mobile API Requests
│           ├── LoginRequest.php
│           └── RegisterRequest.php
└── Services/
    ├── Web/                        # Web Dashboard Services
    │   ├── TenantService.php
    │   └── DashboardService.php
    └── Api/                        # API Services
        ├── RestaurantService.php   # Web Restaurant Service
        └── Mobile/                 # Mobile App Services
            ├── AuthService.php
            └── RestaurantService.php
```

## 🎯 **API Separation Strategy**

### **Web API (`/api/web/*`)**
- **Purpose**: React frontend dashboard
- **Response Format**: Full data objects with relationships
- **Features**: Rich data, complex queries, admin features
- **Authentication**: Laravel Sanctum tokens
- **Use Cases**: Admin dashboard, restaurant management web interface

### **Mobile API (`/api/mobile/*`)**
- **Purpose**: Mobile applications (iOS/Android)
- **Response Format**: Optimized, lightweight JSON
- **Features**: Essential data only, mobile-optimized responses
- **Authentication**: Laravel Sanctum tokens with device tracking
- **Use Cases**: Mobile restaurant management app, customer mobile app

## 📱 **Mobile API Features**

### **Optimized Response Format**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "restaurant_owner",
      "permissions": ["manage_restaurant", "manage_orders"]
    },
    "restaurant": {
      "id": 1,
      "name": "Mario's Pizza",
      "is_open": true,
      "settings": {
        "accepts_online_orders": true,
        "delivery_available": false
      }
    }
  }
}
```

### **Mobile-Specific Features**
- **Device Tracking**: Device ID, type (iOS/Android), app version
- **Optimized Queries**: Reduced data payload, essential fields only
- **Offline Support**: Cached data structure
- **Push Notifications**: Device token management
- **Battery Optimization**: Minimal API calls

## 🌐 **Web API Features**

### **Rich Response Format**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "tenant": {
      "id": 1,
      "name": "Mario's Pizza Group",
      "subscription_plan": "professional",
      "restaurants": [...],
      "users": [...]
    },
    "restaurant": {
      "id": 1,
      "name": "Mario's Pizza",
      "menu_categories": [...],
      "staff": [...],
      "orders": [...]
    }
  }
}
```

### **Web-Specific Features**
- **Full Relationships**: Complete data with all related models
- **Admin Features**: Tenant switching, system analytics
- **Rich Queries**: Complex filtering, sorting, pagination
- **Real-time Updates**: WebSocket integration
- **Bulk Operations**: Mass data operations

## 🛣️ **API Routes Structure**

### **Web API Routes**
```php
// Web Dashboard (React Frontend)
/api/web/auth/register          # Web registration
/api/web/auth/login             # Web login
/api/web/user                   # Current user with full data
/api/web/restaurant/dashboard   # Restaurant dashboard

// Admin Dashboard
/admin/dashboard                # Admin dashboard
/admin/tenants                  # Tenant management
/admin/tenants/{id}/switch      # Tenant switching
```

### **Mobile API Routes**
```php
// Mobile Authentication
/api/mobile/auth/register       # Mobile registration
/api/mobile/auth/login          # Mobile login
/api/mobile/auth/refresh        # Token refresh
/api/mobile/profile             # User profile

// Mobile Restaurant Management
/api/mobile/restaurant/         # Restaurant list
/api/mobile/restaurant/{id}     # Restaurant details
/api/mobile/restaurant/{id}/dashboard  # Mobile dashboard
/api/mobile/restaurant/{id}/settings   # Update settings
```

## 🔧 **Service Layer Differences**

### **Web Services**
- **Full Data Access**: Complete model relationships
- **Complex Business Logic**: Advanced analytics, reporting
- **Admin Operations**: Tenant management, system administration
- **Rich Queries**: Complex database operations

### **Mobile Services**
- **Optimized Queries**: Essential data only
- **Performance Focused**: Minimal database hits
- **Device Integration**: Push notifications, offline sync
- **Battery Efficient**: Reduced processing

## 📊 **Response Comparison**

### **Web API Response (Restaurant List)**
```json
{
  "restaurants": [
    {
      "id": 1,
      "name": "Mario's Pizza",
      "description": "Authentic Italian cuisine",
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip_code": "10001",
      "phone": "+1-555-123-4567",
      "email": "info@marios.com",
      "website": "https://marios.com",
      "logo": "logo.jpg",
      "cover_image": "cover.jpg",
      "cuisine_type": "Italian",
      "price_range": "$$",
      "status": "active",
      "business_hours": {...},
      "settings": {...},
      "menu_categories": [...],
      "staff": [...],
      "orders": [...],
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 15,
    "total": 75
  }
}
```

### **Mobile API Response (Restaurant List)**
```json
{
  "success": true,
  "data": {
    "restaurants": [
      {
        "id": 1,
        "name": "Mario's Pizza",
        "address": "123 Main St, New York, NY 10001",
        "phone": "+1-555-123-4567",
        "logo": "logo.jpg",
        "cuisine_type": "Italian",
        "price_range": "$$",
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

## 🔐 **Authentication Differences**

### **Web Authentication**
- **Session-based**: Traditional web sessions
- **CSRF Protection**: Cross-site request forgery protection
- **Remember Me**: Long-term authentication
- **Admin Switching**: Super admin tenant switching

### **Mobile Authentication**
- **Token-based**: API tokens with expiration
- **Device Tracking**: Device ID and type tracking
- **Refresh Tokens**: Automatic token renewal
- **Offline Support**: Cached authentication

## 🚀 **Performance Optimizations**

### **Mobile Optimizations**
- **Reduced Payload**: 70% smaller response sizes
- **Essential Fields**: Only necessary data
- **Optimized Queries**: Single query with joins
- **Caching**: Aggressive response caching
- **Compression**: Gzip compression enabled

### **Web Optimizations**
- **Lazy Loading**: Load relationships on demand
- **Pagination**: Efficient data pagination
- **Search**: Full-text search capabilities
- **Real-time**: WebSocket for live updates
- **Caching**: Redis caching for frequent queries

## 📱 **Mobile-Specific Features**

### **Device Integration**
```php
// Mobile registration includes device info
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "device_id": "ABC123XYZ",
  "device_type": "ios",
  "app_version": "1.0.0"
}
```

### **Push Notifications**
- **Order Updates**: Real-time order status
- **Staff Notifications**: New orders, schedule changes
- **Customer Alerts**: Order ready, promotions
- **System Alerts**: Maintenance, updates

### **Offline Support**
- **Data Caching**: Essential data cached locally
- **Sync Queue**: Offline actions queued for sync
- **Conflict Resolution**: Handle data conflicts
- **Background Sync**: Automatic data synchronization

## 🎯 **Use Cases**

### **Web API Use Cases**
- **Admin Dashboard**: System administration, tenant management
- **Restaurant Management**: Full-featured restaurant operations
- **Analytics**: Comprehensive reporting and analytics
- **User Management**: Staff and customer management
- **Settings**: Advanced configuration options

### **Mobile API Use Cases**
- **Quick Orders**: Fast order management
- **Staff Management**: Basic staff operations
- **Menu Updates**: Simple menu modifications
- **Analytics**: Essential performance metrics
- **Notifications**: Push notification management

## 🔄 **Migration Strategy**

### **Phase 1: Current State**
- Legacy API routes maintained for backward compatibility
- New structure implemented alongside existing routes

### **Phase 2: Gradual Migration**
- Frontend applications migrate to new endpoints
- Legacy routes marked as deprecated

### **Phase 3: Full Migration**
- Legacy routes removed
- New structure fully implemented
- Performance optimizations applied

This structure provides clear separation between web and mobile APIs while maintaining code reusability and optimal performance for each platform! 🚀

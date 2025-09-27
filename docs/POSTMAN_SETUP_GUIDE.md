# RestroVibe API Postman Collection Setup Guide

This guide will help you set up and use the RestroVibe API Postman collection for testing your Restaurant Management System.

## 📁 Files Included

1. **RestroVibe_Postman_Collection.json** - Complete API collection with all endpoints
2. **RestroVibe_Postman_Environment.json** - Environment variables for easy testing
3. **POSTMAN_SETUP_GUIDE.md** - This setup guide

## 🚀 Quick Setup

### Step 1: Import Collection and Environment

1. Open Postman
2. Click **Import** button
3. Import both files:
   - `RestroVibe_Postman_Collection.json`
   - `RestroVibe_Postman_Environment.json`
4. Select the **RestroVibe Development Environment** from the environment dropdown

### Step 2: Configure Environment Variables

The environment comes pre-configured with these variables:

#### Base Configuration
- `base_url`: `http://localhost:8000/api` (adjust if your server runs on different port)
- `api_version`: `v1`

#### Authentication Tokens
- `auth_token`: Will be auto-populated after login
- `admin_token`: For admin endpoints
- `tenant_token`: For tenant endpoints  
- `mobile_token`: For mobile API endpoints

#### Demo Data
- `tenant_id`: `1`
- `restaurant_id`: `1`
- `user_id`: `1`

#### Pre-configured User Accounts
- **Super Admin**: `admin@restrovibe.com` / `password`
- **Restaurant Owner**: `owner@demo-restaurant.com` / `password`
- **Manager**: `manager@demo-restaurant.com` / `password`
- **Staff**: `staff@demo-restaurant.com` / `password`

## 🔐 Authentication Flow

### 1. Admin Authentication
```
POST /api/admin/auth/login
{
    "email": "admin@restrovibe.com",
    "password": "password"
}
```

### 2. Tenant Authentication
```
POST /api/tenant/auth/login
{
    "email": "owner@demo-restaurant.com", 
    "password": "password"
}
```

### 3. Mobile Authentication
```
POST /api/mobile/auth/login
{
    "email": "owner@demo-restaurant.com",
    "password": "password",
    "device_id": "ABC123XYZ",
    "device_type": "ios",
    "app_version": "1.0.0"
}
```

## 📋 API Endpoints Overview

### Admin APIs (`/api/admin/`)
- **Authentication**: Login, logout, profile, token refresh
- **Dashboard**: Overview, tenant stats, revenue analytics, system health
- **Tenant Management**: CRUD operations, suspend/activate, switch context
- **Analytics**: Revenue, system statistics

### Tenant APIs (`/api/tenant/`)
- **Authentication**: Login, logout, profile
- **Dashboard**: Tenant-specific dashboard
- **Restaurant Management**: CRUD operations, settings, business hours
- **Order Management**: Create, update, track orders
- **Menu Management**: Categories, items, pricing
- **Staff Management**: Add/remove staff, roles, schedules
- **Analytics**: Restaurant-specific analytics

### Mobile APIs (`/api/mobile/`)
- **Authentication**: Register, login, logout, profile, token refresh
- **Restaurant Management**: Mobile-optimized restaurant operations
- **Dashboard**: Mobile-optimized dashboard
- **Settings**: Mobile-specific settings

## 🧪 Testing Workflow

### 1. Start with Admin Authentication
1. Run **Admin Login** request
2. Copy the `access_token` from response
3. Set it as `admin_token` in environment variables

### 2. Test Admin Operations
1. **Get Dashboard Overview** - Verify admin dashboard data
2. **Get All Tenants** - List all tenants
3. **Create New Tenant** - Test tenant creation
4. **Get Tenant Details** - Verify tenant data

### 3. Test Tenant Authentication
1. Run **Tenant Login** request
2. Copy the `access_token` from response
3. Set it as `tenant_token` in environment variables

### 4. Test Tenant Operations
1. **Get Tenant Dashboard** - Verify tenant dashboard
2. **Get Restaurants** - List tenant restaurants
3. **Create Restaurant** - Test restaurant creation
4. **Update Restaurant** - Test restaurant updates

### 5. Test Mobile APIs
1. Run **Mobile Login** request
2. Copy the `access_token` from response
3. Set it as `mobile_token` in environment variables
4. Test mobile-specific endpoints

## 📊 Sample Data

### Creating a New Tenant
```json
{
    "name": "New Restaurant Group",
    "domain": "newgroup.restrovibe.com",
    "status": "active",
    "subscription_plan": "professional",
    "subscription_status": "active",
    "subscription_expires_at": "2025-12-31T23:59:59Z",
    "primary_color": "#3B82F6",
    "secondary_color": "#1E40AF",
    "owner": {
        "name": "John Restaurant Owner",
        "email": "owner@newgroup.com",
        "password": "password123"
    }
}
```

### Creating a New Restaurant
```json
{
    "name": "New Pizza Place",
    "description": "Authentic Italian pizza and pasta",
    "address": "456 Oak Street",
    "city": "Los Angeles",
    "state": "CA",
    "zip_code": "90210",
    "country": "US",
    "phone": "+1-555-987-6543",
    "email": "info@newpizzaplace.com",
    "website": "https://newpizzaplace.com",
    "cuisine_type": "Italian",
    "price_range": "$$",
    "business_hours": {
        "monday": {"open": "09:00", "close": "22:00"},
        "tuesday": {"open": "09:00", "close": "22:00"},
        "wednesday": {"open": "09:00", "close": "22:00"},
        "thursday": {"open": "09:00", "close": "22:00"},
        "friday": {"open": "09:00", "close": "23:00"},
        "saturday": {"open": "10:00", "close": "23:00"},
        "sunday": {"open": "10:00", "close": "21:00"}
    },
    "settings": {
        "accepts_online_orders": true,
        "delivery_available": true,
        "pickup_available": true,
        "max_delivery_distance": 15,
        "minimum_order_amount": 25.00,
        "delivery_fee": 3.99,
        "tax_rate": 0.08,
        "service_fee": 0.05
    }
}
```

### Mobile Registration
```json
{
    "name": "John Mobile User",
    "email": "john@mobileapp.com",
    "password": "password123",
    "password_confirmation": "password123",
    "phone": "+1-555-123-4567",
    "restaurant_name": "Mobile Pizza Place",
    "restaurant_description": "Great pizza for mobile orders",
    "restaurant_address": "789 Mobile Street",
    "restaurant_city": "San Francisco",
    "restaurant_state": "CA",
    "restaurant_zip": "94102",
    "restaurant_country": "US",
    "restaurant_phone": "+1-555-987-6543",
    "restaurant_website": "https://mobilepizza.com",
    "cuisine_type": "Italian",
    "price_range": "$$",
    "delivery_available": true,
    "max_delivery_distance": 10,
    "subscription_plan": "professional",
    "device_id": "ABC123XYZ",
    "device_type": "ios",
    "app_version": "1.0.0",
    "terms_accepted": true,
    "privacy_accepted": true
}
```

## 🔧 Environment Variables Reference

### Base URLs
- `base_url`: API base URL (default: `http://localhost:8000/api`)

### Authentication
- `auth_token`: General authentication token
- `admin_token`: Admin-specific token
- `tenant_token`: Tenant-specific token
- `mobile_token`: Mobile-specific token

### Entity IDs
- `tenant_id`: Current tenant ID
- `restaurant_id`: Current restaurant ID
- `user_id`: Current user ID

### User Credentials
- `admin_email` / `admin_password`: Super admin credentials
- `tenant_owner_email` / `tenant_owner_password`: Restaurant owner credentials
- `manager_email` / `manager_password`: Manager credentials
- `staff_email` / `staff_password`: Staff credentials

### Demo Data
- `demo_restaurant_*`: Pre-configured restaurant data
- `new_tenant_*`: Sample data for creating new tenants
- `mobile_*`: Mobile-specific variables

### Pagination & Filters
- `per_page`: Items per page (default: 15)
- `page`: Current page number (default: 1)
- `status`: Filter by status (default: active)
- `period`: Analytics period in days (default: 30)

## 🚨 Troubleshooting

### Common Issues

1. **401 Unauthorized**
   - Ensure you're logged in and have a valid token
   - Check if the token is set in the environment
   - Verify the token hasn't expired

2. **403 Forbidden**
   - Check user permissions and role
   - Ensure you're using the correct authentication guard
   - Verify tenant context is set correctly

3. **404 Not Found**
   - Check if the endpoint exists in your routes
   - Verify the base URL is correct
   - Ensure the API server is running

4. **422 Validation Error**
   - Check request body format
   - Verify all required fields are provided
   - Check data types and validation rules

### Debug Tips

1. **Check Response Headers**: Look for error details in response headers
2. **Verify Environment**: Ensure correct environment is selected
3. **Test Authentication**: Start with login requests to get fresh tokens
4. **Check Server Logs**: Look at Laravel logs for detailed error information

## 📝 Notes

- All requests include proper headers (`Content-Type: application/json`, `Accept: application/json`)
- Authentication tokens are automatically included via collection-level auth
- Environment variables are pre-configured with realistic demo data
- The collection includes both success and error response examples
- All endpoints include detailed descriptions and parameter explanations

## 🔄 Updates

To update the collection:
1. Export the updated collection from Postman
2. Replace the existing JSON file
3. Re-import into Postman
4. Update environment variables as needed

---

**Happy Testing! 🎉**

For any issues or questions, refer to the main project documentation or create an issue in the repository.

# RestroVibe Test Users & Credentials

This document contains all the test users created by the `RestroVibeDemoDataSeeder` for testing the RestroVibe application.

## 🔐 Authentication Endpoints

- **Admin Login**: `POST /api/admin/auth/login`
- **Tenant Login**: `POST /api/tenant/auth/login`
- **Mobile Login**: `POST /api/mobile/auth/login`

## 👑 Super Admin

| Email | Password | Role | Description |
|-------|----------|------|-------------|
| `admin@restrovibe.com` | `password` | `super_admin` | Global system administrator |

## 🏢 Tenant 1: Premium Restaurant Group (Enterprise Plan)

### 🍝 Bella Vista Italian Bistro

| Email | Password | Role | Name | Permissions |
|-------|----------|------|------|-------------|
| `marco@bellavista.com` | `password` | `restaurant_owner` | Marco Rossi | Full restaurant management |
| `sofia@bellavista.com` | `password` | `manager` | Sofia Bianchi | Menu, orders, staff, inventory, reports, settings |
| `luca@bellavista.com` | `password` | `staff` | Luca Conti | Orders, menu view, inventory |
| `elena@bellavista.com` | `password` | `staff` | Elena Moretti | Orders, menu view, inventory |
| `robert@customer.com` | `password` | `customer` | Robert Smith | Place orders, view menu, manage profile |

### 🍕 Mario's Pizza Palace

| Email | Password | Role | Name | Permissions |
|-------|----------|------|------|-------------|
| `giuseppe@mariospizza.com` | `password` | `restaurant_owner` | Giuseppe Romano | Full restaurant management |
| `antonio@mariospizza.com` | `password` | `manager` | Antonio Ferrari | Menu, orders, staff, inventory, reports, settings |
| `francesco@mariospizza.com` | `password` | `staff` | Francesco Lombardi | Orders, menu view, inventory |
| `giulia@mariospizza.com` | `password` | `staff` | Giulia Ricci | Orders, menu view, inventory |
| `jennifer@customer.com` | `password` | `customer` | Jennifer Wilson | Place orders, view menu, manage profile |

## 🏢 Tenant 2: Local Eateries (Professional Plan)

### 🍣 Sakura Sushi Master

| Email | Password | Role | Name | Permissions |
|-------|----------|------|------|-------------|
| `hiroshi@sakurasushi.com` | `password` | `restaurant_owner` | Hiroshi Tanaka | Full restaurant management |
| `yuki@sakurasushi.com` | `password` | `manager` | Yuki Nakamura | Menu, orders, staff, inventory, reports, settings |
| `kenji@sakurasushi.com` | `password` | `staff` | Kenji Sato | Orders, menu view, inventory |
| `aiko@sakurasushi.com` | `password` | `staff` | Aiko Yamamoto | Orders, menu view, inventory |
| `james@customer.com` | `password` | `customer` | James Chen | Place orders, view menu, manage profile |

### 🍔 Golden State Burger Co.

| Email | Password | Role | Name | Permissions |
|-------|----------|------|------|-------------|
| `michael@goldenstateburger.com` | `password` | `restaurant_owner` | Michael Johnson | Full restaurant management |
| `sarah@goldenstateburger.com` | `password` | `manager` | Sarah Williams | Menu, orders, staff, inventory, reports, settings |
| `david@goldenstateburger.com` | `password` | `staff` | David Brown | Orders, menu view, inventory |
| `lisa@goldenstateburger.com` | `password` | `staff` | Lisa Davis | Orders, menu view, inventory |
| `emily@customer.com` | `password` | `customer` | Emily Rodriguez | Place orders, view menu, manage profile |

## 🏪 Restaurant Details

### Bella Vista Italian Bistro
- **Cuisine**: Italian
- **Price Range**: $$$
- **Location**: 123 Little Italy Street, New York, NY 10013
- **Phone**: +1 (555) 123-4567
- **Website**: https://bellavista.com
- **Features**: Delivery, Pickup, Online Orders

### Mario's Pizza Palace
- **Cuisine**: Pizza
- **Price Range**: $$
- **Location**: 456 Broadway, New York, NY 10018
- **Phone**: +1 (555) 234-5678
- **Website**: https://mariospizza.com
- **Features**: Delivery, Pickup, Online Orders, Auto-accept

### Sakura Sushi Master
- **Cuisine**: Japanese
- **Price Range**: $$$$
- **Location**: 789 Sunset Boulevard, Los Angeles, CA 90028
- **Phone**: +1 (555) 345-6789
- **Website**: https://sakurasushi.com
- **Features**: Pickup Only, Online Orders, Reservations

### Golden State Burger Co.
- **Cuisine**: American
- **Price Range**: $$
- **Location**: 321 Hollywood Boulevard, Los Angeles, CA 90028
- **Phone**: +1 (555) 456-7890
- **Website**: https://goldenstateburger.com
- **Features**: Delivery, Pickup, Online Orders, Auto-accept

## 🔑 Token Information

All login responses include:
- `access_token`: Short-lived (1 hour) for API requests
- `refresh_token`: Long-lived (30 days) for token renewal
- `token_type`: "Bearer"
- `expires_in`: 3600 seconds (1 hour)

## 🧪 Testing Scenarios

### 1. Role-Based Access Control
- Test different user roles and their permissions
- Verify tenant isolation (users can only access their tenant's data)
- Test super admin access across all tenants

### 2. Multi-Tenant Isolation
- Login as users from different tenants
- Verify data isolation between tenants
- Test tenant switching for super admin

### 3. Authentication Flow
- Test login with valid/invalid credentials
- Test token refresh functionality
- Test logout and token revocation

### 4. Restaurant Management
- Test restaurant CRUD operations
- Test different restaurant settings and configurations
- Test business hours and delivery zones

## 📱 Mobile Testing

All users can also be used for mobile API testing:
- Use the same credentials with mobile login endpoint
- Include device information in mobile requests
- Test mobile-specific features and responses

## 🔄 Refresh Token Testing

To test refresh tokens:
1. Login to get both access and refresh tokens
2. Use access token for API requests
3. When access token expires, use refresh token to get new tokens
4. Verify old refresh token is revoked and new ones are issued

---

**Note**: All passwords are set to `password` for easy testing. In production, use strong, unique passwords.

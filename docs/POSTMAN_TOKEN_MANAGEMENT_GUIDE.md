# Postman Token Management Guide

This guide explains how to manage authentication tokens in Postman for the RestroVibe API.

## 🔑 Token Types

The RestroVibe API uses three different authentication contexts:

1. **Admin Token** - For super admin operations
2. **Tenant Token** - For restaurant owner/manager/staff operations  
3. **Mobile Token** - For mobile app operations

## 📋 Step-by-Step Token Setup

### **Admin Authentication**

1. **Login as Admin**:
   ```
   POST /api/admin/auth/login
   {
     "email": "admin@restrovibe.com",
     "password": "password"
   }
   ```

2. **Copy Access Token**:
   - From response, copy the `access_token` value
   - Example: `1|abc123def456ghi789jkl012mno345pqr678stu901vwx234yz`

3. **Set Environment Variable**:
   - Open Postman Environment (top right dropdown)
   - Select "RestroVibe Development Environment"
   - Find `access_token` variable
   - Paste the token value
   - Save environment

4. **Use Admin Endpoints**:
   - All admin endpoints will automatically use the token
   - Test with: `GET /api/admin/dashboard`

### **Tenant Authentication**

1. **Login as Tenant User**:
   ```
   POST /api/tenant/auth/login
   {
     "email": "marco@bellavista.com",
     "password": "password"
   }
   ```

2. **Update Access Token**:
   - Copy new `access_token` from response
   - Update the `access_token` environment variable
   - Save environment

3. **Use Tenant Endpoints**:
   - All tenant endpoints will use the updated token
   - Test with: `GET /api/tenant/dashboard`

### **Mobile Authentication**

1. **Login via Mobile**:
   ```
   POST /api/mobile/auth/login
   {
     "email": "marco@bellavista.com",
     "password": "password",
     "device_id": "ABC123XYZ",
     "device_type": "ios",
     "app_version": "1.0.0"
   }
   ```

2. **Update Access Token**:
   - Copy new `access_token` from response
   - Update the `access_token` environment variable
   - Save environment

3. **Use Mobile Endpoints**:
   - All mobile endpoints will use the updated token
   - Test with: `GET /api/mobile/profile`

## 🔄 Token Refresh Workflow

When your access token expires (after 1 hour):

1. **Use Refresh Token**:
   ```
   POST /api/admin/auth/refresh
   Authorization: Bearer {{refresh_token}}
   ```

2. **Update Both Tokens**:
   - Copy new `access_token` and `refresh_token`
   - Update both environment variables
   - Save environment

## 🛠️ Environment Variables

The Postman environment includes these token variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `access_token` | Current access token for API requests | `1|abc123...` |
| `refresh_token` | Current refresh token for token renewal | `2|xyz789...` |
| `admin_token` | Admin-specific token (legacy) | - |
| `tenant_token` | Tenant-specific token (legacy) | - |
| `mobile_token` | Mobile-specific token (legacy) | - |

## 🎯 Quick Test Users

### **Admin**
- Email: `admin@restrovibe.com`
- Password: `password`

### **Restaurant Owner**
- Email: `marco@bellavista.com`
- Password: `password`

### **Manager**
- Email: `sofia@bellavista.com`
- Password: `password`

### **Staff**
- Email: `luca@bellavista.com`
- Password: `password`

### **Customer**
- Email: `robert@customer.com`
- Password: `password`

## 🔧 Troubleshooting

### **401 Unauthorized**
- Check if `access_token` is set in environment
- Verify token hasn't expired
- Try refreshing the token

### **403 Forbidden**
- Ensure you're using the correct user type (admin vs tenant vs mobile)
- Check user permissions and role

### **Token Expired**
- Use the refresh token to get new tokens
- Update environment variables with new tokens

## 📱 Mobile-Specific Notes

Mobile authentication includes additional fields:
- `device_id`: Unique device identifier
- `device_type`: "ios" or "android"
- `app_version`: Application version

These are used for device tracking and mobile-specific features.

## 🔒 Security Notes

- Access tokens expire in 1 hour
- Refresh tokens expire in 30 days
- Always use HTTPS in production
- Never share tokens in logs or client-side code
- Rotate tokens regularly for security

---

**Pro Tip**: Create separate Postman environments for different user types (Admin, Tenant, Mobile) to avoid constantly switching tokens!

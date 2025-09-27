# Postman Authorization Troubleshooting Guide

## Overview
This guide helps you troubleshoot authorization issues in the RestroVibe Postman collection.

## Quick Setup

### 1. Import Files
1. Import `RestroVibe_Postman_Collection.json`
2. Import `RestroVibe_Postman_Environment.json`
3. Select the "RestroVibe Development Environment" in Postman

### 2. Test Login Flow
1. **Admin Login**: Run "Admin Login" request
2. **Tenant Login**: Run "Tenant Login" request  
3. **Mobile Login**: Run "Mobile Login" request

## Common Issues & Solutions

### Issue 1: "Unauthorized access" Error

**Symptoms:**
- Getting 401 Unauthorized errors
- Token not being set properly

**Solutions:**
1. **Check Environment Variables:**
   - Go to Environment settings
   - Verify `admin_token`, `tenant_token`, `api_token` are set
   - Check that `base_url` is `http://localhost:8000/api`

2. **Check Login Response:**
   - Run login request
   - Check Console tab for any errors
   - Verify response contains `access_token`

3. **Manual Token Setting:**
   ```javascript
   // In Postman Console, run:
   pm.environment.set('admin_token', 'YOUR_TOKEN_HERE');
   ```

### Issue 2: Scripts Not Setting Tokens

**Symptoms:**
- Login succeeds but tokens aren't set
- Environment variables remain empty

**Solutions:**
1. **Check Script Execution:**
   - Go to request → Tests tab
   - Verify script is present and correct
   - Check Console for script errors

2. **Debug Script:**
   ```javascript
   // Add to Tests tab for debugging:
   console.log('Response status:', pm.response.code);
   console.log('Response body:', pm.response.text());
   
   if (pm.response.code === 200) {
       const response = pm.response.json();
       console.log('Parsed response:', response);
       
       if (response.data && response.data.access_token) {
           pm.environment.set('admin_token', response.data.access_token);
           console.log('Token set:', response.data.access_token);
       }
   }
   ```

3. **Manual Token Extraction:**
   - Copy `access_token` from login response
   - Manually set in environment variables

### Issue 3: Wrong Token for Route

**Symptoms:**
- Using admin token for tenant routes
- Using tenant token for admin routes

**Solutions:**
1. **Check Route Group:**
   - Admin routes use `{{admin_token}}`
   - Tenant routes use `{{tenant_token}}`
   - Mobile/API routes use `{{api_token}}`

2. **Verify Auth Configuration:**
   - Check request Authorization tab
   - Should be "Inherit auth from parent"
   - Parent folder should have correct token variable

### Issue 4: Token Expired

**Symptoms:**
- Getting 401 after successful login
- Token was working but now fails

**Solutions:**
1. **Re-login:**
   - Run appropriate login request
   - New token will be set automatically

2. **Check Token Expiry:**
   - Tokens expire in 1 hour (3600 seconds)
   - Check `expires_in` in login response

## Debugging Steps

### Step 1: Check Environment
```javascript
// Add to any request's Pre-request Script:
console.log('Admin Token:', pm.environment.get('admin_token'));
console.log('Tenant Token:', pm.environment.get('tenant_token'));
console.log('API Token:', pm.environment.get('api_token'));
```

### Step 2: Check Request Headers
```javascript
// Add to Tests tab:
console.log('Request headers:', pm.request.headers);
console.log('Authorization header:', pm.request.headers.get('Authorization'));
```

### Step 3: Validate Token Format
```javascript
// Add to Tests tab:
const token = pm.environment.get('admin_token');
if (token) {
    const isValid = /^\d+\|[a-zA-Z0-9]+$/.test(token);
    console.log('Token valid:', isValid);
} else {
    console.log('No token found');
}
```

## Manual Token Management

### Set Token Manually
1. Go to Environment settings
2. Find the appropriate token variable
3. Set the value to your token
4. Save the environment

### Clear All Tokens
```javascript
// Run in Postman Console:
pm.environment.set('admin_token', '');
pm.environment.set('tenant_token', '');
pm.environment.set('api_token', '');
pm.environment.set('access_token', '');
```

## Testing Authorization

### Test Admin Token
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  "http://localhost:8000/api/admin/tenants"
```

### Test Tenant Token
```bash
curl -H "Authorization: Bearer YOUR_TENANT_TOKEN" \
  "http://localhost:8000/api/tenant/restaurants"
```

### Test API Token
```bash
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
  "http://localhost:8000/api/mobile/profile"
```

## Environment Variables Reference

| Variable | Purpose | Example Value |
|----------|---------|---------------|
| `base_url` | API base URL | `http://localhost:8000/api` |
| `admin_token` | Admin authentication | `1|abc123...` |
| `tenant_token` | Tenant authentication | `2|def456...` |
| `api_token` | Mobile API authentication | `3|ghi789...` |
| `access_token` | General access token | `1|abc123...` |
| `admin_email` | Admin login email | `admin@restrovibe.com` |
| `admin_password` | Admin login password | `password` |
| `tenant_owner_email` | Tenant owner email | `marco@bellavista.com` |
| `tenant_owner_password` | Tenant owner password | `password` |

## Best Practices

1. **Always use environment variables** for sensitive data
2. **Check Console tab** for script execution logs
3. **Test login flow** before testing protected endpoints
4. **Use appropriate token** for each route group
5. **Clear tokens** when switching between users
6. **Check token expiry** for long testing sessions

## Support

If you continue to have issues:
1. Check the Postman Console for error messages
2. Verify your Laravel server is running
3. Check that the database is seeded with test data
4. Ensure all environment variables are set correctly

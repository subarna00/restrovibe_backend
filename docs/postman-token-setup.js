// Postman Token Setup Script
// This script can be used in Postman's pre-request or test scripts

// Function to set token based on route type
function setTokenForRoute() {
    const url = pm.request.url.toString();
    
    if (url.includes('/admin/')) {
        // Admin routes use admin_token
        pm.environment.set('current_token', pm.environment.get('admin_token'));
    } else if (url.includes('/tenant/')) {
        // Tenant routes use tenant_token
        pm.environment.set('current_token', pm.environment.get('tenant_token'));
    } else if (url.includes('/mobile/') || url.includes('/api/')) {
        // Mobile/API routes use api_token
        pm.environment.set('current_token', pm.environment.get('api_token'));
    }
}

// Function to extract and set token from login response
function setTokenFromLoginResponse() {
    if (pm.response.code === 200) {
        const response = pm.response.json();
        
        if (response.data && response.data.access_token) {
            const url = pm.request.url.toString();
            const token = response.data.access_token;
            
            if (url.includes('/admin/auth/login')) {
                pm.environment.set('admin_token', token);
                pm.environment.set('access_token', token);
                console.log('Admin token set successfully');
            } else if (url.includes('/tenant/auth/login')) {
                pm.environment.set('tenant_token', token);
                pm.environment.set('access_token', token);
                console.log('Tenant token set successfully');
            } else if (url.includes('/mobile/auth/login')) {
                pm.environment.set('api_token', token);
                pm.environment.set('access_token', token);
                console.log('API token set successfully');
            }
        }
    }
}

// Function to clear all tokens
function clearAllTokens() {
    pm.environment.set('admin_token', '');
    pm.environment.set('tenant_token', '');
    pm.environment.set('api_token', '');
    pm.environment.set('access_token', '');
    console.log('All tokens cleared');
}

// Usage examples:
// 1. In pre-request script for any request:
//    setTokenForRoute();

// 2. In test script for login requests:
//    setTokenFromLoginResponse();

// 3. In test script for logout requests:
//    clearAllTokens();

// Export functions for use in other scripts
pm.globals.set('setTokenForRoute', setTokenForRoute.toString());
pm.globals.set('setTokenFromLoginResponse', setTokenFromLoginResponse.toString());
pm.globals.set('clearAllTokens', clearAllTokens.toString());

// Instructions for Postman Collection:
// 1. Each route group now has proper auth configuration:
//    - Admin routes: {{admin_token}}
//    - Tenant routes: {{tenant_token}}
//    - Mobile/API routes: {{api_token}}
// 2. Login requests automatically set the appropriate token
// 3. No need for manual token management - Postman handles it automatically

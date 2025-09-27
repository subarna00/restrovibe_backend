// Postman Debug Script for Token Management
// Add this to the collection's pre-request script to debug token issues

// Function to debug current environment variables
function debugEnvironment() {
    console.log('=== Environment Debug ===');
    console.log('Base URL:', pm.environment.get('base_url'));
    console.log('Admin Token:', pm.environment.get('admin_token') ? 'SET' : 'NOT SET');
    console.log('Tenant Token:', pm.environment.get('tenant_token') ? 'SET' : 'NOT SET');
    console.log('API Token:', pm.environment.get('api_token') ? 'SET' : 'NOT SET');
    console.log('Access Token:', pm.environment.get('access_token') ? 'SET' : 'NOT SET');
    console.log('========================');
}

// Function to check if token is valid
function validateToken(token) {
    if (!token || token === '') {
        return false;
    }
    
    // Basic token format validation (should be like "1|abc123...")
    const tokenPattern = /^\d+\|[a-zA-Z0-9]+$/;
    return tokenPattern.test(token);
}

// Function to get appropriate token based on URL
function getTokenForRequest() {
    const url = pm.request.url.toString();
    
    if (url.includes('/admin/')) {
        return pm.environment.get('admin_token');
    } else if (url.includes('/tenant/')) {
        return pm.environment.get('tenant_token');
    } else if (url.includes('/mobile/') || url.includes('/api/')) {
        return pm.environment.get('api_token');
    }
    
    return pm.environment.get('access_token');
}

// Function to set Authorization header
function setAuthorizationHeader() {
    const token = getTokenForRequest();
    
    if (token && validateToken(token)) {
        pm.request.headers.add({
            key: 'Authorization',
            value: 'Bearer ' + token
        });
        console.log('Authorization header set with token:', token.substring(0, 10) + '...');
    } else {
        console.log('No valid token found for this request');
        console.log('URL:', pm.request.url.toString());
        console.log('Available tokens:');
        console.log('- Admin:', pm.environment.get('admin_token') ? 'SET' : 'NOT SET');
        console.log('- Tenant:', pm.environment.get('tenant_token') ? 'SET' : 'NOT SET');
        console.log('- API:', pm.environment.get('api_token') ? 'SET' : 'NOT SET');
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

// Function to test token validity
function testToken(token, description) {
    if (!token) {
        console.log(description + ': NOT SET');
        return false;
    }
    
    if (!validateToken(token)) {
        console.log(description + ': INVALID FORMAT');
        return false;
    }
    
    console.log(description + ': VALID');
    return true;
}

// Main execution
console.log('=== Pre-Request Debug ===');
debugEnvironment();

// Test all tokens
testToken(pm.environment.get('admin_token'), 'Admin Token');
testToken(pm.environment.get('tenant_token'), 'Tenant Token');
testToken(pm.environment.get('api_token'), 'API Token');

// Set authorization header if needed
setAuthorizationHeader();

console.log('=== End Pre-Request Debug ===');

// Export functions for use in other scripts
pm.globals.set('debugEnvironment', debugEnvironment.toString());
pm.globals.set('validateToken', validateToken.toString());
pm.globals.set('getTokenForRequest', getTokenForRequest.toString());
pm.globals.set('setAuthorizationHeader', setAuthorizationHeader.toString());
pm.globals.set('clearAllTokens', clearAllTokens.toString());
pm.globals.set('testToken', testToken.toString());

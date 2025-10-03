import { api } from '../api-client';
import { User, Tenant, Restaurant } from '../types/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  tenant: Tenant;
  restaurant?: Restaurant;
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  tenant_id?: number;
  restaurant_id?: number;
}

class AuthService {
  private readonly AUTH_TOKEN_KEY = 'auth_token';
  private readonly USER_DATA_KEY = 'user_data';

  // Login user
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/tenant/auth/login', credentials);
      
      if (response.success) {
        this.setAuthData(response.data);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Register user
  async register(userData: RegisterRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/register', userData);
      
      if (response.success) {
        this.setAuthData(response.data);
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuthData();
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }

  // Refresh token
  async refreshToken(): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/refresh');
      
      if (response.success) {
        this.setAuthData(response.data);
      }
      
      return response.data;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearAuthData();
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Get stored token
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  // Get stored user data
  getUserData(): User | null {
    if (typeof window === 'undefined') return null;
    const userData = localStorage.getItem(this.USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  // Get stored tenant data
  getTenantData(): Tenant | null {
    if (typeof window === 'undefined') return null;
    const tenantData = localStorage.getItem('tenant_data');
    return tenantData ? JSON.parse(tenantData) : null;
  }

  // Get stored restaurant data
  getRestaurantData(): Restaurant | null {
    if (typeof window === 'undefined') return null;
    const restaurantData = localStorage.getItem('restaurant_data');
    return restaurantData ? JSON.parse(restaurantData) : null;
  }

  // Check if user has specific role
  hasRole(role: string): boolean {
    const user = this.getUserData();
    return user?.role === role;
  }

  // Check if user has specific permission
  hasPermission(permission: string): boolean {
    const user = this.getUserData();
    return user?.permissions?.includes(permission) || false;
  }

  // Check if user is super admin
  isSuperAdmin(): boolean {
    return this.hasRole('super_admin');
  }

  // Check if user is restaurant owner
  isRestaurantOwner(): boolean {
    return this.hasRole('restaurant_owner');
  }

  // Check if user is manager
  isManager(): boolean {
    return this.hasRole('manager');
  }

  // Check if user is staff
  isStaff(): boolean {
    return this.hasRole('staff');
  }

  // Check if user is customer
  isCustomer(): boolean {
    return this.hasRole('customer');
  }

  // Private methods
  private setAuthData(data: LoginResponse): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(this.AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(data.user));
    localStorage.setItem('tenant_data', JSON.stringify(data.tenant));
    
    if (data.restaurant) {
      localStorage.setItem('restaurant_data', JSON.stringify(data.restaurant));
    }
  }

  private clearAuthData(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    localStorage.removeItem(this.USER_DATA_KEY);
    localStorage.removeItem('tenant_data');
    localStorage.removeItem('restaurant_data');
  }
}

export const authService = new AuthService();
export default authService;

// Simple login function for the login page
export const login = async (email: string, password: string) => {
  return await authService.login({ email, password });
};

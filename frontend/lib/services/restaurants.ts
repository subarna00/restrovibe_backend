import { api } from '../api-client';
import { Restaurant, CreateRestaurantRequest, PaginatedResponse, DashboardStats } from '../types/api';

class RestaurantService {
  // Get all restaurants for current tenant
  async getRestaurants(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
    cuisine_type?: string;
  }): Promise<PaginatedResponse<Restaurant>> {
    try {
      const response = await api.get<PaginatedResponse<Restaurant>>('/tenant/restaurants', { params });
      return response.data;
    } catch (error) {
      console.error('Get restaurants error:', error);
      throw error;
    }
  }

  // Get single restaurant
  async getRestaurant(id: number): Promise<Restaurant> {
    try {
      const response = await api.get<Restaurant>(`/tenant/restaurants/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get restaurant error:', error);
      throw error;
    }
  }

  // Create new restaurant
  async createRestaurant(data: CreateRestaurantRequest): Promise<Restaurant> {
    try {
      const response = await api.post<Restaurant>('/tenant/restaurants', data);
      return response.data;
    } catch (error) {
      console.error('Create restaurant error:', error);
      throw error;
    }
  }

  // Update restaurant
  async updateRestaurant(id: number, data: Partial<CreateRestaurantRequest>): Promise<Restaurant> {
    try {
      const response = await api.put<Restaurant>(`/tenant/restaurants/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Update restaurant error:', error);
      throw error;
    }
  }

  // Delete restaurant
  async deleteRestaurant(id: number): Promise<void> {
    try {
      await api.delete(`/tenant/restaurants/${id}`);
    } catch (error) {
      console.error('Delete restaurant error:', error);
      throw error;
    }
  }

  // Get restaurant dashboard data
  async getRestaurantDashboard(id: number): Promise<DashboardStats> {
    try {
      const response = await api.get<DashboardStats>(`/tenant/restaurants/${id}/dashboard`);
      return response.data;
    } catch (error) {
      console.error('Get restaurant dashboard error:', error);
      throw error;
    }
  }

  // Update restaurant settings
  async updateRestaurantSettings(id: number, settings: Record<string, any>): Promise<Restaurant> {
    try {
      const response = await api.put<Restaurant>(`/tenant/restaurants/${id}/settings`, settings);
      return response.data;
    } catch (error) {
      console.error('Update restaurant settings error:', error);
      throw error;
    }
  }

  // Get restaurant business hours
  async getBusinessHours(id: number): Promise<Record<string, { open: string; close: string }>> {
    try {
      const response = await api.get(`/tenant/restaurants/${id}/business-hours`);
      return response.data;
    } catch (error) {
      console.error('Get business hours error:', error);
      throw error;
    }
  }

  // Update business hours
  async updateBusinessHours(id: number, hours: Record<string, { open: string; close: string }>): Promise<Restaurant> {
    try {
      const response = await api.put<Restaurant>(`/tenant/restaurants/${id}/business-hours`, hours);
      return response.data;
    } catch (error) {
      console.error('Update business hours error:', error);
      throw error;
    }
  }

  // Get restaurant analytics
  async getRestaurantAnalytics(id: number, period: 'today' | 'week' | 'month' | 'year' = 'month'): Promise<{
    revenue: {
      total: number;
      growth: number;
      chart_data: Array<{ date: string; revenue: number }>;
    };
    orders: {
      total: number;
      growth: number;
      chart_data: Array<{ date: string; orders: number }>;
    };
    customers: {
      total: number;
      new: number;
      returning: number;
    };
    menu_performance: Array<{
      id: number;
      name: string;
      orders: number;
      revenue: number;
      growth: number;
    }>;
  }> {
    try {
      const response = await api.get(`/tenant/analytics/overview`, { 
        params: { restaurant_id: id, period } 
      });
      return response.data;
    } catch (error) {
      console.error('Get restaurant analytics error:', error);
      throw error;
    }
  }

  // Get restaurant revenue data
  async getRevenueData(id: number, period: 'daily' | 'monthly' = 'monthly'): Promise<{
    data: Array<{ date: string; revenue: number }>;
    total: number;
    growth: number;
  }> {
    try {
      const response = await api.get(`/tenant/analytics/revenue`, { 
        params: { restaurant_id: id, period } 
      });
      return response.data;
    } catch (error) {
      console.error('Get revenue data error:', error);
      throw error;
    }
  }

  // Get restaurant orders data
  async getOrdersData(id: number, period: 'today' | 'week' | 'month' = 'month'): Promise<{
    data: Array<{ date: string; orders: number }>;
    total: number;
    growth: number;
    status_breakdown: Record<string, number>;
  }> {
    try {
      const response = await api.get(`/tenant/analytics/orders`, { 
        params: { restaurant_id: id, period } 
      });
      return response.data;
    } catch (error) {
      console.error('Get orders data error:', error);
      throw error;
    }
  }

  // Get menu performance data
  async getMenuPerformance(id: number, period: 'today' | 'week' | 'month' = 'month'): Promise<{
    top_items: Array<{
      id: number;
      name: string;
      orders: number;
      revenue: number;
      growth: number;
    }>;
    low_performing: Array<{
      id: number;
      name: string;
      orders: number;
      revenue: number;
      last_ordered: string;
    }>;
    categories_performance: Array<{
      id: number;
      name: string;
      orders: number;
      revenue: number;
      growth: number;
    }>;
  }> {
    try {
      const response = await api.get(`/tenant/analytics/menu`, { 
        params: { restaurant_id: id, period } 
      });
      return response.data;
    } catch (error) {
      console.error('Get menu performance error:', error);
      throw error;
    }
  }
}

export const restaurantService = new RestaurantService();
export default restaurantService;

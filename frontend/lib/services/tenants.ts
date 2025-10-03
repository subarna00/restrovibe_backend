import { api } from '../api-client';
import { Tenant, CreateTenantRequest, PaginatedResponse } from '../types/api';

class TenantService {
  // Get all tenants (Super Admin only)
  async getTenants(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
    subscription_plan?: string;
  }): Promise<PaginatedResponse<Tenant>> {
    try {
      const response = await api.get<PaginatedResponse<Tenant>>('/admin/tenants', { params });
      return response.data;
    } catch (error) {
      console.error('Get tenants error:', error);
      throw error;
    }
  }

  // Get single tenant
  async getTenant(id: number): Promise<Tenant> {
    try {
      const response = await api.get<Tenant>(`/admin/tenants/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get tenant error:', error);
      throw error;
    }
  }

  // Create new tenant
  async createTenant(data: CreateTenantRequest): Promise<Tenant> {
    try {
      const response = await api.post<Tenant>('/admin/tenants', data);
      return response.data;
    } catch (error) {
      console.error('Create tenant error:', error);
      throw error;
    }
  }

  // Update tenant
  async updateTenant(id: number, data: Partial<CreateTenantRequest>): Promise<Tenant> {
    try {
      const response = await api.put<Tenant>(`/admin/tenants/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Update tenant error:', error);
      throw error;
    }
  }

  // Delete tenant
  async deleteTenant(id: number): Promise<void> {
    try {
      await api.delete(`/admin/tenants/${id}`);
    } catch (error) {
      console.error('Delete tenant error:', error);
      throw error;
    }
  }

  // Suspend tenant
  async suspendTenant(id: number): Promise<Tenant> {
    try {
      const response = await api.post<Tenant>(`/admin/tenants/${id}/suspend`);
      return response.data;
    } catch (error) {
      console.error('Suspend tenant error:', error);
      throw error;
    }
  }

  // Activate tenant
  async activateTenant(id: number): Promise<Tenant> {
    try {
      const response = await api.post<Tenant>(`/admin/tenants/${id}/activate`);
      return response.data;
    } catch (error) {
      console.error('Activate tenant error:', error);
      throw error;
    }
  }

  // Switch to tenant (Super Admin only)
  async switchToTenant(id: number): Promise<void> {
    try {
      await api.post(`/admin/tenants/${id}/switch`);
    } catch (error) {
      console.error('Switch tenant error:', error);
      throw error;
    }
  }

  // Get tenant analytics
  async getTenantAnalytics(id: number): Promise<{
    revenue: {
      total: number;
      monthly: number;
      growth: number;
    };
    orders: {
      total: number;
      this_month: number;
      growth: number;
    };
    restaurants: {
      total: number;
      active: number;
    };
    users: {
      total: number;
      active: number;
    };
  }> {
    try {
      const response = await api.get(`/admin/tenants/${id}/analytics`);
      return response.data;
    } catch (error) {
      console.error('Get tenant analytics error:', error);
      throw error;
    }
  }

  // Get tenant statistics
  async getTenantStats(): Promise<{
    total_tenants: number;
    active_tenants: number;
    suspended_tenants: number;
    total_revenue: number;
    monthly_revenue: number;
    revenue_growth: number;
  }> {
    try {
      const response = await api.get('/admin/dashboard/tenant-stats');
      return response.data;
    } catch (error) {
      console.error('Get tenant stats error:', error);
      throw error;
    }
  }
}

export const tenantService = new TenantService();
export default tenantService;

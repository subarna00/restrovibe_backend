import { baseApi } from './baseApi'
import { Tenant } from '@/lib/types/api'

export const tenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTenants: builder.query<Tenant[], void>({
      query: () => '/admin/tenants',
      providesTags: ['Tenant'],
    }),
    getTenant: builder.query<Tenant, number>({
      query: (id) => `/admin/tenants/${id}`,
      providesTags: (result, error, id) => [{ type: 'Tenant', id }],
    }),
    createTenant: builder.mutation<Tenant, Partial<Tenant>>({
      query: (tenant) => ({
        url: '/admin/tenants',
        method: 'POST',
        body: tenant,
      }),
      invalidatesTags: ['Tenant'],
    }),
    updateTenant: builder.mutation<Tenant, { id: number; updates: Partial<Tenant> }>({
      query: ({ id, updates }) => ({
        url: `/admin/tenants/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Tenant', id }],
    }),
    deleteTenant: builder.mutation<void, number>({
      query: (id) => ({
        url: `/admin/tenants/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tenant'],
    }),
    suspendTenant: builder.mutation<Tenant, number>({
      query: (id) => ({
        url: `/admin/tenants/${id}/suspend`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Tenant', id }],
    }),
    activateTenant: builder.mutation<Tenant, number>({
      query: (id) => ({
        url: `/admin/tenants/${id}/activate`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Tenant', id }],
    }),
    getTenantAnalytics: builder.query<any, number>({
      query: (id) => `/admin/tenants/${id}/analytics`,
      providesTags: (result, error, id) => [{ type: 'Analytics', id }],
    }),
  }),
})

export const {
  useGetTenantsQuery,
  useGetTenantQuery,
  useCreateTenantMutation,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
  useSuspendTenantMutation,
  useActivateTenantMutation,
  useGetTenantAnalyticsQuery,
} = tenantApi

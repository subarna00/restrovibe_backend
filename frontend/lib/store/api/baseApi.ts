import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../index'
import { User, Tenant, Restaurant, MenuCategory, MenuItem, Order, OrderItem, TableCategory, Table } from '@/lib/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      headers.set('content-type', 'application/json')
      headers.set('accept', 'application/json')
      return headers
    },
  }),
  tagTypes: [
    'User',
    'Tenant',
    'Restaurant',
    'MenuCategory',
    'MenuItem',
    'Order',
    'OrderItem',
    'TableCategory',
    'Table',
    'Staff',
    'Analytics',
  ],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<{
      data: {
        user: User
        tenant: Tenant
        restaurant?: Restaurant
        access_token: string
        refresh_token: string
        token_type: string
        expires_in: number
      }
      message: string
      status: string
      statusCode: number
    }, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/tenant/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User', 'Tenant', 'Restaurant'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/tenant/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Tenant', 'Restaurant'],
    }),
    getMe: builder.query<User, void>({
      query: () => '/user',
      providesTags: ['User'],
    }),

    // Tenant endpoints
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

    // Restaurant endpoints
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => '/tenant/restaurants',
      providesTags: ['Restaurant'],
    }),
    getRestaurant: builder.query<Restaurant, number>({
      query: (id) => `/tenant/restaurants/${id}`,
      providesTags: (result, error, id) => [{ type: 'Restaurant', id }],
    }),
    createRestaurant: builder.mutation<Restaurant, Partial<Restaurant>>({
      query: (restaurant) => ({
        url: '/tenant/restaurants',
        method: 'POST',
        body: restaurant,
      }),
      invalidatesTags: ['Restaurant'],
    }),
    updateRestaurant: builder.mutation<Restaurant, { id: number; updates: Partial<Restaurant> }>({
      query: ({ id, updates }) => ({
        url: `/tenant/restaurants/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Restaurant', id }],
    }),

    // Menu Category endpoints
    getMenuCategories: builder.query<MenuCategory[], void>({
      query: () => '/tenant/menu-categories',
      providesTags: ['MenuCategory'],
    }),
    getMenuCategory: builder.query<MenuCategory, number>({
      query: (id) => `/tenant/menu-categories/${id}`,
      providesTags: (result, error, id) => [{ type: 'MenuCategory', id }],
    }),
    createMenuCategory: builder.mutation<MenuCategory, Partial<MenuCategory>>({
      query: (category) => ({
        url: '/tenant/menu-categories',
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['MenuCategory'],
    }),
    updateMenuCategory: builder.mutation<MenuCategory, { id: number; updates: Partial<MenuCategory> }>({
      query: ({ id, updates }) => ({
        url: `/tenant/menu-categories/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'MenuCategory', id }],
    }),
    deleteMenuCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/tenant/menu-categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MenuCategory'],
    }),

    // Menu Item endpoints
    getMenuItems: builder.query<MenuItem[], void>({
      query: () => '/tenant/menu-items',
      providesTags: ['MenuItem'],
    }),
    getMenuItemsByCategory: builder.query<MenuItem[], number>({
      query: (categoryId) => `/tenant/menu-items?category_id=${categoryId}`,
      providesTags: (result, error, categoryId) => [
        { type: 'MenuItem', id: 'LIST' },
        { type: 'MenuCategory', id: categoryId },
      ],
    }),
    getMenuItem: builder.query<MenuItem, number>({
      query: (id) => `/tenant/menu-items/${id}`,
      providesTags: (result, error, id) => [{ type: 'MenuItem', id }],
    }),
    createMenuItem: builder.mutation<MenuItem, Partial<MenuItem>>({
      query: (item) => ({
        url: '/tenant/menu-items',
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['MenuItem'],
    }),
    updateMenuItem: builder.mutation<MenuItem, { id: number; updates: Partial<MenuItem> }>({
      query: ({ id, updates }) => ({
        url: `/tenant/menu-items/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'MenuItem', id }],
    }),
    deleteMenuItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `/tenant/menu-items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MenuItem'],
    }),

    // Order endpoints
    getOrders: builder.query<Order[], { page?: number; status?: string; date?: string }>({
      query: (params) => ({
        url: '/tenant/orders',
        params,
      }),
      providesTags: ['Order'],
    }),
    getOrder: builder.query<Order, number>({
      query: (id) => `/tenant/orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
    createOrder: builder.mutation<Order, Partial<Order>>({
      query: (order) => ({
        url: '/tenant/orders',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Order'],
    }),
    updateOrder: builder.mutation<Order, { id: number; updates: Partial<Order> }>({
      query: ({ id, updates }) => ({
        url: `/tenant/orders/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Order', id }],
    }),
    updateOrderStatus: builder.mutation<Order, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: `/tenant/orders/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Order', id }],
    }),

    // Table endpoints
    getTables: builder.query<Table[], void>({
      query: () => '/tenant/tables',
      providesTags: ['Table'],
    }),
    getTable: builder.query<Table, number>({
      query: (id) => `/tenant/tables/${id}`,
      providesTags: (result, error, id) => [{ type: 'Table', id }],
    }),
    createTable: builder.mutation<Table, Partial<Table>>({
      query: (table) => ({
        url: '/tenant/tables',
        method: 'POST',
        body: table,
      }),
      invalidatesTags: ['Table'],
    }),
    updateTable: builder.mutation<Table, { id: number; updates: Partial<Table> }>({
      query: ({ id, updates }) => ({
        url: `/tenant/tables/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Table', id }],
    }),
    updateTableStatus: builder.mutation<Table, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: `/tenant/tables/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Table', id }],
    }),

    // Analytics endpoints
    getDashboardStats: builder.query<any, void>({
      query: () => '/tenant/analytics/dashboard',
      providesTags: ['Analytics'],
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useGetTenantsQuery,
  useGetTenantQuery,
  useCreateTenantMutation,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
  useGetRestaurantsQuery,
  useGetRestaurantQuery,
  useCreateRestaurantMutation,
  useUpdateRestaurantMutation,
  useGetMenuCategoriesQuery,
  useGetMenuCategoryQuery,
  useCreateMenuCategoryMutation,
  useUpdateMenuCategoryMutation,
  useDeleteMenuCategoryMutation,
  useGetMenuItemsQuery,
  useGetMenuItemsByCategoryQuery,
  useGetMenuItemQuery,
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
  useGetTablesQuery,
  useGetTableQuery,
  useCreateTableMutation,
  useUpdateTableMutation,
  useUpdateTableStatusMutation,
  useGetDashboardStatsQuery,
} = baseApi

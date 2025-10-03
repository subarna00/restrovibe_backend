import { baseApi } from './baseApi'

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<any, void>({
      query: () => '/tenant/analytics/dashboard',
      providesTags: ['Analytics'],
    }),
    getRevenueAnalytics: builder.query<any, { period: string; start_date?: string; end_date?: string }>({
      query: (params) => ({
        url: '/tenant/analytics/revenue',
        params,
      }),
      providesTags: ['Analytics'],
    }),
    getOrderAnalytics: builder.query<any, { period: string; start_date?: string; end_date?: string }>({
      query: (params) => ({
        url: '/tenant/analytics/orders',
        params,
      }),
      providesTags: ['Analytics'],
    }),
    getMenuAnalytics: builder.query<any, { period: string; start_date?: string; end_date?: string }>({
      query: (params) => ({
        url: '/tenant/analytics/menu',
        params,
      }),
      providesTags: ['Analytics'],
    }),
    getTableAnalytics: builder.query<any, { period: string; start_date?: string; end_date?: string }>({
      query: (params) => ({
        url: '/tenant/analytics/tables',
        params,
      }),
      providesTags: ['Analytics'],
    }),
    getStaffAnalytics: builder.query<any, { period: string; start_date?: string; end_date?: string }>({
      query: (params) => ({
        url: '/tenant/analytics/staff',
        params,
      }),
      providesTags: ['Analytics'],
    }),
    getCustomerAnalytics: builder.query<any, { period: string; start_date?: string; end_date?: string }>({
      query: (params) => ({
        url: '/tenant/analytics/customers',
        params,
      }),
      providesTags: ['Analytics'],
    }),
  }),
})

export const {
  useGetDashboardStatsQuery,
  useGetRevenueAnalyticsQuery,
  useGetOrderAnalyticsQuery,
  useGetMenuAnalyticsQuery,
  useGetTableAnalyticsQuery,
  useGetStaffAnalyticsQuery,
  useGetCustomerAnalyticsQuery,
} = analyticsApi

import { baseApi } from './baseApi'
import { User, Tenant, Restaurant } from '@/lib/types/api'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  tenant: Tenant
  restaurant?: Restaurant
  token: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
  tenant_id?: number
  restaurant_id?: number
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/tenant/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User', 'Tenant', 'Restaurant'],
    }),
    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
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
    refreshToken: builder.mutation<LoginResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Tenant', 'Restaurant'],
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetMeQuery,
  useRefreshTokenMutation,
} = authApi

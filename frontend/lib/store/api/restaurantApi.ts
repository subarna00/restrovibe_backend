import { baseApi } from './baseApi'
import { Restaurant } from '@/lib/types/api'

export const restaurantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
    deleteRestaurant: builder.mutation<void, number>({
      query: (id) => ({
        url: `/tenant/restaurants/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Restaurant'],
    }),
    getRestaurantDashboard: builder.query<any, number>({
      query: (id) => `/tenant/restaurants/${id}/dashboard`,
      providesTags: (result, error, id) => [{ type: 'Analytics', id }],
    }),
    updateRestaurantSettings: builder.mutation<Restaurant, { id: number; settings: any }>({
      query: ({ id, settings }) => ({
        url: `/tenant/restaurants/${id}/settings`,
        method: 'PUT',
        body: settings,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Restaurant', id }],
    }),
  }),
})

export const {
  useGetRestaurantsQuery,
  useGetRestaurantQuery,
  useCreateRestaurantMutation,
  useUpdateRestaurantMutation,
  useDeleteRestaurantMutation,
  useGetRestaurantDashboardQuery,
  useUpdateRestaurantSettingsMutation,
} = restaurantApi

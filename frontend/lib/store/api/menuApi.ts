import { baseApi } from './baseApi'
import { MenuCategory, MenuItem } from '@/lib/types/api'

export const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Menu Categories
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

    // Menu Items
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
    updateMenuItemAvailability: builder.mutation<MenuItem, { id: number; available: boolean }>({
      query: ({ id, available }) => ({
        url: `/tenant/menu-items/${id}/availability`,
        method: 'PATCH',
        body: { available },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'MenuItem', id }],
    }),
  }),
})

export const {
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
  useUpdateMenuItemAvailabilityMutation,
} = menuApi

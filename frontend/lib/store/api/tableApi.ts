import { baseApi } from './baseApi'
import { TableCategory, Table } from '@/lib/types/api'

export const tableApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Table Categories
    getTableCategories: builder.query<TableCategory[], void>({
      query: () => '/tenant/table-categories',
      providesTags: ['TableCategory'],
    }),
    getTableCategory: builder.query<TableCategory, number>({
      query: (id) => `/tenant/table-categories/${id}`,
      providesTags: (result, error, id) => [{ type: 'TableCategory', id }],
    }),
    createTableCategory: builder.mutation<TableCategory, Partial<TableCategory>>({
      query: (category) => ({
        url: '/tenant/table-categories',
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['TableCategory'],
    }),
    updateTableCategory: builder.mutation<TableCategory, { id: number; updates: Partial<TableCategory> }>({
      query: ({ id, updates }) => ({
        url: `/tenant/table-categories/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'TableCategory', id }],
    }),
    deleteTableCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/tenant/table-categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TableCategory'],
    }),

    // Tables
    getTables: builder.query<Table[], void>({
      query: () => '/tenant/tables',
      providesTags: ['Table'],
    }),
    getTablesByCategory: builder.query<Table[], number>({
      query: (categoryId) => `/tenant/tables?category_id=${categoryId}`,
      providesTags: (result, error, categoryId) => [
        { type: 'Table', id: 'LIST' },
        { type: 'TableCategory', id: categoryId },
      ],
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
    deleteTable: builder.mutation<void, number>({
      query: (id) => ({
        url: `/tenant/tables/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Table'],
    }),
    updateTableStatus: builder.mutation<Table, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: `/tenant/tables/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Table', id }],
    }),
  }),
})

export const {
  useGetTableCategoriesQuery,
  useGetTableCategoryQuery,
  useCreateTableCategoryMutation,
  useUpdateTableCategoryMutation,
  useDeleteTableCategoryMutation,
  useGetTablesQuery,
  useGetTablesByCategoryQuery,
  useGetTableQuery,
  useCreateTableMutation,
  useUpdateTableMutation,
  useDeleteTableMutation,
  useUpdateTableStatusMutation,
} = tableApi

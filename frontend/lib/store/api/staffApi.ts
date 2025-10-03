import { baseApi } from './baseApi'
import { User } from '@/lib/types/api'

export const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaff: builder.query<User[], void>({
      query: () => '/tenant/staff',
      providesTags: ['Staff'],
    }),
    getStaffMember: builder.query<User, number>({
      query: (id) => `/tenant/staff/${id}`,
      providesTags: (result, error, id) => [{ type: 'Staff', id }],
    }),
    createStaff: builder.mutation<User, Partial<User>>({
      query: (staff) => ({
        url: '/tenant/staff',
        method: 'POST',
        body: staff,
      }),
      invalidatesTags: ['Staff'],
    }),
    updateStaff: builder.mutation<User, { id: number; updates: Partial<User> }>({
      query: ({ id, updates }) => ({
        url: `/tenant/staff/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Staff', id }],
    }),
    deleteStaff: builder.mutation<void, number>({
      query: (id) => ({
        url: `/tenant/staff/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Staff'],
    }),
    updateStaffRole: builder.mutation<User, { id: number; role: string }>({
      query: ({ id, role }) => ({
        url: `/tenant/staff/${id}/role`,
        method: 'PATCH',
        body: { role },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Staff', id }],
    }),
    updateStaffStatus: builder.mutation<User, { id: number; is_active: boolean }>({
      query: ({ id, is_active }) => ({
        url: `/tenant/staff/${id}/status`,
        method: 'PATCH',
        body: { is_active },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Staff', id }],
    }),
  }),
})

export const {
  useGetStaffQuery,
  useGetStaffMemberQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
  useUpdateStaffRoleMutation,
  useUpdateStaffStatusMutation,
} = staffApi

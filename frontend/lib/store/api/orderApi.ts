import { baseApi } from './baseApi'
import { Order, OrderItem } from '@/lib/types/api'

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
    deleteOrder: builder.mutation<void, number>({
      query: (id) => ({
        url: `/tenant/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order'],
    }),
    getOrderItems: builder.query<OrderItem[], number>({
      query: (orderId) => `/tenant/orders/${orderId}/items`,
      providesTags: (result, error, orderId) => [
        { type: 'OrderItem', id: 'LIST' },
        { type: 'Order', id: orderId },
      ],
    }),
    addOrderItem: builder.mutation<OrderItem, { orderId: number; item: Partial<OrderItem> }>({
      query: ({ orderId, item }) => ({
        url: `/tenant/orders/${orderId}/items`,
        method: 'POST',
        body: item,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'OrderItem', id: 'LIST' },
        { type: 'Order', id: orderId },
      ],
    }),
    updateOrderItem: builder.mutation<OrderItem, { orderId: number; itemId: number; updates: Partial<OrderItem> }>({
      query: ({ orderId, itemId, updates }) => ({
        url: `/tenant/orders/${orderId}/items/${itemId}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { orderId, itemId }) => [
        { type: 'OrderItem', id: itemId },
        { type: 'Order', id: orderId },
      ],
    }),
    deleteOrderItem: builder.mutation<void, { orderId: number; itemId: number }>({
      query: ({ orderId, itemId }) => ({
        url: `/tenant/orders/${orderId}/items/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { orderId, itemId }) => [
        { type: 'OrderItem', id: itemId },
        { type: 'Order', id: orderId },
      ],
    }),
  }),
})

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useGetOrderItemsQuery,
  useAddOrderItemMutation,
  useUpdateOrderItemMutation,
  useDeleteOrderItemMutation,
} = orderApi

import { ORDERS_URL } from "../../utils/constants";
import { OrderType } from "../../utils/customTypes";
import apiSlice from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation<void, OrderType>({
      query: (receivedOrder) => ({
        url: ORDERS_URL,
        method: "POST",
        body: receivedOrder,
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),
    cancelOrder: builder.mutation<void, string>({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "DELETE",
        body: JSON.stringify({ orderId }),
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrders: builder.query<OrderType[], void>({
      query: () => ({
        url: ORDERS_URL,
        credentials: "include",
      }),

      providesTags: ["Orders"],
    }),
    getOrdersAdmin: builder.query<OrderType[], void>({
      query: () => ({
        url: `${ORDERS_URL}/admin`,
        credentials: "include",
      }),
      providesTags: ["Orders"],
    }),
    updateOrderAdmin: builder.mutation<OrderType, OrderType>({
      query: (order) => ({
        url: `${ORDERS_URL}/${order._id}`,
        method: "PATCH",
        body: { orderStatus: order.isDelivered },
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useCancelOrderMutation,
  useGetOrdersQuery,
  useGetOrdersAdminQuery,
  useUpdateOrderAdminMutation,
} = orderApiSlice;

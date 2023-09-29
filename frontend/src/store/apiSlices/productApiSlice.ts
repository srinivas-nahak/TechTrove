import { ProductType } from "../../utils/productType";
import { PRODUCTS_URL } from "../../utils/constants";
import apiSlice from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductType[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 5, //seconds
    }),
    getProduct: builder.query<ProductType, string>({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApiSlice;

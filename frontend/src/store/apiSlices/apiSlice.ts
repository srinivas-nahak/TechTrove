import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Products", "Orders", "Users"],
  endpoints: (_) => ({}),
});

export default apiSlice;

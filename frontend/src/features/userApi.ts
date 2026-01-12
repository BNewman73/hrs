import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../features/authSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getPrincipal: builder.query<User, void>({
      query: () => "/users/principal",
    }),
  }),
});

export const { useGetPrincipalQuery } = userApi;
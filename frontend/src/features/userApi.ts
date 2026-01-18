import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "./userSlice";
import type { User } from "./userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["User", "Users"],
  endpoints: (builder) => ({
    getPrincipal: builder.query<User, void>({
      query: () => "/users/storedUser",
      providesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setUser(data));
      },
    }),

    updateProfile: builder.mutation<
      User,
      Pick<User, "firstName" | "lastName" | "email" | "avatarUrl">
    >({
      query: (body) => ({
        url: "/users/storedUser/update",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setUser(data));
      },
    }),
    getAllUsers: builder.query<UserDTO[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    updateUser: builder.mutation<UserDTO, UserDTO>({
      query: (user) => ({
        url: `/users/${encodeURIComponent(user.publicId)}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetPrincipalQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} = userApi;

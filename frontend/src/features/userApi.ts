import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { clearUser, setUser } from "./userSlice";
import type { User } from "./userSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    api.dispatch(clearUser());
  }

  return result;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User", "Users"],
  endpoints: (builder) => ({
    getPrincipal: builder.query<User, void>({
      query: () => "/users/storedUser",
      providesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch {
          dispatch(clearUser());
        }
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

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(clearUser());
      },
    }),
  }),
});

export const {
  useGetPrincipalQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useLogoutMutation,
} = userApi;

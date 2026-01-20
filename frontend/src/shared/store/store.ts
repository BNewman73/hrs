/**
 * Redux store configuration for the frontend application.
 *
 * Combines slices (`toast`, `user`) and RTK Query API reducers (user, room,
 * reservation). Middleware from the APIs is concatenated to enable caching
 * and automatic refetch behavior.
 *
 * @module src/shared/store/store
 */
// Infer the `RootState` and `AppDispatch` types from the store itself

import { configureStore } from "@reduxjs/toolkit";

import toastReducer from "../../features/toastSlice";
import userReducer from "../../features/userSlice";
import { roomApi } from "../../features/roomApi";
import { reservationApi } from "../../features/reservationApi";
import { userApi } from "../../features/userApi";

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [reservationApi.reducerPath]: reservationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(roomApi.middleware)
      .concat(reservationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

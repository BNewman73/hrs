// Infer the `RootState` and `AppDispatch` types from the store itself

import { configureStore } from "@reduxjs/toolkit";

import toastReducer from "../../features/toastSlice";
import authReducer from "../../features/authSlice";
import { roomApi } from "../../features/roomApi";
import { reservationApi } from "../../features/reservationApi";

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    auth: authReducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [reservationApi.reducerPath]: reservationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(roomApi.middleware)
      .concat(reservationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

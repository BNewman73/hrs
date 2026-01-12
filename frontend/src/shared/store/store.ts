// Infer the `RootState` and `AppDispatch` types from the store itself

import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "../../features/roomSlice";
import toastReducer from "../../features/toastSlice";
import authReducer from "../../features/authSlice";
import { roomApi } from "../../reservations/roomApi";
import { userApi } from "../../features/userApi";

export const store = configureStore({
  reducer: {
    room: roomReducer,
    toast: toastReducer,
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware).concat(roomApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

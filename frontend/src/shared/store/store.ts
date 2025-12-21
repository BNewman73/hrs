// Infer the `RootState` and `AppDispatch` types from the store itself

import { configureStore } from '@reduxjs/toolkit'
import roomReducer from '../../features/roomSlice'
import toastReducer from'../../features/toastSlice'

export const store = configureStore({
  reducer: {
    room: roomReducer,
    toast:toastReducer

  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
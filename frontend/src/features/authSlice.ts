import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type AuthProvider = "google" | "github" | null;

interface User {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  provider: AuthProvider;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  provider: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state, action: PayloadAction<AuthProvider>) {
      state.isLoading = true;
      state.provider = action.payload;
    },
    authSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    authFailure(state) {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.provider = null;
    },
    logout(state) {
      state.user = null;
      state.provider = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
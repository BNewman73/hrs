import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  provider: string;
  role: string;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    updateUserField(
      state,
      action: PayloadAction<{ field: keyof User; value: string }>
    ) {
      if (state.user) {
        (state.user[action.payload.field] as string) = action.payload.value;
      }
    },
  },
});

export const { setUser, clearUser, updateUserField } = userSlice.actions;
export default userSlice.reducer;
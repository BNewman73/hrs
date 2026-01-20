/**
 * toastSlice
 *
 * Redux slice for transient toast notifications used application-wide.
 * Provides `showToast` and `hideToast` actions and a small `ToastState`
 * shape consumed by `GlobalSnackbar`.
 */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: ToastState = {
  open: false,
  message: "",
  severity: "success",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<Omit<ToastState, "open">>) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hideToast: (state) => {
      state.open = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;

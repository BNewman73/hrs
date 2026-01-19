import { Snackbar, Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../shared/store/hooks";
import { hideToast } from "../features/toastSlice";

//GLOBAL TOAST
export default function GlobalSnackbar() {
  const dispatch = useAppDispatch();
  const { open, message, severity } = useAppSelector((s) => s.toast);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => dispatch(hideToast())}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={() => dispatch(hideToast())}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

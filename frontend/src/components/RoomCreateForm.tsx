import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";

import { useAppDispatch} from "../shared/store/hooks";
import { createRoom } from "../features/roomSlice";
import { showToast } from "../features/toastSlice";

// runtime array for select
const ROOM_TYPES: RoomType[] = ["SINGLE", "DOUBLE"];

export default function RoomCreateForm() {
  const dispatch = useAppDispatch();
 
  const [room, setRoom] = useState<RoomPostDTO>({
    roomNumber: "",
    pricePerNight: 0,
    images: [],
    roomType: "SINGLE",
  });

  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = <K extends keyof RoomPostDTO>(
    field: K,
    value: RoomPostDTO[K]
  ) => {
    setRoom((prev) => ({ ...prev, [field]: value }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    console.log("Room to create:", room);

    // wait for thunk to succeed (throws on error)
    await dispatch(createRoom(room)).unwrap();

    // success toast
    dispatch(
      showToast({
        message: "Room created successfully!",
        severity: "success",
      })
    );

    // reset form
    setRoom({
      roomNumber: "",
      pricePerNight: 0,
      images: [],
      roomType: "SINGLE",
    });
  } catch (error: unknown) {
    let message = "Room creation failed";

    if (error instanceof Error) {
      message = error.message;
    }

    dispatch(
      showToast({
        message,
        severity: "error",
      })
    );
  }
};


  return (
    <>
      {/* Page background + centering */}
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "grey.100",
          display: "flex",
          alignItems: "center",
          py: 6,
        }}
      >
        <Container maxWidth="sm">
          {/* Card-like form */}
          <Box
            sx={{
              bgcolor: "background.paper",
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              boxShadow: 4,
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Create Room
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
            >
              Fill out the details below to add a new room.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              <TextField
                fullWidth
                label="Room Number"
                value={room.roomNumber}
                onChange={(e) =>
                  handleChange("roomNumber", e.target.value)
                }
                required
              />

              <TextField
                fullWidth
                label="Price Per Night"
                type="number"
                value={room.pricePerNight}
                onChange={(e) =>
                  handleChange(
                    "pricePerNight",
                    Number(e.target.value)
                  )
                }
                required
              />

              <TextField
                fullWidth
                label="Images (comma separated URLs)"
                value={room.images.join(",")}
                onChange={(e) =>
                  handleChange(
                    "images",
                    e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
              />

              {/* Room Type */}
              <FormControl fullWidth>
                <InputLabel id="type-label">Room Type</InputLabel>
                <Select
                  labelId="type-label"
                  value={room.roomType}
                  label="Room Type"
                  onChange={(e) =>
                    handleChange(
                      "roomType",
                      e.target.value as RoomType
                    )
                  }
                >
                  {ROOM_TYPES.map((t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ py: 1.5, borderRadius: 2, fontSize: "1rem" }}
              >
                Create Room
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={() => setToast((t) => ({ ...t, open: false }))}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}

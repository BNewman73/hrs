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
  IconButton,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch } from "../../shared/store/hooks";
import { createRoom, deleteRoom, updateRoom } from "../../features/roomSlice";
import { showToast } from "../../features/toastSlice";

const ROOM_TYPES: RoomType[] = ["SINGLE", "DOUBLE", "DELUXE", "SUITE"];

export default function RoomCreateForm({
  props,
  crud = "",
  onClose,
}: {
  props?: RoomDTO;
  crud: string;
  onClose?: () => void;
}) {
  const dispatch = useAppDispatch();

  // State for the confirmation dialog
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [room, setRoom] = useState<RoomDTO>({
    roomNumber: props?.roomNumber || "",
    pricePerNight: props?.pricePerNight || 0,
    images: props?.images || [],
    roomType: props?.roomType || "SINGLE",
    publicID: props?.publicID || "",
  });

  const handleChange = <K extends keyof RoomDTO>(
    field: K,
    value: RoomDTO[K]
  ) => {
    setRoom((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (crud === "Create") await dispatch(createRoom(room)).unwrap();
      else await dispatch(updateRoom(room)).unwrap();

      dispatch(
        showToast({
          message: `Room ${crud.toLowerCase()}d successfully!`,
          severity: "success",
        })
      );
      setRoom({
        roomNumber: "",
        roomType: "SINGLE",
        pricePerNight: 0,
        publicID: "",
        images: [],
      });
      if (onClose) onClose();
    } catch (error: unknown) {
      const message =
        typeof error === "string" ? error : "An unexpected error occurred";

      dispatch(
        showToast({
          message: message,
          severity: "error",
        })
      );
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteRoom(room.publicID)).unwrap();
      dispatch(
        showToast({ message: "Room deleted successfully", severity: "info" })
      );
      setConfirmOpen(false);
      if (onClose) onClose();
    } catch {
      dispatch(
        showToast({ message: "Failed to delete room", severity: "error" })
      );
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ zIndex: "1" }}>
        <Box
          sx={{
            bgcolor: "background.paper",
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            boxShadow: 4,
          }}
        >
          <Box
            component="header"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {`${crud} Room`}
            </Typography>
            {crud === "Update" && (
              <IconButton
                onClick={onClose}
                size="large"
                sx={{ color: "text.secondary" }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            {crud === "Update"
              ? "Update room details."
              : "Fill out the details below to add a new room."}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
          >
            <TextField
              fullWidth
              label="Room Number"
              disabled={crud === "Update"}
              value={room.roomNumber}
              onChange={(e) => handleChange("roomNumber", e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Price Per Night"
              type="number"
              value={room.pricePerNight}
              onChange={(e) =>
                handleChange("pricePerNight", Number(e.target.value))
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

            <FormControl fullWidth>
              <InputLabel id="type-label">Room Type</InputLabel>
              <Select
                labelId="type-label"
                value={room.roomType}
                label="Room Type"
                onChange={(e) =>
                  handleChange("roomType", e.target.value as RoomType)
                }
              >
                {ROOM_TYPES.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <ButtonGroup fullWidth sx={{ mt: 1 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ py: 1.5, borderRadius: "8px 0 0 8px" }}
              >
                {crud}
              </Button>
              {crud === "Update" && (
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={() => setConfirmOpen(true)}
                  sx={{ py: 1.5, borderRadius: "0 8px 8px 0" }}
                >
                  Delete
                </Button>
              )}
            </ButtonGroup>
          </Box>
        </Box>
      </Container>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
          {"Confirm Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete{" "}
            <strong>Room {room.roomNumber}</strong>? This action cannot be
            undone and will remove all associated data.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            autoFocus
          >
            Permanently Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

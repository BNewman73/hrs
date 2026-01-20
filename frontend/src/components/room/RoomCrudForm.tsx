/**
 * RoomCrudForm
 *
 * Admin form used to create, update or delete rooms. Accepts an optional
 * `props` RoomDTO for editing and a `crud` action string.
 */
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch } from "../../shared/store/hooks";
import { showToast } from "../../features/toastSlice";
import {
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} from "../../features/roomApi";
import { RoomType, RoomTypeDisplayNames } from "../../types/enum";

const ROOM_TYPES: RoomType[] = [
  RoomType.SINGLE,
  RoomType.DOUBLE,
  RoomType.DELUXE,
  RoomType.SUITE,
  RoomType.PRESIDENTIAL_SUITE,
  RoomType.ACCESSIBLE,
];

/**
 * RoomCreateForm component
 *
 * Renders the CRUD form. Props: optional `props` (RoomDTO), `crud` action
 * string, and optional `onClose` callback.
 */
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

  const [createRoom, { isLoading: isCreating }] = useCreateRoomMutation();
  const [updateRoom, { isLoading: isUpdating }] = useUpdateRoomMutation();
  const [deleteRoom, { isLoading: isDeleting }] = useDeleteRoomMutation();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [room, setRoom] = useState<RoomDTO>({
    roomNumber: props?.roomNumber || "",
    pricePerNight: props?.pricePerNight || 0,
    images: props?.images || [],
    roomType: props?.roomType || RoomType.SINGLE,
    publicID: props?.publicID || "",
    description: props?.description || "",
  });

  const handleChange = <K extends keyof RoomDTO>(
    field: K,
    value: RoomDTO[K],
  ) => {
    setRoom((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (crud === "Create") {
        await createRoom(room).unwrap();
      } else {
        await updateRoom(room).unwrap();
      }

      dispatch(
        showToast({
          message: `Room ${crud.toLowerCase()}d successfully!`,
          severity: "success",
        }),
      );

      setRoom({
        roomNumber: "",
        roomType: RoomType.SINGLE,
        pricePerNight: 0,
        publicID: "",
        images: [],
        description: "",
      });

      if (onClose) onClose();
    } catch (error: unknown) {
      const message =
        typeof error === "string" ? error : "An unexpected error occurred";

      dispatch(showToast({ message, severity: "error" }));
    }
  };

  const handleConfirmDelete = async () => {
    if (!room.publicID) return;

    try {
      await deleteRoom(room.publicID).unwrap();
      dispatch(
        showToast({ message: "Room deleted successfully", severity: "info" }),
      );
      setConfirmOpen(false);
      if (onClose) onClose();
    } catch {
      dispatch(
        showToast({ message: "Failed to delete room", severity: "error" }),
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
              label="Description"
              type="text"
              value={room.description}
              multiline
              minRows={3}
              maxRows={5}
              onChange={(e) => handleChange("description", e.target.value)}
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
                    .filter(Boolean),
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
                    {RoomTypeDisplayNames[t as RoomType]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isCreating || isUpdating}
                sx={{
                  flex: 1,
                  py: 1.4,
                  borderRadius: 2,
                  fontWeight: 700,
                }}
              >
                {crud}
              </Button>

              {crud === "Update" && (
                <Button
                  type="button"
                  variant="outlined"
                  color="error"
                  size="large"
                  disabled={isDeleting}
                  onClick={() => setConfirmOpen(true)}
                  sx={{
                    px: 3,
                    borderRadius: 2,
                    fontWeight: 700,
                  }}
                >
                  Delete
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Container>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
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
            disabled={isDeleting}
          >
            Permanently Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

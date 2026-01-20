/**
 * RoomDetailsModal
 *
 * Simple modal wrapper that shows `RoomCalendar` for a given room number.
 * Used by result cards to provide an availability/booking flow.
 */
import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import RoomCalendar from "../room/RoomCalendar";

interface RoomDetailsModalProps {
  roomNumber: string;
  capacity?: number;
  pricePerNight: number;
  guests?: number;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  height: 600,
  boxShadow: 24,
  overflow: "autho",
};

/**
 * RoomDetailsModal component
 *
 * Props: `roomNumber`, optional `capacity`, `pricePerNight`, and optional
 * `guests`. Controls its own open state and renders `RoomCalendar`.
 */
const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({
  roomNumber,
  capacity,
  pricePerNight,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        sx={{ whiteSpace: "nowrap" }}
        onClick={handleOpen}
        variant="contained"
        size="small"
      >
        View Availability
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <RoomCalendar
            roomNumber={roomNumber}
            capacity={capacity}
            pricePerNight={pricePerNight}
            isBlock={false}
            onSuccess={handleClose}
          />
        </Box>
      </Modal>
    </>
  );
};

export default RoomDetailsModal;

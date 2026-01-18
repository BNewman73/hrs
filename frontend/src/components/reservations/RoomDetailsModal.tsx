import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import RoomCalendar from "./RoomCalendar";

interface RoomDetailsModalProps {
  roomNumber: string;
  capacity: number;
  pricePerNight: number;
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
          />
        </Box>
      </Modal>
    </>
  );
};

export default RoomDetailsModal;

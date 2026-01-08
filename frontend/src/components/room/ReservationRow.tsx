import {
  Box,
  ListItem,
  Typography,
  Chip,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ReservationRowProps {
  reservation: ReservationDTO;
  isExpanded: boolean;
  onToggle: () => void;
}

export const ReservationRow = ({
  reservation,
  isExpanded,
  onToggle,
}: ReservationRowProps) => {
  const isGuestBooking = reservation.type === "GUEST_BOOKING";

  return (
    <Box sx={{ borderBottom: "1px solid #f5f5f5" }}>
      {/* ===== MAIN ROW ===== */}
      <ListItem
        sx={{
          display: "flex",
          p: 2,
          alignItems: "center",
          bgcolor: isExpanded ? "rgba(25, 118, 210, 0.03)" : "inherit",
        }}
      >
        {/* Room */}
        <Typography sx={{ width: "20%", fontWeight: 700 }}>
          {reservation.roomId}
        </Typography>

        {/* Dates */}
        <Typography sx={{ width: "35%" }}>
          {reservation.startDate} → {reservation.endDate}
        </Typography>

        {/* Type */}
        <Box sx={{ width: "20%" }}>
          <Chip
            label={reservation.type}
            color={isGuestBooking ? "success" : "warning"}
            size="small"
          />
        </Box>

        {/* Price / Block Reason */}
        <Typography sx={{ width: "15%" }}>
          {isGuestBooking
            ? `$${reservation.totalPrice}`
            : reservation.blockReason}
        </Typography>

        {/* Expand */}
        <Box sx={{ width: "10%", textAlign: "center" }}>
          <IconButton
            size="small"
            onClick={onToggle}
            sx={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.3s",
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </ListItem>

      {/* ===== EXPANDED CONTENT ===== */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            p: 3,
            bgcolor: "#fafafa",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Typography
            variant="overline"
            color="primary"
            sx={{ fontWeight: 800 }}
          >
            Reservation Summary
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Room ID: {reservation.roomId}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Date Range: {reservation.startDate} → {reservation.endDate}
          </Typography>

          {isGuestBooking ? (
            <Typography variant="body2" color="text.secondary">
              Total Price: ${reservation.totalPrice}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Block Reason: {reservation.blockReason}
            </Typography>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

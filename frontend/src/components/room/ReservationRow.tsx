import {
  Box,
  ListItem,
  Typography,
  Chip,
  Collapse,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRefundReservationMutation } from "../../features/reservationApi";
import { useState } from "react";
import { showToast } from "../../features/toastSlice";
import { useAppDispatch } from "../../shared/store/hooks";
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
  function formatEnum(content: string): string {
    return content
      .replace("_", " ")
      .replace(/^./, (char) => char.toUpperCase());
  }
  const [postRefund, { isLoading: isRefunding }] =
    useRefundReservationMutation();
  const dispatch = useAppDispatch();
  const handleRefund = async (paymentIntentId: string) => {
    try {
      await postRefund(paymentIntentId).unwrap();

      dispatch(
        showToast({
          message: `Reservation has been canceled successfully!`,
          severity: "success",
        })
      );
    } catch {
      dispatch(
        showToast({
          message: `Error occurred canceling the reservation!`,
          severity: "error",
        })
      );
    }
  };
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  return (
    <>
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
            {formatEnum(reservation.roomId)}
          </Typography>

          {/* Dates */}
          <Typography sx={{ width: "35%" }}>
            {reservation.startDate} → {reservation.endDate}
          </Typography>

          {/* Type */}
          <Box sx={{ width: "20%" }}>
            <Chip
              label={formatEnum(reservation.type)}
              color={isGuestBooking ? "success" : "warning"}
              size="small"
            />
          </Box>

          {/* Price / Block Reason */}
          <Typography
            sx={{ width: "15%" }}
            color={
              reservation.paymentStatus == "refunded"
                ? "error"
                : isGuestBooking
                ? "success"
                : "warning"
            }
          >
            <strong>
              {" "}
              {reservation.paymentStatus == "refunded"
                ? "CANCELED"
                : isGuestBooking
                ? "AVAILABLE"
                : reservation.blockReason}{" "}
            </strong>
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
              Room ID: {formatEnum(reservation.roomId)}
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
            {reservation.paymentStatus != "refunded" && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  onClick={() => setConfirmOpen(true)}
                  sx={{ border: "2px solid", alignSelf: "flex-end" }}
                >
                  {" "}
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        </Collapse>
      </Box>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this reservation. This action cannot
            be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setConfirmOpen(false)} color="inherit">
            Exit
          </Button>
          <Button
            onClick={() => handleRefund(reservation.stripePaymentIntentId)}
            color="error"
            variant="contained"
            autoFocus
            loading={isRefunding}
          >
            Cancel Reservation
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

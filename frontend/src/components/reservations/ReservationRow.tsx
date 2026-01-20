/**
 * ReservationRow
 *
 * Renders a single reservation row with summary information and an
 * expandable detail panel. Includes actions for canceling/refunding a
 * reservation when applicable.
 */
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRefundReservationMutation } from "../../features/reservationApi";
import { useState } from "react";
import { showToast } from "../../features/toastSlice";
import { useAppDispatch } from "../../shared/store/hooks";
import {
  Box,
  ListItem,
  Typography,
  Chip,
  IconButton,
  Collapse,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
} from "@mui/material";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";

interface ReservationRowProps {
  reservation: ReservationWithGuestDTO;
  isExpanded: boolean;
  onToggle: () => void;
}

/**
 * ReservationRow component
 *
 * Presentation + small behavior (refund dialog) for a single reservation
 * entry. Receives `reservation`, `isExpanded` and `onToggle` props.
 */
export const ReservationRow = ({
  reservation,
  isExpanded,
  onToggle,
}: ReservationRowProps) => {
  const r = reservation.reservation;
  const guest = reservation.guest;

  const isGuestBooking = r.type === "GUEST_BOOKING";

  function formatEnum(v?: string) {
    if (!v) return "—";
    return v
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/^./, (c) => c.toUpperCase());
  }

  const formatDate = (dateString: string) => {
    const date = parse(dateString, "yyyy-MM-dd", new Date());
    return format(date, "MMM dd, yyyy");
  };

  const [postRefund, { isLoading }] = useRefundReservationMutation();
  const dispatch = useAppDispatch();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleRefund = async () => {
    try {
      await postRefund(r.stripePaymentIntentId).unwrap();
      dispatch(
        showToast({ message: "Reservation canceled", severity: "success" }),
      );
    } catch {
      dispatch(showToast({ message: "Cancel failed", severity: "error" }));
    } finally {
      setConfirmOpen(false);
    }
  };

  return (
    <Box sx={{ borderBottom: "1px solid #f5f5f5" }}>
      {/* MAIN ROW */}
      <ListItem
        sx={{
          display: "flex",
          p: 2,
          alignItems: "center",
          gap: 1,
          bgcolor: isExpanded ? "rgba(25,118,210,0.03)" : "inherit",
        }}
      >
        <Typography sx={{ width: { xs: "42%", sm: "20%" }, fontWeight: 700 }}>
          {r.roomId}
        </Typography>

        <Typography sx={{ width: "35%", display: { xs: "none", sm: "block" } }}>
          {formatDate(r.startDate)} → {formatDate(r.endDate)}
        </Typography>

        <Box sx={{ width: "20%", display: { xs: "none", sm: "block" } }}>
          <Chip
            label={formatEnum(r.type)}
            color={isGuestBooking ? "success" : "warning"}
            size="small"
          />
        </Box>

        <Typography
          sx={{ width: { xs: "38%", sm: "15%" }, fontWeight: 700 }}
          color={
            r.paymentStatus === "refunded"
              ? "error.main"
              : isGuestBooking
                ? "success.main"
                : "warning.main"
          }
        >
          {r.paymentStatus === "refunded"
            ? "CANCELED"
            : isGuestBooking
              ? "PAID"
              : formatEnum(r.blockReason)}
        </Typography>

        <Box sx={{ width: "10%", textAlign: "right" }}>
          <IconButton onClick={onToggle}>
            <ExpandMoreIcon
              sx={{
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.3s",
              }}
            />
          </IconButton>
        </Box>
      </ListItem>

      {/* EXPANDED SUMMARY */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box sx={{ p: 3, bgcolor: "#fafafa", borderTop: "1px solid #eee" }}>
          <Typography fontWeight={900} letterSpacing={1}>
            RESERVATION SUMMARY
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* GUEST */}
          {guest && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="overline" color="primary">
                Guest
              </Typography>
              <Typography fontWeight={700}>
                {guest.firstName} {guest.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {guest.email}
              </Typography>
            </Box>
          )}

          {/* STAY */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="overline" color="primary">
              Stay Details
            </Typography>
            <Typography>
              Room: <strong>{r.roomId}</strong>
            </Typography>
            <Typography>
              Dates: <strong>{formatDate(r.startDate)}</strong> →{" "}
              <strong>{formatDate(r.endDate)}</strong>
            </Typography>
            <Typography>
              Type: <strong>{formatEnum(r.type)}</strong>
            </Typography>
          </Box>

          {/* PAYMENT / BLOCK */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="overline" color="primary">
              {isGuestBooking ? "Payment" : "Block Information"}
            </Typography>

            {isGuestBooking ? (
              <>
                <Typography>
                  Total Paid: <strong>${r.totalPrice}</strong>
                </Typography>
                <Typography>
                  Status: <strong>{formatEnum(r.paymentStatus)}</strong>
                </Typography>
              </>
            ) : (
              <Typography>
                Reason: <strong>{formatEnum(r.blockReason)}</strong>
              </Typography>
            )}
          </Box>

          {/* ACTION */}
          {r.paymentStatus !== "refunded" && r.stripePaymentIntentId && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                sx={{ border: "2px solid" }}
                onClick={() => setConfirmOpen(true)}
              >
                Cancel Reservation
              </Button>
            </Box>
          )}
        </Box>
      </Collapse>

      {/* CONFIRM DIALOG */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle fontWeight={700}>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This reservation will be permanently canceled and refunded if
            applicable.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Back</Button>
          <Button
            color="error"
            variant="contained"
            disabled={isLoading}
            onClick={handleRefund}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

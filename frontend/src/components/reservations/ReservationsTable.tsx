import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  useGetUpcomingReservationsQuery,
  useGetPastReservationsQuery,
  useGetCurrentReservationsQuery,
} from "../../features/roomApi";
import { getErrorMessage } from "../../features/errorUtils";
import { useRefundReservationMutation } from "../../features/reservationApi";
import { useAppDispatch } from "../../shared/store/hooks";
import { showToast } from "../../features/toastSlice";
import { format, parse } from "date-fns";

const UserReservations: React.FC = () => {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [reservation, setReservation] = useState<ReservationResponseDTO | null>(null)
  const {
    data: upcomingReservations,
    isLoading: upcomingLoading,
    error: upcomingError,
    refetch: refetchUpcoming
  } = useGetUpcomingReservationsQuery();

  const {
    data: pastReservations,
    isLoading: pastLoading,
    error: pastError,
  } = useGetPastReservationsQuery();

  const {
    data: currentReservations,
    isLoading: currentLoading,
    error: currentError
  } = useGetCurrentReservationsQuery();

  const formatDate = (dateString: string) => {
    const date = parse(dateString, "yyyy-MM-dd", new Date());  
    return format(date, "MMM dd, yyyy");
  };

  // Helper function to calculate nights
  const calculateNights = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Render a single reservation table
  const renderReservationTable = (
    reservations: ReservationResponseDTO[] | undefined,
    isLoading: boolean,
    error: any,
    title: string,
    showActions: boolean = false
  ) => {
    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Alert severity="error">
          Error loading {title.toLowerCase()}: {getErrorMessage(error)}
          {/*error?.data?.message || "Something went wrong"*/}
        </Alert>
      );
    }

    if (!reservations || reservations.length === 0) {
      return (
        <Typography variant="h6" color="text.secondary" sx={{ p: 2 }}>
          You have no {title.toLowerCase()}.
        </Typography>
      );
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Room</strong>
              </TableCell>
              <TableCell>
                <strong>Type</strong>
              </TableCell>
              <TableCell>
                <strong>Check-in</strong>
              </TableCell>
              <TableCell>
                <strong>Check-out</strong>
              </TableCell>
              <TableCell>
                <strong>Nights</strong>
              </TableCell>
              <TableCell>
                <strong>Guests</strong>
              </TableCell>
              <TableCell>
                <strong>Total Price</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              {showActions && (
                <TableCell>
                  <strong>Cancel</strong>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.roomNumber}</TableCell>
                <TableCell>{reservation.roomType.replace("_", " ")}</TableCell>
                <TableCell>{formatDate(reservation.startDate)}</TableCell>
                <TableCell>{formatDate(reservation.endDate)}</TableCell>
                <TableCell>
                  {calculateNights(reservation.startDate, reservation.endDate)}
                </TableCell>
                <TableCell>{reservation.guests}</TableCell>
                <TableCell>${reservation.totalPrice}</TableCell>
                <TableCell>
                  <Chip
                    label={reservation.paymentStatus}
                    color={
                      reservation.paymentStatus === "paid"
                        ? "success"
                        : "default"
                    }
                    size="small"
                  />
                </TableCell>
                {showActions && (
                  <TableCell>
                    {reservation.paymentStatus != "refunded" && (
                        <Button
                        variant="outlined"
                        size="small"
                        color="error"
                          onClick={() => {
                            setConfirmOpen(true)
                            setReservation(reservation);
                          }}
                        >
                          Cancel
                        </Button>
                    
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const [postRefund, { isLoading: isRefunding }] =
    useRefundReservationMutation();
  const dispatch = useAppDispatch();
  const handleCancel = async (paymentIntentId: string) => {
    try {
      await postRefund(paymentIntentId).unwrap();
      setConfirmOpen(false);
      setReservation(null);
      refetchUpcoming();

      dispatch(
        showToast({
          message: `Reservation has been canceled successfully!`,
          severity: "success",
        })
      );
    } catch {
      setConfirmOpen(false);
      setReservation(null);
      dispatch(
        showToast({
          message: `Error occurred canceling the reservation!`,
          severity: "error",
        })
      );
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Current Reservations */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Current Reservations ({currentReservations?.length || 0})
        </Typography>
        {renderReservationTable(
          currentReservations,
          currentLoading,
          currentError,
          "Current Reservations",
          false // Show actions for upcoming reservations
        )}
      </Box>

      {/* Upcoming Reservations */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Upcoming Reservations ({upcomingReservations?.length || 0})
        </Typography>
        {renderReservationTable(
          upcomingReservations,
          upcomingLoading,
          upcomingError,
          "Upcoming Reservations",
          true // Show actions for upcoming reservations
        )}
      </Box>

      {/* Past Reservations */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Past Reservations ({pastReservations?.length || 0})
        </Typography>
        {renderReservationTable(
          pastReservations,
          pastLoading,
          pastError,
          "Past Reservations",
          false // No actions for past reservations
        )}
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
            onClick={() => handleCancel(reservation!.stripePaymentIntentId)}
            color="error"
            variant="contained"
            autoFocus
            loading={isRefunding}
          >
            Cancel Reservation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserReservations;

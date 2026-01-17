import React from "react";
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
} from "@mui/material";
import {
  useGetUpcomingReservationsQuery,
  useGetPastReservationsQuery,
} from "../../features/roomApi";
import { getErrorMessage } from "../../features/errorUtils";

const UserReservations: React.FC = () => {
  const {
    data: upcomingReservations,
    isLoading: upcomingLoading,
    error: upcomingError,
  } = useGetUpcomingReservationsQuery();

  const {
    data: pastReservations,
    isLoading: pastLoading,
    error: pastError,
  } = useGetPastReservationsQuery();

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
        <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
          No {title.toLowerCase()} found.
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
                  <strong>Actions</strong>
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
                    <Box display="flex" gap={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleEdit(reservation.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleCancel(reservation.id)}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // Placeholder handlers for actions
  const handleEdit = (reservationId: string) => {
    console.log("Edit reservation:", reservationId);
    // TODO: Implement edit functionality
  };

  const handleCancel = (reservationId: string) => {
    console.log("Cancel reservation:", reservationId);
    // TODO: Implement cancel functionality
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Reservations
      </Typography>

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
    </Box>
  );
};

export default UserReservations;

import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCompleteReservationMutation } from "../../features/roomApi";

const BookingSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [completeReservation, { isLoading, error, data }] =
    useCompleteReservationMutation();
  const [reservationCreated, setReservationCreated] = useState(false);

  useEffect(() => {
    // Create reservation when page loads
    if (sessionId && !reservationCreated) {
      console.log("Creating reservation for session:", sessionId);

      completeReservation(sessionId)
        .unwrap()
        .then((reservation) => {
          console.log("Reservation created:", reservation);
          setReservationCreated(true);
        })
        .catch((err) => {
          console.error("Failed to create reservation:", err);
        });
    }
  }, [sessionId, reservationCreated, completeReservation]);

  // Loading state - creating reservation
  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <CircularProgress size={60} sx={{ mb: 3 }} />
          <Typography variant="h5" gutterBottom>
            Completing Your Reservation...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please wait while we finalize your booking.
          </Typography>
        </Paper>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Box sx={{ mb: 3 }}>
            <ErrorOutline sx={{ fontSize: 80, color: "error.main" }} />
          </Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Reservation Error
          </Typography>
          <Alert severity="error" sx={{ mb: 3 }}>
            There was a problem creating your reservation. Your payment was
            successful, but we encountered an error. Please contact support with
            your transaction ID.
          </Alert>
          {sessionId && (
            <Box sx={{ mb: 3, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Transaction ID: {sessionId}
              </Typography>
            </Box>
          )}
          <Button variant="contained" onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </Paper>
      </Container>
    );
  }

  // Success state
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        {/* Success Icon */}
        <Box sx={{ mb: 3 }}>
          <CheckCircleOutline sx={{ fontSize: 80, color: "success.main" }} />
        </Box>

        {/* Success Message */}
        <Typography variant="h4" component="h1" gutterBottom>
          Booking Confirmed!
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Your payment has been processed successfully and your reservation has
          been confirmed. You will receive a confirmation email shortly.
        </Typography>

        {/* Reservation Details */}
        {data && (
          <Box
            sx={{
              mb: 3,
              p: 3,
              border: 1,
              borderRadius: 2,
              textAlign: "left",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Reservation Details
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Room:</strong> {data.roomId}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Check-in:</strong> {data.startDate}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Check-out:</strong> {data.endDate}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Guests:</strong>{" "}
              {data.numberOfAdults + data.numberOfChildren}
            </Typography>
            <Typography variant="body2">
              <strong>Total:</strong> ${data.totalPrice.toFixed(2)}
            </Typography>
          </Box>
        )}

        {/* Session ID (for support) */}
        {sessionId && (
          <Box sx={{ mb: 3, p: 2, borderRadius: 1, border: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Transaction ID: {sessionId}
            </Typography>
          </Box>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="contained" onClick={() => navigate("/room-types")}>
            Book Another Room
          </Button>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookingSuccess;

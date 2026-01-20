/**
 * BookingCancel
 *
 * Simple confirmation page shown when a booking flow was cancelled before
 * completion. Provides contextual copy and quick actions to retry or browse
 * available rooms.
 *
 * Usage:
 * ```tsx
 * <BookingCancel />
 * ```
 */
import React from "react";
import { Container, Paper, Typography, Box, Button } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

/**
 * BookingCancel component
 *
 * Presentational component that displays a cancellation confirmation UI and
 * navigation actions. No props.
 */
const BookingCancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Box sx={{ mb: 3 }}>
          <CancelOutlined sx={{ fontSize: 80, color: "warning.main" }} />
        </Box>

        <Typography variant="h4" component="h1" gutterBottom>
          Booking Cancelled
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Your booking was not completed. No charges were made to your account.
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          If you experienced any issues or have questions, please contact our
          support team.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Try Again
          </Button>
          <Button variant="outlined" onClick={() => navigate("/types")}>
            Browse Rooms
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookingCancel;

import { Container, Paper, Typography, Box, Button } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";

const BookingSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Box sx={{ mb: 3 }}>
          <CheckCircleOutline sx={{ fontSize: 80, color: "success.main" }} />
        </Box>

        <Typography variant="h4" component="h1" gutterBottom>
          Booking Confirmed!
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Your payment has been processed successfully. You will receive a
          confirmation email shortly.
        </Typography>

        {sessionId && (
          <Box sx={{ mb: 3, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Transaction ID: {sessionId}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="contained" onClick={() => navigate("/types")}>
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

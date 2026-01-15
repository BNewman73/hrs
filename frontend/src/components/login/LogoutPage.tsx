import {
  Box,
  Button,
  CssBaseline,
  Typography,
  Container,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginPageNavBar from "../login/LoginPageNavBar";
import { clearUser } from "../../features/userSlice";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
export default function LogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    window.location.href = `${API_BASE}/logout`;
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />

      {/* App Bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(12px)",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <LoginPageNavBar />
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Container
        maxWidth="sm"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            p: { xs: 3, sm: 5 },
            borderRadius: "20px",
            boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <LogoutIcon
            sx={{
              fontSize: 48,
              color: "error.main",
              mb: 2,
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              letterSpacing: "-0.03em",
              mb: 1,
            }}
          >
            Sign out?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 4,
            }}
          >
            You’ll be logged out of your Storm Hotels dashboard.
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={handleCancel}
              sx={{
                py: 1.5,
                borderRadius: "12px",
                fontWeight: 600,
              }}
            >
              Cancel
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="error"
              size="large"
              onClick={handleLogout}
              sx={{
                py: 1.5,
                borderRadius: "12px",
                fontWeight: 700,
                boxShadow: "0 6px 16px rgba(211,47,47,0.35)",
              }}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

import {
  Box,
  Button,
  CssBaseline,
  Typography,
  Container,
  Paper,
  Stack,
  AppBar,
  Toolbar,
  Fade,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useDispatch, useSelector } from "react-redux";
import { authStart } from "../../features/authSlice";
import type { AppDispatch, RootState } from "../../shared/store/store";

import LoginPageNavBar from "./LoginPageNavBar";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const handleLogin = (provider: "google" | "github") => {
    dispatch(authStart(provider));
    window.location.href = `${API_BASE}/oauth2/authorization/${provider}`;
  };

  return (
    <Fade in unmountOnExit timeout={1000}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f4f6f8",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CssBaseline />

        {/*App Bar*/}
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

        {/*Content*/}
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
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                letterSpacing: "-0.03em",
                mb: 1,
              }}
            >
              Welcome
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                mb: 4,
              }}
            >
              Sign in to manage your hotel inventory and rooms.
            </Typography>

            <Stack spacing={2}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                startIcon={<GoogleIcon />}
                disabled={isLoading}
                onClick={() => handleLogin("google")}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: "12px",
                  boxShadow: "0 6px 16px rgba(25,118,210,0.3)",
                }}
              >
                Continue with Google
              </Button>

              <Button
                fullWidth
                size="large"
                variant="outlined"
                startIcon={<GitHubIcon />}
                disabled={isLoading}
                onClick={() => handleLogin("github")}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: "12px",
                }}
              >
                Continue with GitHub
              </Button>
            </Stack>
          </Paper>
        </Container>

        {/*Footer*/}
        <Box sx={{ py: 2, textAlign: "center" }}>
          <Typography variant="caption" color="text.secondary">
            {/**/}
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
}

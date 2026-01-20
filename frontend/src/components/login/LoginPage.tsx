/**
 * LoginPage
 *
 * Public sign-in page offering OAuth providers. Redirects the browser to the
 * backend authorization endpoints for the selected provider.
 */
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
import NavBar from "../NavBar";
import { usePageTitle } from "../../hooks/usePageTitle";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

/**
 * LoginPage component
 *
 * No props. Provides buttons to begin OAuth flows and displays a simple
 * centered card UI.
 */
export default function LoginPage() {
  usePageTitle("Sign In");
  const handleLogin = (provider: "google" | "github") => {
    window.location.href = `${API_BASE}/oauth2/authorization/${provider}`;
  };

  return (
    <Fade in unmountOnExit timeout={1000}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CssBaseline />

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
            <NavBar variant="light" showHomeButton={true} />
          </Toolbar>
        </AppBar>

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
            <Typography variant="h4" fontWeight={800} mb={1}>
              Welcome Back
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={4}>
              Sign in to continue to the Storm Stay Dashboard.
            </Typography>

            <Stack spacing={2}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                startIcon={<GoogleIcon />}
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

        {/* Footer */}
        <Box sx={{ py: 2, textAlign: "center" }}>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Storm Stay. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
}

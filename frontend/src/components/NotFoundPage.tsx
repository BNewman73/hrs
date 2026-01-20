import { Box, Button, Container, Typography, alpha } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

export default function NotFoundPage() {
  usePageTitle("Not Found");
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0A0E27",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,107,53,0.25), rgba(10,14,39,0.95))",
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            width: 64,
            height: 64,
            mx: "auto",
            mb: 4,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src="/stormstay-icon-192.png"
            alt="Storm Stay"
            sx={{
              width: 60,
              height: 60,
              mr: 1,

              borderRadius: "30px",
            }}
          ></Box>
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "5rem", sm: "6rem" },
            lineHeight: 1,
            mb: 2,
            background:
              "linear-gradient(135deg,#ffffff 0%,#FF9A5A 60%,#FF6B35 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 800,
            mb: 1,
          }}
        >
          This Suite Doesn’t Exist
        </Typography>

        <Typography
          sx={{
            color: alpha("#fff", 0.7),
            mb: 5,
            maxWidth: 420,
            mx: "auto",
          }}
        >
          The page you’re looking for isn’t part of our destination. Let’s guide
          you back to something exceptional.
        </Typography>

        <Button
          onClick={() => navigate("/")}
          sx={{
            px: 5,
            py: 1.6,
            borderRadius: 999,
            background: "linear-gradient(135deg,#FF6B35 0%,#F7931E 100%)",
            color: "white",
            fontWeight: 700,
            textTransform: "none",
            boxShadow: "0 12px 30px rgba(255,107,53,0.35)",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: "0 16px 40px rgba(255,107,53,0.5)",
            },
            transition: "all 0.25s ease",
          }}
        >
          Return Home
        </Button>
      </Container>
    </Box>
  );
}

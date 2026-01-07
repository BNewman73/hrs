import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RoomAvailability from "../reservations/RoomAvailability";
import { useNavigate } from "react-router-dom";

const VIDEO_URL = import.meta.env.VITE_HOME_VIDEO_URL;
export default function HomePage() {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route);
  };
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "rgba(14,16,61,0.55)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 64, sm: 72, md: 80 },
          }}
        >
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{
              color: "white",
              mr: 2,
              "&:hover": { color: "#FF8533" },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Button
            onClick={() => handleNavigation("/home")}
            sx={{
              color: "white",
              fontWeight: 700,
              fontSize: "1rem",
              textTransform: "none",
              "&:hover": { color: "#FF8533", background: "transparent" },
            }}
          >
            Home
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            onClick={() => handleNavigation("/login")}
            sx={{
              color: "white",
              fontWeight: 700,
              fontSize: "1rem",
              textTransform: "none",
              px: 3,
              py: 1,
              borderRadius: "999px",
              border: "2px solid #FF8533",
              background:
                "linear-gradient(135deg, rgba(255,133,51,0.15), rgba(255,133,51,0.05))",
              "&:hover": {
                background: "#FF8533",
                color: "#0E103D",
              },
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ bgcolor: "#0E103D", minHeight: "100vh", overflow: "hidden" }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            minHeight: "100vh",
            pt: { xs: "64px", sm: "72px", md: "80px" },
            display: "flex",
            alignItems: "center",
            clipPath: "ellipse(120% 100% at 50% 0%)",
            justifyContent: "center",
          }}
        >
          <Box
            component="video"
            autoPlay
            muted
            loop
            playsInline
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          >
            <source src={`${VIDEO_URL}`} type="video/mp4" />
          </Box>

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle, rgba(14,16,61,0.35) 0%, rgba(14,16,61,0.9) 100%)",
              zIndex: 1,
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              width: "100%",
              px: 2,
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "#FF8533",
                letterSpacing: 6,
                fontWeight: 700,
                fontSize: "1.1rem",
              }}
            >
              Welcome to the future of luxury
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "3.5rem", md: "5.5rem" },
                fontWeight: 900,
                color: "white",
                lineHeight: 1,
                mb: 6,
                textShadow: "0px 10px 30px rgba(0,0,0,0.6)",
              }}
            >
              STORM <span style={{ color: "#FF8533" }}>STAY</span>
            </Typography>

            <Box
              sx={{
                maxWidth: "1100px",
                margin: "0 auto",

                "& .MuiPaper-root": {
                  bgcolor: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
                  borderRadius: "22px",
                  p: 4,
                },

                "& .MuiTypography-h4": { display: "none" },

                /* INPUT BACKGROUND */
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#FFFFFF",
                  borderRadius: "14px",
                  fontWeight: 600,

                  "& fieldset": {
                    borderColor: "#0E103D",
                    borderWidth: 2,
                  },

                  "&:hover fieldset": {
                    borderColor: "#FF8533",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#9F2042",
                    borderWidth: 2,
                  },
                },

                "& .MuiInputBase-input": {
                  color: "#0E103D",
                  fontSize: "1.05rem",
                },

                /* LABEL */
                "& .MuiInputLabel-root": {
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  backgroundColor: "rgba(14,16,61,0.9)",
                  padding: "2px 10px",
                  borderRadius: "8px",
                  transform: "translate(14px, -10px) scale(1)",
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  backgroundColor: "#9F2042",
                  color: "#FFFFFF",
                },

                /* BUTTON */
                "& .MuiButton-root": {
                  bgcolor: "#9F2042",
                  height: "56px",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  borderRadius: "14px",
                  "&:hover": { bgcolor: "#FF8533" },
                },
              }}
            >
              <RoomAvailability />
            </Box>
          </Box>
        </Box>
        <Box
          component="section"
          sx={{
            height: "100vh",
            backgroundColor: "#FFFF",
            clipPath: "ellipse(130% 100% at 15% 100%)",
          }}
        ></Box>
        <Box
          component="footer"
          sx={{
            bgcolor: "#090A2E",
            color: "white",
            py: 4,
            textAlign: "center",
          }}
        >
          <Typography fontWeight={700}>STORM STAY</Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © 2026 Storm Stay Luxury Group. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
}

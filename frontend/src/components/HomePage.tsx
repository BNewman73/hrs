import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Container,
  alpha,
  Paper,
  Slide,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShieldIcon from "@mui/icons-material/Shield";
import LanguageIcon from "@mui/icons-material/Language";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import "./StormButton.css";
import RoomTypesCarousel from "./reservations/RoomTypesCarousel";
import FooterPage from "./FooterPage";

import { useAppDispatch, useAppSelector } from "../shared/store/hooks";
import { useLogoutMutation } from "../features/userApi";
import { clearUser } from "../features/userSlice";

const VIDEO_URL = import.meta.env.VITE_HOME_VIDEO_URL;

export default function HomePage() {
  const navigate = useNavigate();
  const nextSectionRef = useRef<HTMLDivElement | null>(null);
  const [storm, setStorm] = useState(false);

  const user = useAppSelector((s) => s.user.user);
  console.log(user);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } finally {
      dispatch(clearUser());
      navigate("/");
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleStormNav = () => {
    setStorm(true);
    setTimeout(() => navigate("/types"), 320);
  };
  const options = [
    { title: "Dashboard", action: () => navigate("/dashboard") },
    { title: "Reservations", action: () => navigate("/user-home") },
    { title: "Rewards", action: () => {} },
    { title: "Logout", action: handleLogout },
  ];

  const experiences = [
    {
      icon: <ShieldIcon sx={{ fontSize: 40 }} />,
      title: "Contactless Check-in",
      desc: "Arrive on your terms, depart with ease.",
    },
    {
      icon: <LanguageIcon sx={{ fontSize: 40 }} />,
      title: "Worldwide Locations",
      desc: "Curated destinations across the globe.",
    },
    {
      icon: <StarIcon sx={{ fontSize: 40 }} />,
      title: "24/7 Concierge",
      desc: "Always attentive. Always available.",
    },
  ];

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{ background: "transparent" }}>
        <Toolbar sx={{ minHeight: { xs: 64, md: 80 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#FF6B35 0%,#F7931E 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AutoAwesomeIcon sx={{ color: "white" }} />
            </Box>
            <Typography fontWeight={900} letterSpacing={1} color="white">
              STORM STAY
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <Box>
              <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "white", paddingRight: "10px" }}
                >
                  Hello, {user.firstName}
                </Typography>

                <Avatar
                  alt={user.firstName}
                  src={user.avatarUrl}
                  sx={{ bgcolor: "primary.main" }}
                ></Avatar>
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {options.map((option, index) =>
                  option.title !== "Dashboard" && user.role !== "ADMIN" ? (
                    <></>
                  ) : (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        handleCloseUserMenu();
                        option.action();
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {option.title}
                      </Typography>
                    </MenuItem>
                  ),
                )}
              </Menu>
            </Box>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              sx={{
                color: "white",
                px: 4,
                py: 1.5,
                borderRadius: 999,
                background: "linear-gradient(135deg,#FF6B35 0%,#F7931E 100%)",
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <Toolbar></Toolbar>
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
          }}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </Box>

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 40%, rgba(255,107,53,0.2), rgba(14,16,61,0.95))",
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 2,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Slide
            in={!storm}
            direction={`${storm ? "left" : "down"}`}
            mountOnEnter
            unmountOnExit
            timeout={Number(`${storm ? 1500 : 1000}`)}
          >
            <Box>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: "4rem", md: "5rem", lg: "6.5rem" },
                  fontWeight: 900,
                  lineHeight: 1,
                  mb: 3,
                  background: `
                    linear-gradient(
                      135deg,
                      #ffffff 0%,
                      #ffffff 35%,
                      #FF9A5A 55%,
                      #FF6B35 75%,
                      #F7931E 100%
                    )
                  `,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: `
                    0 2px 10px rgba(255,255,255,0.15),
                    0 20px 60px rgba(255,107,53,0.25)
                  `,
                }}
              >
                Welcome To The Future Of
                <br />
                Luxury
              </Typography>

              <Typography
                sx={{
                  color: alpha("#fff", 0.8),
                  maxWidth: 820,
                  mx: "auto",
                  mb: 8,
                  fontSize: "1.3rem",
                }}
              >
                Thoughtfully designed stays blending modern technology with
                timeless comfort.
              </Typography>

              <button
                className="storm-btn"
                disabled={storm}
                onClick={handleStormNav}
              >
                Secure Your Suite
              </button>
            </Box>
          </Slide>

          <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
            <IconButton
              onClick={() =>
                nextSectionRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              sx={{
                color: alpha("#fff", 0.4),
                animation: "bounce 2s ease-in-out infinite",
                "&:hover": {
                  color: "#FF6B35",
                  transform: "translateY(4px)",
                },
                transition: "all 0.3s ease",
                "@keyframes bounce": {
                  "0%, 100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-10px)" },
                },
              }}
            >
              <KeyboardArrowDownIcon sx={{ fontSize: 48 }} />
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* SUITES */}
      <Box ref={nextSectionRef} sx={{ bgcolor: "#0F1229", py: 16 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: 900,
              mb: 8,
              textAlign: "center",
            }}
          >
            Room Options
          </Typography>
          <RoomTypesCarousel />
        </Container>
      </Box>

      {/* EXPERIENCE */}
      <Box sx={{ py: 16, bgcolor: "#0A0E27" }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" },
              gap: 6,
            }}
          >
            {experiences.map((exp) => (
              <Paper
                key={exp.title}
                sx={{
                  p: 6,
                  textAlign: "center",
                  bgcolor: alpha("#fff", 0.04),
                  borderRadius: 4,
                }}
              >
                <Box sx={{ color: "#FF6B35", mb: 3 }}>{exp.icon}</Box>
                <Typography variant="h5" color="white" fontWeight={800} mb={2}>
                  {exp.title}
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.6) }}>
                  {exp.desc}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>
      {/* ABOUT US SECTION */}
      <Box
        sx={{
          bgcolor: "#0A0E27",
          py: { xs: 10, md: 16 },
          borderBottom: `1px solid ${alpha("#fff", 0.05)}`,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* Left Side: Visual/Image */}
            <Box sx={{ flex: 1, position: "relative" }}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: `0 20px 40px ${alpha("#000", 0.4)}`,
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom right, rgba(255,107,53,0.2), transparent)",
                  },
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
                  alt="Storm Stay Luxury Interior"
                  style={{ width: "100%", display: "block" }}
                />
              </Box>
              {/* Floating Stat Card */}
              <Paper
                sx={{
                  position: "absolute",
                  bottom: -20,
                  right: -20,
                  p: 3,
                  bgcolor: "#FF6B35",
                  color: "white",
                  borderRadius: 2,
                  display: { xs: "none", sm: "block" },
                }}
              >
                <Typography variant="h4" fontWeight={900}>
                  15+
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  Global Awards
                </Typography>
              </Paper>
            </Box>

            {/* Right Side: Content */}
            <Box sx={{ flex: 1.2 }}>
              <Typography
                variant="overline"
                sx={{ color: "#FF6B35", fontWeight: 700, letterSpacing: 3 }}
              >
                The Storm Stay Philosophy
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  color: "white",
                  fontWeight: 900,
                  mt: 2,
                  mb: 4,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  lineHeight: 1.1,
                }}
              >
                Redefining the <br />
                <span style={{ color: alpha("#fff", 0.7) }}>
                  Modern Sanctuary
                </span>
              </Typography>
              <Typography
                sx={{
                  color: alpha("#fff", 0.7),
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  mb: 4,
                }}
              >
                Founded on the principle that luxury should be as dynamic as the
                world we live in, Storm Stay creates immersive environments for
                the modern traveler. We blend cutting-edge automation with the
                warmth of traditional hospitality to ensure your stay isn't just
                a visit, it's an experience.
              </Typography>

              <Box sx={{ display: "flex", gap: 4 }}>
                <Box>
                  <Typography variant="h6" color="white" fontWeight={800}>
                    Vision
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: alpha("#fff", 0.5) }}
                  >
                    To pioneer the next generation of smart-living hospitality.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" color="white" fontWeight={800}>
                    Mission
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: alpha("#fff", 0.5) }}
                  >
                    Seamless service powered by tech, perfected by humans.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <FooterPage />
    </>
  );
}

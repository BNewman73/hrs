import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Container,
  // Card,
  // CardContent,
  // CardMedia,
  // Chip,
  alpha,
  Paper,
  Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShieldIcon from "@mui/icons-material/Shield";
import LanguageIcon from "@mui/icons-material/Language";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import "./StormButton.css";
import RoomTypesCarousel from "./reservations/RoomTypesCarousel";

const VIDEO_URL = import.meta.env.VITE_HOME_VIDEO_URL;

export default function HomePage() {
  const navigate = useNavigate();
  const nextSectionRef = useRef<HTMLDivElement | null>(null);
  const [storm, setStorm] = useState(false);

  const handleStormNav = () => {
    setStorm(true);
    setTimeout(() => navigate("/types"), 320);
  };

  // const suites = [
  //   {
  //     name: "Cloud Suite",
  //     price: 450,
  //     image:
  //       "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
  //     features: ["City View", "King Bed", "45 m²"],
  //   },
  //   {
  //     name: "Storm Suite",
  //     price: 680,
  //     image:
  //       "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
  //     features: ["Ocean View", "Premium", "65 m²"],
  //   },
  //   {
  //     name: "Aurora Penthouse",
  //     price: 1200,
  //     image:
  //       "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&q=80",
  //     features: ["360° View", "Private Terrace", "120 m²"],
  //   },
  // ];

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

          <IconButton sx={{ color: "white", ml: 2 }}>
            <MenuIcon />
          </IconButton>
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
      <Box
        color="primary.main"
        ref={nextSectionRef}
        sx={{ backgroundColor: "#0F1229", py: 16 }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 8,
              textAlign: "center",
            }}
          >
            Our Room Options
          </Typography>
          <RoomTypesCarousel />
          {/* <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" },
              gap: 4,
            }}
          >
            {suites.map((suite) => (
              <Card
                key={suite.name}
                sx={{
                  bgcolor: alpha("#fff", 0.05),
                  borderRadius: 4,
                  overflow: "hidden",
                  backdropFilter: "blur(20px)",
                }}
              >
                <CardMedia component="img" image={suite.image} height="260" />
                <CardContent>
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    color="white"
                    mb={1}
                  >
                    {suite.name}
                  </Typography>

                  <Typography sx={{ color: alpha("#fff", 0.6), mb: 2 }}>
                    ${suite.price}/night
                  </Typography>

                  <Box
                    sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}
                  >
                    {suite.features.map((f) => (
                      <Chip
                        key={f}
                        label={f}
                        size="small"
                        sx={{
                          bgcolor: alpha("#FF6B35", 0.15),
                          color: "#FF6B35",
                        }}
                      />
                    ))}
                  </Box>

                  <Button
                    fullWidth
                    onClick={handleStormNav}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      color: "white",
                      fontWeight: 700,
                      borderRadius: 2,
                      border: `1px solid ${alpha("#fff", 0.2)}`,
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box> */}
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

      {/* FOOTER */}
      <Box sx={{ bgcolor: "#090A2E", py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            align="center"
            sx={{ color: alpha("#fff", 0.6), fontWeight: 500 }}
          >
            © 2026 Storm Stay Luxury Group. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
}

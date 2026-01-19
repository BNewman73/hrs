import {
  Box,
  Toolbar,
  Typography,
  Container,
  alpha,
  Paper,
  Slide,
} from "@mui/material";

import ShieldIcon from "@mui/icons-material/Shield";
import LanguageIcon from "@mui/icons-material/Language";
import StarIcon from "@mui/icons-material/Star";
import { useRef } from "react";
import "./StormButton.css";
import RoomTypesCarousel from "./reservations/RoomTypesCarousel";
import FooterPage from "./FooterPage";

import NavBar from "./NavBar";

const VIDEO_URL = import.meta.env.VITE_HOME_VIDEO_URL;

const experiences = [
  {
    icon: <ShieldIcon sx={{ fontSize: 40 }} />,
    title: "Contactless Check-in",
    desc: "Arrive on your terms, depart with ease.",
  },
  {
    icon: <LanguageIcon sx={{ fontSize: 40 }} />,
    title: "Exclusive Destination",
    desc: "One iconic location, crafted for unforgettable stays.",
  },
  {
    icon: <StarIcon sx={{ fontSize: 40 }} />,
    title: "24/7 Concierge",
    desc: "Always attentive. Always available.",
  },
];

export default function HomePage() {
  const nextSectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <NavBar variant="dark" />

      <Box sx={{ minHeight: "100vh", position: "relative" }}>
        <Toolbar />
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
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
          <Slide in direction="down" mountOnEnter unmountOnExit timeout={1000}>
            <Box>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: "4rem", md: "5rem", lg: "6.5rem" },
                  fontWeight: 900,
                  lineHeight: { xs: 1.1, md: 1 },
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
                onClick={() =>
                  nextSectionRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
              >
                Secure Your Suite
              </button>
            </Box>
          </Slide>
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
      <Box ref={nextSectionRef} sx={{ bgcolor: "#0F1229", py: 16 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{ color: "white", fontWeight: 900, mb: 8, textAlign: "center" }}
          >
            Room Options
          </Typography>
          <RoomTypesCarousel />
        </Container>
      </Box>

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
                  transition: "0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    background: alpha("#fff", 0.06),
                  },
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

      <FooterPage />
    </>
  );
}

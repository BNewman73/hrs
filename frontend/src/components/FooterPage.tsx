import { Box, Container, Typography, alpha, Divider } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function FooterPage() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#090A2E",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(255,107,53,0.12), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          py: { xs: 6, md: 8 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr 1fr" },
            gap: { xs: 4, md: 6 },
            alignItems: "start",
          }}
        >
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 2 }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#FF6B35 0%,#F7931E 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AutoAwesomeIcon sx={{ color: "white", fontSize: 20 }} />
              </Box>
              <Typography
                sx={{
                  color: "white",
                  fontWeight: 900,
                  letterSpacing: 1,
                }}
              >
                STORM STAY
              </Typography>
            </Box>

            <Typography
              sx={{
                color: alpha("#fff", 0.65),
                lineHeight: 1.7,
                maxWidth: 360,
              }}
            >
              A new standard of intelligent luxury hospitality, blending
              technology, comfort, and timeless design.
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                color: "white",
                fontWeight: 800,
                mb: 2,
                letterSpacing: 0.5,
              }}
            >
              Experience
            </Typography>
            <Typography sx={{ color: alpha("#fff", 0.6), mb: 1 }}>
              Smart Suites
            </Typography>
            <Typography sx={{ color: alpha("#fff", 0.6), mb: 1 }}>
              Global Locations
            </Typography>
            <Typography sx={{ color: alpha("#fff", 0.6) }}>
              Concierge Services
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                color: "white",
                fontWeight: 800,
                mb: 2,
                letterSpacing: 0.5,
              }}
            >
              Company
            </Typography>
            <Typography sx={{ color: alpha("#fff", 0.6), mb: 1 }}>
              About Storm Stay
            </Typography>
            <Typography sx={{ color: alpha("#fff", 0.6), mb: 1 }}>
              Privacy & Security
            </Typography>
            <Typography sx={{ color: alpha("#fff", 0.6) }}>
              Terms of Service
            </Typography>
          </Box>
        </Box>

        <Divider
          sx={{
            my: 5,
            borderColor: alpha("#fff", 0.08),
          }}
        />

        <Typography
          align="center"
          sx={{
            color: alpha("#fff", 0.45),
            fontSize: "0.85rem",
            letterSpacing: 0.4,
          }}
        >
          © {new Date().getFullYear()} Storm Stay Hotel. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

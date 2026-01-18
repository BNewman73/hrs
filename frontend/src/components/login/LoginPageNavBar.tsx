import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function LoginPageNavBar() {
  const handleNavigation = useNavigate();
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="img"
              src="../public/stormstay-icon-192.png"
              alt="Storm Stay"
              sx={{
                width: 55,
                height: 55,
                mr: 1,

                borderRadius: "30px",
              }}
            ></Box>
            <Typography
              variant="h6"
              color="black"
              sx={{ fontWeight: 900, letterSpacing: -1 }}
            >
              STORM STAY
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            onClick={() => handleNavigation("/home")}
            sx={{
              color: "black",
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
            Home
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

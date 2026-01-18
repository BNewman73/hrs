import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";

export default function LogoutPageNavBar() {
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
            <HotelIcon color="primary" />
            <Typography
              variant="h6"
              color="black"
              sx={{ fontWeight: 900, letterSpacing: -1 }}
            >
              STORM STAY
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </>
  );
}

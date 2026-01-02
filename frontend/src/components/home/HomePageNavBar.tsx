import { Box, Typography } from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";

export default function HomePageNavBar() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <HotelIcon color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: -1 }}>
          STORM STAY
        </Typography>
      </Box>

      <Box />
    </Box>
  );
}
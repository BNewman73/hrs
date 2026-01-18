import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

import HotelIcon from "@mui/icons-material/Hotel";
import type { User } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

export default function NavBar({ user }: { user: User }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
        onClick={() => navigate("/")}
      >
        <HotelIcon color="primary" />
        <Typography
          variant="h6"
          sx={{ fontWeight: 900, letterSpacing: -1, color: "black" }}
        >
          STORM STAY
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ display: { xs: "none", md: "block" }, textAlign: "right" }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "black" }}>
            Hello {user.firstName}!
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user.email}
          </Typography>
        </Box>

        <IconButton sx={{ p: 0 }}>
          <Avatar
            alt={user.firstName}
            src={user.avatarUrl}
            sx={{ bgcolor: "primary.main" }}
          >
            {user.firstName[0]}
          </Avatar>
        </IconButton>
      </Box>
    </Box>
  );
}

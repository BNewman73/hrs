import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import HotelIcon from "@mui/icons-material/Hotel";
import type { User } from "../features/userSlice";

export default function NavBar({ user }: { user: User }) {

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

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ display: { xs: "none", md: "block" }, textAlign: "right" }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
        <Tooltip title="Account Settings">
          <IconButton sx={{ p: 0 }}>
            <Avatar
              alt={user.firstName}
              src={user.avatarUrl}
              imgProps={{ referrerPolicy: "no-referrer" }}
              sx={{ bgcolor: "primary.main" }}
            >
              {user.firstName[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
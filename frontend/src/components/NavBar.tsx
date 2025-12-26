import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import HotelIcon from "@mui/icons-material/Hotel";

interface NavBarProps {
  user: {
    id?: number;
    name: string;
    email: string;
  };
}

export default function NavBar({ user }: NavBarProps) {
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
            {user.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
        <Tooltip title="Account Settings">
          <IconButton sx={{ p: 0 }}>
            <Avatar alt={user.name} sx={{ bgcolor: "primary.main" }}>
              {user.name[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

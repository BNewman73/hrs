import {
  Box,
  ListItem,
  Typography,
  IconButton,
  Avatar,
  Collapse,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface UserRowProps {
  user: UserDTO;
  gridConfig: {
    name: { xs: string; sm: string };
    email: string;
    role: string;
    actions: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
}

export function UserRow({
  user,
  gridConfig,
  isExpanded,
  onToggle,
  onEdit,
}: UserRowProps) {
  return (
    <Box sx={{ borderBottom: "1px solid #f5f5f5" }}>
      <ListItem
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          gap: 1,
          bgcolor: isExpanded ? "rgba(25,118,210,0.03)" : "inherit",
        }}
      >
        {/* NAME + AVATAR */}
        <Box
          sx={{
            width: gridConfig.name,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            minWidth: 0,
          }}
        >
          <Avatar
            src={user.avatarUrl}
            alt={user.firstName}
            sx={{ width: 36, height: 36 }}
          />
          <Typography
            sx={{
              fontWeight: 700,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {user.firstName} {user.lastName}
          </Typography>
        </Box>

        {/* EMAIL */}
        <Typography
          sx={{
            width: gridConfig.email,
            display: { xs: "none", sm: "block" },
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "text.secondary",
          }}
        >
          {user.email || "N/A"}
        </Typography>

        {/* ROLE */}
        <Typography
          sx={{
            width: gridConfig.role,
            display: { xs: "none", sm: "block" },
            fontWeight: 600,
            color: "primary.main",
          }}
        >
          {user.role}
        </Typography>

        {/* ACTIONS */}
        <Box
          sx={{
            width: gridConfig.actions,
            display: "flex",
            justifyContent: "center",
            gap: 0.5,
          }}
        >
          <IconButton size="small" onClick={onEdit} color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={onToggle}
            sx={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.3s",
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </ListItem>

      {/* EXPANDED CONTENT */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            p: 3,
            bgcolor: "#fafafa",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Typography variant="overline" color="primary" fontWeight={800}>
            User Details
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Email: {user.email || "N/A"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Role: {user.role}
          </Typography>

          {user.provider && (
            <Typography variant="body2" color="text.secondary">
              Provider: {user.provider}
            </Typography>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}

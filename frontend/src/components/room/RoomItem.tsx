import {
  Box,
  ListItem,
  Typography,
  Chip,
  IconButton,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";

interface GridConfig {
  roomNo: { xs: string; sm: string };
  price: { xs: string; sm: string };
  category: string;
  actions: string;
}

interface RoomItemProps {
  room: Room;
  gridConfig: GridConfig;
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
}

export const RoomItem = ({
  room,
  gridConfig,
  isExpanded,
  onToggle,
  onEdit,
}: RoomItemProps) => (
  <Box sx={{ borderBottom: "1px solid #f5f5f5" }}>
    <ListItem
      sx={{
        display: "flex",
        p: 2,
        alignItems: "center",
        bgcolor: isExpanded ? "rgba(25, 118, 210, 0.02)" : "inherit",
      }}
    >
      <Typography sx={{ width: gridConfig.roomNo, fontWeight: 700 }}>
        {room.roomNumber}
      </Typography>

      <Typography
        sx={{ width: gridConfig.price, fontWeight: 600, color: "success.main" }}
      >
        ${room.pricePerNight}
      </Typography>

      <Box
        sx={{
          width: gridConfig.category,
          display: { xs: "none", sm: "block" },
        }}
      >
        <Chip
          label={room.roomDetails.type}
          size="small"
          color="primary"
          variant="outlined"
          sx={{ fontWeight: 600, fontSize: "0.7rem" }}
        />
      </Box>

      <Box
        sx={{
          width: gridConfig.actions,
          display: "flex",
          justifyContent: "center",
          gap: 1,
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

    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
      <Box sx={{ p: 3, bgcolor: "#fafafa", borderTop: "1px solid #f0f0f0" }}>
        <Typography
          variant="overline"
          color="primary"
          sx={{ fontWeight: 900, display: "block" }}
        >
          Description
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          {room.roomDetails.description}
        </Typography>

        <Typography
          variant="overline"
          color="primary"
          sx={{ fontWeight: 900, display: "block" }}
        >
          Tech
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
          {room.roomDetails.tech.map((a: string) => (
            <Chip
              key={a}
              label={a}
              size="small"
              variant="filled"
              sx={{ bgcolor: "white", border: "1px solid #ddd" }}
            />
          ))}
        </Box>
        <Typography
          variant="overline"
          color="primary"
          sx={{ fontWeight: 900, display: "block" }}
        >
          Comfort
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
          {room.roomDetails.comfort.map((a: string) => (
            <Chip
              key={a}
              label={a}
              size="small"
              variant="filled"
              sx={{ bgcolor: "white", border: "1px solid #ddd" }}
            />
          ))}
        </Box>
        <Typography
          variant="overline"
          color="primary"
          sx={{ fontWeight: 900, display: "block" }}
        >
          Provisions
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
          {room.roomDetails.provisions.map((a: string) => (
            <Chip
              key={a}
              label={a}
              size="small"
              variant="filled"
              sx={{ bgcolor: "white", border: "1px solid #ddd" }}
            />
          ))}
        </Box>
        <Typography
          variant="overline"
          color="primary"
          sx={{ fontWeight: 900, display: "block" }}
        >
          Miscellaneous
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
          {room.roomDetails.miscellaneous.map((a: string) => (
            <Chip
              key={a}
              label={a}
              size="small"
              variant="filled"
              sx={{ bgcolor: "white", border: "1px solid #ddd" }}
            />
          ))}
        </Box>
      </Box>
    </Collapse>
  </Box>
);

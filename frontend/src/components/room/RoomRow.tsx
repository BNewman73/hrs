/**
 * RoomRow
 *
 * Renders a single row for the admin room table, including an expandable
 * detail section that lists amenities and other metadata. Provides edit and
 * expand actions via callbacks.
 */
import {
  Box,
  ListItem,
  Typography,
  Chip,
  IconButton,
  Collapse,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import {
  Comfort,
  ComfortDisplayNames,
  Miscellaneous,
  MiscellaneousDisplayNames,
  Provisions,
  ProvisionsDisplayNames,
  RoomTypeDisplayNames,
  Tech,
  TechDisplayNames,
  type RoomType,
} from "../../types/enum";

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

/**
 * RoomRow component
 *
 * Props: `room`, `gridConfig`, `isExpanded`, `onToggle`, `onEdit`.
 */
export const RoomRow = ({
  room,
  gridConfig,
  isExpanded,
  onToggle,
  onEdit,
}: RoomItemProps) => (
  <Box sx={{ borderBottom: "1px solid #f0f0f0" }}>
    {/* MAIN ROW */}
    <ListItem
      sx={{
        display: "flex",
        p: 2,
        alignItems: "center",
        bgcolor: isExpanded ? "rgba(25,118,210,0.03)" : "inherit",
      }}
    >
      <Typography sx={{ width: gridConfig.roomNo, fontWeight: 700 }}>
        Room {room.roomNumber}
      </Typography>

      <Typography
        sx={{
          width: gridConfig.price,
          fontWeight: 700,
          color: "success.main",
        }}
      >
        ${room.pricePerNight} / night
      </Typography>

      <Box
        sx={{
          width: gridConfig.category,
          display: { xs: "none", sm: "block" },
        }}
      >
        <Chip
          label={RoomTypeDisplayNames[room.roomDetails.type as RoomType]}
          size="small"
          color="primary"
          variant="outlined"
          sx={{
            fontWeight: 700,
            fontSize: "0.7rem",
            letterSpacing: 0.4,
          }}
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

    {/* EXPANDED DETAILS */}
    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
      <Box sx={{ p: 3, bgcolor: "#fafafa", borderTop: "1px solid #eee" }}>
        <Typography fontWeight={900} letterSpacing={1}>
          ROOM DETAILS
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* DESCRIPTION */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" color="primary">
            Description
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {room.roomDetails.description}
          </Typography>
        </Box>

        {/* TECH */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" color="primary">
            Tech & Connectivity
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {room.roomDetails.tech?.map((a: string) => (
              <Chip
                key={a}
                label={TechDisplayNames[a as Tech]}
                size="small"
                sx={{
                  bgcolor: "white",
                  border: "1px solid #ddd",
                  fontWeight: 600,
                }}
              />
            ))}
          </Box>
        </Box>

        {/* COMFORT */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" color="primary">
            Comfort & Sleep
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {room.roomDetails.comfort?.map((a: string) => (
              <Chip
                key={a}
                label={ComfortDisplayNames[a as Comfort]}
                size="small"
                sx={{
                  bgcolor: "white",
                  border: "1px solid #ddd",
                  fontWeight: 600,
                }}
              />
            ))}
          </Box>
        </Box>

        {/* PROVISIONS */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" color="primary">
            Food & Beverage
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {room.roomDetails.provisions?.map((a: string) => (
              <Chip
                key={a}
                label={ProvisionsDisplayNames[a as Provisions]}
                size="small"
                sx={{
                  bgcolor: "white",
                  border: "1px solid #ddd",
                  fontWeight: 600,
                }}
              />
            ))}
          </Box>
        </Box>

        {/* MISC */}
        <Box>
          <Typography variant="overline" color="primary">
            Additional Amenities
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {room.roomDetails.miscellaneous?.map((a: string) => (
              <Chip
                key={a}
                label={MiscellaneousDisplayNames[a as Miscellaneous]}
                size="small"
                sx={{
                  bgcolor: "white",
                  border: "1px solid #ddd",
                  fontWeight: 600,
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Collapse>
  </Box>
);

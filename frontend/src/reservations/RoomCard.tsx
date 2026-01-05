import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import {
  PeopleOutline,
  AttachMoneyOutlined,
  MeetingRoomOutlined,
} from "@mui/icons-material";

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  // Format price as currency
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(room.pricePerNight);

  // Format room type for display
  const formatRoomType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Format amenity for display
  const formatAmenity = (amenity: string) => {
    return amenity
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Get first image or use placeholder
  const roomImage =
    room.images && room.images.length > 0
      ? room.images[0]
      : "https://via.placeholder.com/400x200?text=Room+Image";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={roomImage}
        alt={`${room.roomDetails.type} room`}
        sx={{ objectFit: "cover" }}
      />

      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        {/* Room Type and Number */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            {formatRoomType(room.roomDetails.type)}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
            color="text.secondary"
          >
            <MeetingRoomOutlined fontSize="small" />
            <Typography variant="body2">Room {room.roomNumber}</Typography>
          </Box>
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {room.roomDetails.description}
        </Typography>

        {/* Capacity */}
        <Box display="flex" alignItems="center" gap={0.5} sx={{ mb: 2 }}>
          <PeopleOutline fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            Up to {room.roomDetails.maxCapacity}{" "}
            {room.roomDetails.maxCapacity === 1 ? "guest" : "guests"}
          </Typography>
        </Box>

        {/* Amenities */}
        {room.roomDetails.amenities &&
          room.roomDetails.amenities.length > 0 && (
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              sx={{ mb: 2, gap: 1 }}
            >
              {room.roomDetails.amenities.slice(0, 3).map((amenity, index) => (
                <Chip
                  key={index}
                  label={formatAmenity(amenity)}
                  size="small"
                  variant="outlined"
                />
              ))}
              {room.roomDetails.amenities.length > 3 && (
                <Chip
                  label={`+${room.roomDetails.amenities.length - 3} more`}
                  size="small"
                  variant="outlined"
                />
              )}
            </Stack>
          )}

        {/* Price and Book Button */}
        <Box sx={{ mt: "auto", pt: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Box display="flex" alignItems="center" gap={0.5}>
              <AttachMoneyOutlined color="primary" />
              <Typography variant="h6" color="primary">
                {formattedPrice}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                /night
              </Typography>
            </Box>
          </Box>

          <Button variant="contained" fullWidth>
            Book Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RoomCard;

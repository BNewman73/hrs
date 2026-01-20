/**
 * RoomCard
 *
 * Visual card representing a single room result. Shows primary image,
 * description, price and actions for booking or viewing availability.
 */
import {
  Card,
  Box,
  Typography,
  Button,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import RoomDetailsModal from "./RoomDetailsModal";
import { useBooking } from "../../hooks/useBooking";

interface Room {
  roomNumber: string;
  pricePerNight: number;
  images: string[];
  roomDetails: {
    type: string;
    maxCapacity: number;
  };
  description: string;
}

interface RoomResultCardProps {
  room: Room;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  filtered: boolean;
}

/**
 * RoomResultCard component
 *
 * Props: `room`, `checkInDate`, `checkOutDate`, `guests`, `filtered`.
 */
const RoomResultCard = ({
  room,
  checkInDate,
  checkOutDate,
  guests,
  filtered,
}: RoomResultCardProps) => {
  const { bookRoom, isLoading } = useBooking();

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(room.pricePerNight);

  const handleBookNow = async () => {
    await bookRoom({
      roomNumber: room.roomNumber,
      roomPricePerNight: room.pricePerNight,
      checkInDate,
      checkOutDate,
      guests,
    });
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        width: "100%",
        maxWidth: 800,
        height: { xs: "auto", sm: 220 },
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: { xs: "100%", sm: 250 },
          height: { xs: 200, sm: "100%" },
          objectFit: "cover",
        }}
        image={room?.images[0]}
        alt={`Room ${room.roomNumber}`}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          p: { xs: 2, sm: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              textTransform: "uppercase",
              lineHeight: 1.2,
            }}
          >
            Room {room.roomNumber}
            <hr />
          </Typography>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
            {formattedPrice}
            <Typography
              component="span"
              variant="caption"
              color="text.secondary"
              sx={{ ml: 0.5 }}
            >
              /night
            </Typography>
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: { xs: 2, sm: 3 },
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 2,
            flex: 1,
          }}
        >
          {room.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {filtered ? (
            <Button
              variant="contained"
              size="small"
              onClick={handleBookNow}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={20} /> : "Book Now"}
            </Button>
          ) : (
            <RoomDetailsModal
              roomNumber={room.roomNumber}
              capacity={room.roomDetails.maxCapacity}
              pricePerNight={room.pricePerNight}
            />
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default RoomResultCard;

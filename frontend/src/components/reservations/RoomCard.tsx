import {
  Card,
  Box,
  Typography,
  Button,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import { useCreateCheckoutSessionMutation } from "../../features/roomApi";
import RoomDetailsModal from "./RoomDetailsModal";

interface Room {
  roomNumber: string;
  pricePerNight: number;
  images: string[];
  roomDetails: {
    type: string;
  };
  description: string;
}

interface RoomResultCardProps {
  room: Room;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
}

const RoomResultCard = ({
  room,
  checkInDate,
  checkOutDate,
  guests,
}: RoomResultCardProps) => {
  const [createCheckoutSession, { isLoading }] =
    useCreateCheckoutSessionMutation();

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(room.pricePerNight);

  /*const formatRoomType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };*/

  const calculateNights = () => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleBookNow = async () => {
    try {
      const numberOfNights = calculateNights();
      const totalPrice = room.pricePerNight * numberOfNights;

      const result = await createCheckoutSession({
        roomNumber: room.roomNumber,
        checkInDate,
        checkOutDate,
        guests,
        numberOfNights,
        totalPrice,
      }).unwrap();

      // Redirect to Stripe Checkout
      window.location.href = result.url;
    } catch (err) {
      console.error("Failed to create checkout session:", err);
    }
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
          <Button
            variant="contained"
            size="small"
            onClick={handleBookNow}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={20} /> : "Book Now"}
          </Button>
          <RoomDetailsModal roomNumber={room.roomNumber} />
        </Box>
      </Box>
    </Card>
  );
};

export default RoomResultCard;

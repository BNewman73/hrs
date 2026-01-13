import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Alert,
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
  const [createCheckoutSession, { isLoading, error }] =
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
        height: 150,
        display: "flex",
        mb: 2,
        transition: "box-shadow 0.2s",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <Box
        component="img"
        sx={{
          width: 300,
          height: "100%",
          objectFit: "cover",
        }}
        src={
          room?.images[0] ||
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"
        }
        alt={`Room ${room.roomNumber}`}
      />

      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          p: 2,
          minHeight: 120,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", width: 3 / 5 }}>
          <Box sx={{ display: "flex", gap: "30px" }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Room {room.roomNumber}
            </Typography>
            <Typography variant="h6" color="primary">
              {formattedPrice}
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                sx={{ ml: 0.5 }}
              >
                /night
              </Typography>
            </Typography>
          </Box>
          <Box>
            <Typography>{room.description}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
            width: 1 / 5,
          }}
        >
          <Stack direction="column" spacing={1}>
            <Button
              variant="contained"
              size="small"
              onClick={handleBookNow}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={20} /> : "Book Now"}
            </Button>
            <RoomDetailsModal roomNumber={room.roomNumber} />
          </Stack>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            Failed to process booking. Please try again.
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomResultCard;

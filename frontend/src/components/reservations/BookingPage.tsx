import { useParams } from "react-router-dom";
import RoomAvailability from "./RoomAvailability";
import type { RoomType } from "../../types/enum";
import { Box, Container, Typography } from "@mui/material";

const BookingPage: React.FC = () => {
  const { roomType } = useParams<{ roomType: string }>();
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box>
        <Typography variant="h2">
          Find {roomType!.charAt(0) + roomType!.slice(1).toLowerCase()} Rooms
        </Typography>
      </Box>
      <RoomAvailability roomType={roomType as RoomType} />
    </Container>
  );
};

export default BookingPage;

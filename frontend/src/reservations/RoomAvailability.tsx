import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { useGetAvailableRoomsQuery } from "./roomApi";
import RoomList from "./RoomList";

const RoomAvailability: React.FC = () => {
  const { roomType } = useParams<{ roomType: string }>();

  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [guests, setGuests] = useState<number>(1);
  const [searchParams, setSearchParams] = useState<{
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    roomType: string;
  } | null>(null);

  const {
    data: rooms,
    isLoading,
    error,
  } = useGetAvailableRoomsQuery(searchParams!, {
    skip: !searchParams,
  });

  const handleSearch = () => {
    if (checkInDate && checkOutDate && roomType) {
      setSearchParams({
        checkInDate,
        checkOutDate,
        guests,
        roomType,
      });
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Find Available {roomType!.charAt(0) + roomType!.slice(1).toLowerCase()}{" "}
        Rooms
      </Typography>

      <Paper elevation={5} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              label="Check-in Date"
              type="date"
              fullWidth
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                htmlInput: {
                  min: today,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              label="Check-out Date"
              type="date"
              fullWidth
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                htmlInput: {
                  min: today,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              label="Number of Guests"
              type="number"
              fullWidth
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              slotProps={{
                htmlInput: {
                  min: 1,
                  max: 10,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<SearchOutlined />}
              onClick={handleSearch}
              disabled={!checkInDate || !checkOutDate}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <RoomList
        rooms={rooms}
        isLoading={isLoading}
        error={error}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        guests={guests}
      />
    </Container>
  );
};

export default RoomAvailability;

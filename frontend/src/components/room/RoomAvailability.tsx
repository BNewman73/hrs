/**
 * RoomAvailability
 *
 * Page widget that allows users to select dates and number of guests, then
 * search available rooms for a given `roomType`. It toggles between showing
 * all rooms of a type and filtered availability results.
 */
import { useState } from "react";
import { Container, Paper, Grid, TextField, Button } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import {
  useGetAllRoomsByTypeQuery,
  useGetAvailableRoomsQuery,
} from "../../features/roomApi";
import RoomList from "./RoomList";
import type { RoomType } from "../../types/enum";

interface RoomAvailabilityProps {
  roomType: RoomType;
}

/**
 * RoomAvailability component
 *
 * Props: `roomType` - the room type to query. Maintains local form state
 * for date inputs and guests and calls availability APIs.
 */
const RoomAvailability: React.FC<RoomAvailabilityProps> = ({ roomType }) => {
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [guests, setGuests] = useState<number>(1);
  const [showFiltered, setShowFiltered] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<{
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    roomType: string;
  } | null>(null);

  const {
    data: allRooms,
    isLoading: allRoomsLoading,
    error: allRoomsError,
  } = useGetAllRoomsByTypeQuery(roomType);

  const {
    data: filteredRooms,
    isLoading: filteredLoading,
    error: filteredError,
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
      setShowFiltered(true);
    }
  };

  const handleShowAll = () => {
    setShowFiltered(false);
    setCheckInDate("");
    setCheckOutDate("");
    setGuests(1);
    setSearchParams(null);
  };

  const rooms = showFiltered ? filteredRooms : allRooms;
  const isLoading = showFiltered ? filteredLoading : allRoomsLoading;
  const error = showFiltered ? filteredError : allRoomsError;

  const today = new Date().toISOString().split("T")[0];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={5}
        sx={{ p: 3, mb: 4, position: "sticky", top: "145px", zIndex: 2 }}
      >
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
            {!showFiltered ? (
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
            ) : (
              <Button
                variant="outlined"
                fullWidth
                size="large"
                onClick={handleShowAll}
              >
                Show All Rooms
              </Button>
            )}
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
        filtered={showFiltered}
      />
    </Container>
  );
};

export default RoomAvailability;

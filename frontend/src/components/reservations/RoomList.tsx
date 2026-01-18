import React from "react";
import { Box, Typography, CircularProgress, Alert, Stack } from "@mui/material";
import { type SerializedError } from "@reduxjs/toolkit";
import { type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import RoomCard from "./RoomCard";
import { getErrorMessage } from "../../features/errorUtils";
interface RoomListProps {
  rooms?: Room[];
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  filtered: boolean;
}

const RoomList: React.FC<RoomListProps> = ({
  rooms,
  isLoading,
  error,
  checkInDate,
  checkOutDate,
  guests,
  filtered,
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={8}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {/*Failed to load available rooms. Please try again later.*/}
        {getErrorMessage(error)}
      </Alert>
    );
  }

  if (!rooms) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h6" color="text.secondary">
          Enter your dates above to search for available rooms
        </Typography>
      </Box>
    );
  }

  if (rooms.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No rooms available for the selected dates. Please try different dates.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Available Rooms ({rooms.length})
      </Typography>
      <Stack spacing={2}>
        {rooms.map((room) => (
          <RoomCard
            key={room.roomNumber}
            room={room}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            guests={guests}
            filtered={filtered}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default RoomList;

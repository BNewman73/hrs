import React from "react";
import { Box, Grid, Typography, CircularProgress, Alert } from "@mui/material";
import { type SerializedError } from "@reduxjs/toolkit";
import { type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import RoomCard from "./RoomCard";

interface RoomListProps {
  rooms?: Room[];
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, isLoading, error }) => {
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
        Failed to load available rooms. Please try again later.
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
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {rooms.map((room) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={room.roomNumber}>
            <RoomCard room={room} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RoomList;

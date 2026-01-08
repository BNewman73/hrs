import React from "react";
import { Container, Typography, Box } from "@mui/material";
import RoomTypesCarousel from "./RoomTypesCarousel";

const RoomTypesPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Explore Our Rooms
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover the perfect accommodation for your stay
        </Typography>
      </Box>

      <RoomTypesCarousel />
    </Container>
  );
};

export default RoomTypesPage;

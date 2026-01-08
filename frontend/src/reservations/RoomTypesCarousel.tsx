import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  ExpandMore,
  PeopleOutline,
  AttachMoneyOutlined,
} from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useGetComprehensiveRoomDetailsQuery } from "./roomApi";

const RoomTypeCard: React.FC<{ roomType: RoomDetailsDTO }> = ({ roomType }) => {
  const navigate = useNavigate();
  const formattedMinPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(roomType.minPrice);

  const formattedMaxPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(roomType.maxPrice);

  // Use first image or placeholder
  const roomImage =
    roomType.images && roomType.images.length > 0
      ? roomType.images[0]
      : "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=60";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        maxWidth: 800,
        mx: "auto",
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={roomImage}
        alt={roomType.type}
        sx={{ objectFit: "cover" }}
      />

      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          {roomType.type
            .split("_")
            .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
            .join(" ")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={0.5}>
            <PeopleOutline fontSize="small" color="action" />
            <Typography variant="body1" color="text.secondary">
              Up to {roomType.maxCapacity}{" "}
              {roomType.maxCapacity === 1 ? "guest" : "guests"}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={0.5}>
            <AttachMoneyOutlined color="primary" />
            <Typography variant="h6" color="primary">
              {formattedMinPrice} - {formattedMaxPrice}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              /night
            </Typography>
          </Box>
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {roomType.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Amenities
          </Typography>
          {Object.entries(roomType.amenitiesByCategory).map(
            ([category, items]) => (
              <Accordion key={category} defaultExpanded={false}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`${category}-content`}
                  id={`${category}-header`}
                >
                  <Typography variant="subtitle1" fontWeight="medium">
                    {category}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    sx={{ gap: 1 }}
                  >
                    {items.map((amenity, index) => (
                      <Chip
                        key={index}
                        label={amenity}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            )
          )}
        </Box>

        <Box sx={{ mt: "auto" }}>
          <Button
            onClick={() => navigate(`/rooms/${roomType.type}`)}
            variant="contained"
            fullWidth
            size="large"
          >
            Explore All{" "}
            {roomType.type
              .split("_")
              .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
              .join(" ")}{" "}
            Options
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const RoomTypesCarousel: React.FC = () => {
  const {
    data: roomTypes,
    isLoading,
    error,
  } = useGetComprehensiveRoomDetailsQuery();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Failed to load room types. Please try again later.
        </Alert>
      </Box>
    );
  }

  if (!roomTypes || roomTypes.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">No room types available at this time.</Alert>
      </Box>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: false }}
      loop={true}
      style={{
        paddingBottom: "40px",
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
    >
      {roomTypes.map((roomType) => (
        <SwiperSlide key={roomType.type}>
          <RoomTypeCard roomType={roomType} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RoomTypesCarousel;

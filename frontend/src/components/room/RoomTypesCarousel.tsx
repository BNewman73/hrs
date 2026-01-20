/**
 * RoomTypesCarousel
 *
 * Carousel of room type cards for marketing and exploration. Fetches
 * comprehensive room type data and renders `RoomTypeCard` slides.
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
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
import { ExpandMore, PeopleOutline } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useGetComprehensiveRoomDetailsQuery } from "../../features/roomApi";
import RoomTypePics from "./RoomPicsCarousel";

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
  // const roomImage =
  //   roomType.images && roomType.images.length > 0
  //     ? roomType.images[0]
  //     : "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=60";

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 520,
        mx: "auto",
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "rgba(255,255,255,0.97)",
        boxShadow: "0 18px 50px rgba(0,0,0,0.12)",
        transition: "transform .35s ease, box-shadow .35s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 28px 70px rgba(0,0,0,0.18)",
        },
      }}
    >
      {/* <CardMedia
        component="img"
        height="220"
        image={roomImage}
        alt={roomType.type}
        sx={{ objectFit: "cover" }}
      /> */}
      <Box
        sx={{
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.55))",
            zIndex: 1,
            pointerEvents: "none",
          },
        }}
      >
        <RoomTypePics pics={roomType.images} />
      </Box>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 3.5,
          py: 3.5,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            letterSpacing: -0.5,
            mb: 2,
          }}
        >
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
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={0.75}>
            <PeopleOutline fontSize="small" />
            <Typography fontWeight={600} color="text.secondary">
              Up to {roomType.maxCapacity} guests
            </Typography>
          </Box>

          <Box display="flex" alignItems="baseline" gap={0.5}>
            <Typography variant="h6" fontWeight={800} color="primary">
              {formattedMinPrice} – {formattedMaxPrice}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              / night
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            color: "text.secondary",
            lineHeight: 1.7,
            mb: 3,
          }}
        >
          {roomType.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{
              color: "text.secondary",
              lineHeight: 1.7,
              mb: 3,
            }}
          >
            <strong>Amenities</strong>
          </Typography>
          {Object.entries(roomType.amenitiesByCategory).map(
            ([category, items]) => (
              <Accordion
                key={category}
                disableGutters
                elevation={0}
                sx={{
                  bgcolor: "transparent",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  "&::before": { display: "none" },
                }}
              >
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
                    {items.map((amenity: string, index: number) => (
                      <Chip
                        key={index}
                        label={amenity}
                        size="small"
                        sx={{
                          bgcolor: "rgba(14,16,61,0.04)",
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ),
          )}
        </Box>

        <Box sx={{ mt: "auto" }}>
          <Button
            fullWidth
            size="large"
            onClick={() => navigate(`/rooms/${roomType.type}`)}
            sx={{
              mt: 3,
              py: 1.6,
              borderRadius: 999,
              fontWeight: 800,
              textTransform: "none",
              color: "black",
              background: "linear-gradient(135deg,#FF6B35 0%,#F7931E 100%)",
              boxShadow: "0 12px 30px rgba(255,107,53,.45)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 18px 40px rgba(255,107,53,.6)",
              },
            }}
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

/**
 * RoomTypesCarousel component
 *
 * Fetches room type data and displays a swiper carousel of `RoomTypeCard`.
 */
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
      loop
      style={{
        paddingBottom: "60px",
        paddingInline: "24px",
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

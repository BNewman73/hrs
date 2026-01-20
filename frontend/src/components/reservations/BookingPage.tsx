/**
 * BookingPage
 *
 * Page used to initiate a booking flow for a specific `roomType`. Shows a
 * hero area and the `RoomAvailability` selector. Uses `useGetPrincipalQuery`
 * to ensure the authenticated principal is loaded.
 */
import { useParams } from "react-router-dom";
import RoomAvailability from "../room/RoomAvailability";
import type { RoomType } from "../../types/enum";
import { Box, Container, Fade, Typography } from "@mui/material";
import FooterPage from "../FooterPage";
import { useEffect } from "react";
import { useGetPrincipalQuery } from "../../features/userApi";

import NavBar from "../NavBar";

const IMAGE =
  "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg";
/**
 * BookingPage component
 *
 * Route-level component that orchestrates the booking UI. No props; it reads
 * the `roomType` parameter from the route.
 */
const BookingPage: React.FC = () => {
  const { roomType } = useParams<{ roomType: string }>();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGetPrincipalQuery();

  return (
    <>
      <Fade in unmountOnExit timeout={1000}>
        <Box component="div" display="flex" sx={{ flexDirection: "column" }}>
          <Box sx={{ padding: "5px" }}>
            <NavBar variant="dark" />
          </Box>

          <Box
            component="div"
            sx={{
              zIndex: 1,
              display: "flex",
              position: "sticky",
              top: "-300px",
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${IMAGE})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "500px",
              width: "100%",
              color: "white",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              padding: "20px 20px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontStyle: "italic",
                textTransform: "uppercase",
                letterSpacing: 2,
                pb: 7,
              }}
            >
              Our {roomType!.charAt(0) + roomType!.slice(1).toLowerCase()} Rooms
            </Typography>
          </Box>
          <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Typography variant="h2">
              Find {roomType!.charAt(0) + roomType!.slice(1).toLowerCase()}{" "}
              Rooms
            </Typography>
            <RoomAvailability roomType={roomType as RoomType} />
          </Container>
        </Box>
      </Fade>
      <FooterPage />
    </>
  );
};

export default BookingPage;

import GlobalSnackbar from "./components/GlobalSnackbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import LoginPage from "./components/login/LoginPage";
import Container from "@mui/material/Container";
import RoomAvailability from "./reservations/RoomAvailability";
import RoomTypesPage from "./reservations/RoomTypesPage";
import BookingCancel from "./reservations/BookingCancel";
import BookingSuccess from "./reservations/BookingSuccess";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalSnackbar />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/rooms/:roomType" element={<RoomAvailability />} />
            <Route path="/types" element={<RoomTypesPage />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/booking-cancel" element={<BookingCancel />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;

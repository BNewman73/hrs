import GlobalSnackbar from "./components/GlobalSnackbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import LoginPage from "./components/login/LoginPage";
import RoomAvailability from "./components/reservations/RoomAvailability";
import RoomTypesPage from "./components/reservations/RoomTypesPage";
import BookingCancel from "./components/reservations/BookingCancel";
import BookingSuccess from "./components/reservations/BookingSuccess";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalSnackbar />

        <Routes>
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/rooms/:roomType" element={<RoomAvailability />} />
          <Route path="/types" element={<RoomTypesPage />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/booking-cancel" element={<BookingCancel />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import GlobalSnackbar from "./components/GlobalSnackbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import LoginPage from "./components/login/LoginPage";
import Container from "@mui/material/Container";
import RoomAvailability from "./reservations/RoomAvailability";
import RoomCalendar from "./reservations/RoomCalendar";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalSnackbar />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/rooms" element={<RoomAvailability />} />
            <Route path="/room" element={<RoomCalendar />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;

import GlobalSnackbar from "./components/GlobalSnackbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import LoginPage from "./components/login/LoginPage";

import RoomAvailability from "./reservations/RoomAvailability";
import RoomCalendar from "./reservations/RoomCalendar";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalSnackbar />

        <Routes>
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/rooms" element={<RoomAvailability />} />
          <Route path="/room" element={<RoomCalendar />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

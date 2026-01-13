import GlobalSnackbar from "./components/GlobalSnackbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import LoginPage from "./components/login/LoginPage";
import RoomTypesPage from "./components/reservations/RoomTypesPage";
import BookingCancel from "./components/reservations/BookingCancel";
import BookingSuccess from "./components/reservations/BookingSuccess.tsx";
import HomePage from "./components/HomePage";
import BookingPage from "./components/reservations/BookingPage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./components/reservations/theme.ts";
import Temp from "./components/Temp.tsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
          <GlobalSnackbar />

          <Routes>
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/rooms/:roomType" element={<BookingPage />} />
            <Route path="/types" element={<RoomTypesPage />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/booking-cancel" element={<BookingCancel />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="" element={<HomePage />} />
            <Route path="/temp" element={<Temp />} />
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;

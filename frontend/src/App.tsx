/**
 * Top-level application component that wires theme, routing and global UI.
 *
 * Routes defined here map to the main pages used by the application. Keep
 * this file focused on composition only; page-level logic belongs in the
 * page components under `components/`.
 *
 * @module src/App
 */
import GlobalSnackbar from "./components/GlobalSnackbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import LoginPage from "./components/login/LoginPage";

import BookingCancel from "./components/reservations/BookingCancel";
import BookingSuccess from "./components/reservations/BookingSuccess.tsx";
import HomePage from "./components/HomePage";
import BookingPage from "./components/reservations/BookingPage";
import ReservationsTable from "./components/reservations/ReservationsTable";
import LogoutPage from "./components/login/LogoutPage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../theme.ts";
import UserHomePage from "./components/UserHomePage.tsx";
import AuthBootstrap from "./AuthGlobal.tsx";
import NotFoundPage from "./components/NotFoundPage.tsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <GlobalSnackbar />
        <AuthBootstrap />

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />

          <Route path="/rooms/:roomType" element={<BookingPage />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/booking-cancel" element={<BookingCancel />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="" element={<HomePage />} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/user-home" element={<UserHomePage />} />
          <Route path="/profile" element={<ReservationsTable />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

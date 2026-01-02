import GlobalSnackbar from "./components/GlobalSnackbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import LoginPage from "./components/login/LoginPage";
import Container from "@mui/material/Container";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalSnackbar />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;

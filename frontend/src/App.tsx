import {
  Box,
  CssBaseline,
  Tab,
  Tabs,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import RoomAvailability from "./reservations/RoomAvailability";
import { useState } from "react";
import RoomCalendar from "./reservations/RoomCalendar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "white",
        }}
      >
        <Tabs value={currentTab} onChange={handleTabChange} centered>
          <Tab label="Search Rooms" />
          <Tab label="Room Calendar" />
        </Tabs>
      </Box>

      {currentTab === 0 && <RoomAvailability />}
      {currentTab === 1 && <RoomCalendar />}
    </ThemeProvider>
  );
}

export default App;

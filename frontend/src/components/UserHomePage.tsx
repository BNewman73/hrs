import { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import NavBar from "./NavBar";
import { useGetPrincipalQuery } from "../features/userApi";
import { setUser, clearUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import GuestAccountCard from "./account/GuestAccountCard";
import { usePageTitle } from "../hooks/usePageTitle";

export default function UserHomePage() {
  usePageTitle("Dashboard");
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const { data, error } = useGetPrincipalQuery();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    } else if (error) {
      dispatch(clearUser());
    }
  }, [data, error, dispatch]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <CssBaseline />

      <Toolbar>
        {" "}
        <NavBar />
      </Toolbar>

      {/* Page Content */}
      <Box sx={{ pt: 1 }}>
        <Box
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, value) => setActiveTab(value)}
            centered
          >
            <Tab label="Reservations" />
            <Tab label="Payments" />
            <Tab label="Profile" />
          </Tabs>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            px: 2,
            py: 6,
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: 900,
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              {activeTab === 0 && (
                <Box>
                  <Typography variant="h5" fontWeight={800} mb={1}>
                    Your Reservations
                  </Typography>
                  <Typography color="text.secondary">
                    View and manage your upcoming and past reservations.
                  </Typography>
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="h5" fontWeight={800} mb={1}>
                    Payment History
                  </Typography>
                  <Typography color="text.secondary">
                    Review your completed and pending payments.
                  </Typography>
                </Box>
              )}

              {activeTab === 2 && (
                <Box>
                  <Typography variant="h5" fontWeight={800} mb={1}>
                    Profile
                  </Typography>
                  <GuestAccountCard />
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

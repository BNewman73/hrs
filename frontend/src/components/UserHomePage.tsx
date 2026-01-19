import { useEffect, useState } from "react";
import {
    AppBar,
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
import ReservationsTable from "./reservations/ReservationsTable"

export default function UserHomePage() {
    
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
    
      const user = data || {
        id: "",
        firstName: "Guest",
        lastName: "User",
        email: "guest@stormstay.com",
        avatarUrl: "/static/images/avatar/placeholder.jpg",
        provider: "",
        role: "guest",
      };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            <CssBaseline />

            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    bgcolor: "#ffffff",
                    color: "text.primary",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Toolbar>
                    <NavBar user={user} />
                </Toolbar>
            </AppBar>

            {/* Page Content */}
            <Box sx={{ pt: 8 }}>

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
                            maxWidth: 1000,
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
                                    View and manage your current, upcoming, and past reservations
                                </Typography>
                                <ReservationsTable />
                            </Box>
                        )}

                        {activeTab === 1 && (
                            <Box>
                                <Typography variant="h5" fontWeight={800} mb={1}>
                                    Your Reward Points
                                </Typography>
                                <Typography color="text.secondary">
                                    View and manage your accumulated StormStay reward points
                                </Typography>
                            </Box>
                        )}
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
}

import { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Toolbar,
  Avatar,
  IconButton,
  AppBar,
  ListItemIcon,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import BedIcon from "@mui/icons-material/Bed";
import LogoutIcon from "@mui/icons-material/Logout";
import EventNoteIcon from "@mui/icons-material/EventNote";
import GroupIcon from "@mui/icons-material/Group";
import NavBar from "./NavBar";
import RoomCreateForm from "./room/RoomCrudForm";
import RoomTable from "./room/RoomTable";
import ReservationTable from "./room/ReservationTable";
import AccountCard from "./account/AccountCard";
import { useNavigate } from "react-router-dom";
import { useGetPrincipalQuery } from "../features/userApi";

import { useAppSelector } from "../shared/store/hooks";
import UserTable from "./user/UserTable";
import OccupancyCard from "./reservations/OccupancyCard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TransactionsTable from "../transaction/TransactionsTable";

const DRAWER_WIDTH = 280;

export default function DashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Table");
  const navigate = useNavigate();

  useGetPrincipalQuery();

  const currentUser = useAppSelector((s) => s.user.user) || {
    id: "",
    firstName: "Guest",
    lastName: "User",
    email: "guest@stormstay.com",
    avatarUrl: "/static/images/avatar/placeholder.jpg",
    provider: "",
    role: "guest",
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { id: "Table", label: "View Rooms", icon: <BedIcon /> },
    { id: "Reservations", label: "View Reservations", icon: <EventNoteIcon /> },
    { id: "Users", label: "View Users", icon: <GroupIcon /> },
    { id: "Rooms", label: "Create Room", icon: <AddHomeWorkIcon /> },
    { id: "Occupancy", label: "Occupancy Report", icon: <EventNoteIcon /> },
    { id: "Transactions", label: "Transactions", icon: <ReceiptIcon /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Account":
        return <AccountCard />;
      case "Rooms":
        return <RoomCreateForm crud="Create" />;
      case "Reservations":
        return <ReservationTable />;
      case "Users":
        return <UserTable />;
      case "Occupancy":
        return <OccupancyCard />;
      case "Transactions":
        return <TransactionsTable />;
      case "Table":
      default:
        return <RoomTable />;
    }
  };

  const sidebarContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #ffffff 0%, #f3f4f6 100%)",
        boxShadow: "4px 0 12px rgba(0,0,0,0.05)",
      }}
    >
      <Toolbar sx={{ px: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: "primary.main", letterSpacing: -0.5 }}
        >
          STORM HOTELS
        </Typography>
      </Toolbar>

      <Box sx={{ px: 2, pb: 2 }}>
        <ListItem
          onClick={() => {
            setActiveTab("Account");
            setMobileOpen(false);
          }}
          sx={{
            bgcolor: activeTab === "Account" ? "primary.main" : "white",
            color: activeTab === "Account" ? "white" : "inherit",
            borderRadius: "16px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            mb: 2,
            p: 2,
          }}
        >
          <Avatar
            src={currentUser.avatarUrl}
            sx={{ width: 44, height: 44, mr: 1.5, bgcolor: "primary.main" }}
          />
          <Box sx={{ overflow: "hidden" }}>
            <Typography variant="subtitle2" noWrap fontWeight={700}>
              {currentUser.firstName} {currentUser.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              Admin Account
            </Typography>
          </Box>
        </ListItem>
      </Box>

      <Divider sx={{ mb: 2, mx: 2 }} />

      <List sx={{ px: 2, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              selected={activeTab === item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileOpen(false);
              }}
              sx={{
                borderRadius: "12px",
                py: 1.5,
                position: "relative",
                transition: "all 0.25s ease",
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "white",
                  boxShadow: "0 4px 10px rgba(25,118,210,0.3)",
                  "& .MuiListItemIcon-root": { color: "white" },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: "20%",
                    height: "60%",
                    width: "4px",
                    bgcolor: "white",
                    borderRadius: "0 4px 4px 0",
                  },
                },
                "&:hover": {
                  bgcolor: "rgba(25, 118, 210, 0.12)",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: activeTab === item.id ? "white" : "text.secondary",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={() => navigate("/logout")}
          sx={{
            borderRadius: "12px",
            color: "error.main",
            "&:hover": { bgcolor: "rgba(211,47,47,0.08)" },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: "error.main" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ fontWeight: 600 }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (t) => t.zIndex.drawer + 1,
          bgcolor: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <NavBar user={currentUser} />
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {sidebarContent}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{ display: { xs: "none", md: "block" } }}
        >
          {sidebarContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1.5, sm: 3, md: 5 },
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar />

        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            bgcolor: "white",
            borderRadius: { xs: "12px", sm: "20px" },
            p: { xs: 2, sm: 4 },
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 900, letterSpacing: "-0.03em", mb: 0.5 }}
            >
              {activeTab === "Account"
                ? ""
                : activeTab === "Rooms"
                  ? "Room Management"
                  : activeTab === "Users"
                    ? "Users"
                    : activeTab === "Reservations"
                      ? "Reservations"
                      : activeTab === "Occupancy"
                        ? "Occupancy Report"
                        : activeTab === "Transactions"
                          ? "Transactions"
                          : "Rooms"}
            </Typography>

            <Typography color="text.secondary">
              {activeTab === "Rooms"
                ? "Add new rooms to your hotel."
                : activeTab === "Users"
                  ? "View and manage users."
                  : activeTab === "Table"
                    ? "View and manage hotel rooms."
                    : activeTab === "Reservations"
                      ? "View and manage reservations."
                      : activeTab === "Transactions"
                        ? "View Transactions."
                        : ""}
            </Typography>
          </Box>

          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
}

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
import NavBar from "./NavBar";
import RoomCreateForm from "./room/RoomCrudForm";
import RoomTable from "./room/RoomTable";
import ReservationTable from "./room/ReservationTable";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useNavigate } from "react-router-dom";

const DRAWER_WIDTH = 280;

export default function DashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Table");

  const currentUser = {
    id: 1,
    name: "Jevaughn Stewart",
    email: "jevaughnstewart100@gmail.com",
  };
  const handleNavigation = useNavigate();
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { id: "Table", label: "View Inventory", icon: <BedIcon /> },

    {
      id: "Reservations",
      label: "View Reservations",
      icon: <EventNoteIcon />,
    },
    { id: "Rooms", label: "Create Room", icon: <AddHomeWorkIcon /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Rooms":
        return <RoomCreateForm crud="Create" />;
      case "Reservations":
        return <ReservationTable />;
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
          sx={{
            fontWeight: 900,
            color: "primary.main",
            letterSpacing: -0.5,
          }}
        >
          STORM HOTELS
        </Typography>
      </Toolbar>

      <Box sx={{ px: 2, pb: 2 }}>
        <ListItem
          sx={{
            bgcolor: "white",
            borderRadius: "16px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            mb: 2,
            p: 2,
            transition: "transform .2s ease, box-shadow .2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 10px 22px rgba(0,0,0,0.12)",
            },
          }}
        >
          <Avatar
            alt={currentUser.name}
            src="/static/images/avatar/2.jpg"
            sx={{ width: 44, height: 44, mr: 1.5, bgcolor: "primary.main" }}
          />
          <Box sx={{ overflow: "hidden" }}>
            <Typography variant="subtitle2" noWrap sx={{ fontWeight: 700 }}>
              {currentUser.name}
            </Typography>
            <Typography
              variant="caption"
              noWrap
              color="text.secondary"
              sx={{ display: "block" }}
            >
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
                  "&:hover": { bgcolor: "primary.dark" },
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
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: activeTab === item.id ? 700 : 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={() => handleNavigation("/home")}
          sx={{
            borderRadius: "12px",
            color: "error.main",
            "&:hover": {
              bgcolor: "rgba(211,47,47,0.08)",
            },
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
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(12px)",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <NavBar user={currentUser} />
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              borderRight: "none",
            },
          }}
        >
          {sidebarContent}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1.5, sm: 3, md: 5 }, // Smaller padding on tiny screens
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          // Add: ensure the main area doesn't force a horizontal scroll
          overflowX: "hidden",
        }}
      >
        <Toolbar />

        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            bgcolor: "white",
            borderRadius: { xs: "12px", sm: "20px" }, // Slightly smaller radius on mobile
            p: { xs: 2, sm: 4 },
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            // Change: Ensure internal content respects boundaries
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                letterSpacing: "-0.03em",
                mb: 0.5,
              }}
            >
              {activeTab === "Rooms" ? "Room Management" : "Hotel Inventory"}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", fontSize: "1rem" }}
            >
              {activeTab === "Rooms"
                ? "Add new rooms to your hotel."
                : "Manage and update your current available rooms."}
            </Typography>
          </Box>

          <Box sx={{ animation: "fadeIn 0.5s ease-in-out" }}>
            {renderContent()}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

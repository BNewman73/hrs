import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Fade, // Added for smoother animation
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../shared/store/hooks";
import { useLogoutMutation } from "../features/userApi";
import { clearUser } from "../features/userSlice";
import MenuIcon from "@mui/icons-material/Menu";
const style = {
  color: "white",

  px: 4,

  borderRadius: 999,

  background: "linear-gradient(135deg,#FF6B35 0%,#F7931E 100%)",

  fontWeight: 700,

  textTransform: "none",

  boxShadow: "0 10px 30px rgba(255,107,53,.35)",

  transition: "all 0.25s ease",

  "&:hover": {
    transform: "translateY(-2px)",

    boxShadow: "0 16px 40px rgba(255,107,53,.55)",

    background: "linear-gradient(135deg,#FF7A45 0%,#FF9A2E 100%)",
  },

  "&:active": {
    transform: "translateY(0)",

    boxShadow: "0 8px 20px rgba(255,107,53,.35)",
  },
};

export default function NavBar({
  variant = "light",
  showHomeButton = false,
  onMenuClick,
}: NavBarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const user = useAppSelector((s) => s.user.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleCloseMenu();
    try {
      await logout().unwrap();
    } finally {
      dispatch(clearUser());
      navigate("/");
    }
  };

  const options = [
    { title: "Home", action: () => navigate("/home") },
    ...(user?.role === "ADMIN"
      ? [{ title: "Dashboard", action: () => navigate("/dashboard") }]
      : []),
    { title: "Reservations", action: () => navigate("/user-home") },
    { title: "Logout", action: handleLogout },
  ];

  const isDark = variant === "dark";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: isDark ? "rgba(10,14,39,0.55)" : "white",
        backdropFilter: isDark ? "blur(8px)" : "none",
        borderBottom: isDark ? "none" : "1px solid rgba(0,0,0,0.08)",
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensures it stays on top
      }}
    >
      <Toolbar
        sx={{ minHeight: { xs: 64, md: 80 }, justifyContent: "space-between" }}
      >
        {onMenuClick && (
          <IconButton
            edge="start"
            onClick={onMenuClick}
            sx={{
              mr: 1,
              display: { xs: "inline-flex", md: "none" },
              color: isDark ? "white" : "black",
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Box
            component="img"
            src="/stormstay-icon-192.png"
            sx={{ width: 45, height: 45, borderRadius: "50%" }}
          />
          <Typography
            fontWeight={900}
            letterSpacing={-1}
            color={isDark ? "white" : "black"}
          >
            STORM STAY
          </Typography>
        </Box>

        {user ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handleOpenMenu}
              sx={{ borderRadius: 2, px: 1.5 }}
              aria-controls={open ? "user-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Typography
                sx={{
                  color: isDark ? "white" : "black",
                  pr: 1.5,
                  fontWeight: 600,
                  display: { xs: "none", sm: "block" },
                }}
              >
                Hello, {user.firstName}
              </Typography>
              <Avatar
                src={user.avatarUrl}
                sx={{
                  width: 35,
                  height: 35,
                  border: `2px solid ${isDark ? "#FF6B35" : "transparent"}`,
                }}
              />
            </IconButton>

            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              slots={{ transition: Fade }}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              disableScrollLock
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    mt: 1.5,
                    minWidth: 220,
                    borderRadius: 3,
                    bgcolor: isDark ? "rgba(15,18,41,0.98)" : "white",
                    backdropFilter: "blur(12px)",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                    "& .MuiList-root": { py: 1 },
                  },
                },
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleCloseMenu();
                    option.action();
                  }}
                  sx={{
                    py: 1.5,
                    px: 3,
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: isDark ? "rgba(255,255,255,0.85)" : "text.primary",
                    "&:hover": {
                      bgcolor: "rgba(255,107,53,0.08)",
                      color: "#FF6B35",
                    },
                  }}
                >
                  {option.title}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : (
          <Button
            onClick={() => navigate(showHomeButton ? "/" : "/login")}
            sx={style}
          >
            {showHomeButton ? "Home" : "Login"}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

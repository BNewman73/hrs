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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../shared/store/hooks";
import { useLogoutMutation } from "../features/userApi";
import { clearUser } from "../features/userSlice";

interface NavBarProps {
  variant?: "dark" | "light";
  showHomeButton?: boolean;
}
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
}: NavBarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const user = useAppSelector((s) => s.user.user);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const isDark = variant === "dark";

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } finally {
      dispatch(clearUser());
      navigate("/");
    }
  };

  const options = [
    ...(user?.role === "ADMIN"
      ? [{ title: "Dashboard", action: () => navigate("/dashboard") }]
      : []),
    { title: "Reservations", action: () => navigate("/user-home") },
    { title: "Logout", action: handleLogout },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: isDark ? "rgba(10,14,39,0.55)" : "white",
        backdropFilter: isDark ? "blur(8px)" : "none",
        borderBottom: isDark ? "none" : "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, md: 80 } }}>
        {/* LOGO */}
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
            sx={{ width: 50, height: 50, borderRadius: "50%" }}
          />
          <Typography
            fontWeight={900}
            letterSpacing={-1}
            color={isDark ? "white" : "black"}
          >
            STORM STAY
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {user ? (
          <>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Typography
                sx={{
                  color: isDark ? "white" : "black",
                  pr: 1,
                  fontWeight: 600,
                }}
              >
                Hello, {user.firstName}
              </Typography>
              <Avatar src={user.avatarUrl} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    mt: 1.5,
                    minWidth: 200,
                    borderRadius: 3,
                    bgcolor: "rgba(15,18,41,0.95)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
                  },
                },
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option.title}
                  onClick={() => {
                    setAnchorEl(null);
                    option.action();
                  }}
                  sx={{
                    py: 1.2,
                    px: 2.5,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.85)",
                    transition: "all 0.2s ease",
                    borderBottom:
                      index !== options.length - 1
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "none",
                    "&:hover": {
                      bgcolor: "rgba(255,107,53,0.12)",
                      color: "#FF6B35",
                    },
                  }}
                >
                  {option.title}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : showHomeButton ? (
          <Button sx={style} onClick={() => navigate("/")}>
            Home
          </Button>
        ) : (
          <Button onClick={() => navigate("/login")} sx={style}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

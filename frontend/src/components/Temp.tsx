import {
  AppBar,
  Button,
  Card,
  CardMedia,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import MenuIcon from "@mui/icons-material/Menu";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useNavigate } from "react-router-dom";
const IMAGE =
  "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg";
const ROOM =
  "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg";

export default function Temp() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={{ background: "transparent" }}>
        <Toolbar sx={{ minHeight: { xs: 64, md: 80 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#FF6B35 0%,#F7931E 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AutoAwesomeIcon sx={{ color: "white" }} />
            </Box>
            <Typography fontWeight={900} letterSpacing={1} color="white">
              STORM STAY
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            onClick={() => navigate("/login")}
            sx={{
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: 999,
              background: "linear-gradient(135deg,#FF6B35 0%,#F7931E 100%)",
              fontWeight: 700,
              textTransform: "none",
            }}
          >
            Login
          </Button>

          <IconButton sx={{ color: "white", ml: 2 }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Fade in unmountOnExit timeout={1000}>
        <Box component="div" display="flex" sx={{ flexDirection: "column" }}>
          <Box
            component="div"
            sx={{
              display: "flex",
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${IMAGE})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "250px",
              width: "100%",
              color: "white",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              padding: "20px 20px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontStyle: "italic",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              Our Rooms
            </Typography>
          </Box>

          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "400px",
              width: "100%",
              alignItems: "center",
              px: { xs: 2, md: 10 },
              py: 5,
              gap: 4,
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                width: "100%",
                maxWidth: 800,
                height: { xs: "auto", sm: 220 },
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: { xs: "100%", sm: 250 },
                  height: { xs: 200, sm: "100%" },
                  objectFit: "cover",
                }}
                image={ROOM}
                alt="Room"
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  p: { xs: 2, sm: 3 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      textTransform: "uppercase",
                      lineHeight: 1.2,
                    }}
                  >
                    Single Aurora Room
                    <hr />
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: 700 }}
                  >
                    $199
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: 0.5 }}
                    >
                      /night
                    </Typography>
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: { xs: 2, sm: 3 },
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    mb: 2,
                  }}
                >
                  Experience unparalleled comfort in our Aurora Room, featuring
                  floor-to-ceiling windows, premium linens, and a private
                  balcony overlooking the storm coastline.
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    mt: "auto",
                    background:
                      "linear-gradient(135deg,#FF6B35 0%,#F7931E 100%)",
                    color: "white",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: 2,
                    alignSelf: { xs: "stretch", sm: "flex-start" },
                    px: 4,
                  }}
                >
                  BOOK NOW
                </Button>
              </Box>
            </Card>
          </Box>
        </Box>
      </Fade>
    </>
  );
}

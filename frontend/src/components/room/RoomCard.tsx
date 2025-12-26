import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { Collapse, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import RoomModal from "./RoomModal";

export default function RoomCard() {
  const [expanded, setExpanded] = useState<boolean>(false);

  const room: Room = {
    roomNumber: "221",
    publicID: "",
    pricePerNight: 500,
    images: [
      "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg",
    ],
    roomDetails: {
      type: "SINGLE",
      description:
        "Perfect for solo business travelersect for solo business travelersect for solo business travelersect for solo business travelersect for solo business travelersect for solo business travelersect for solo business travelers.",
      amenities: ["WIFI", "TV", "SAFE"],
      maxCapacity: 1,
    },
  };

  return (
    <>
      {" "}
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => setExpanded(!expanded)}>
          <CardMedia
            component="img"
            height="160"
            image={room.images[0]}
            alt="Room image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {room.roomDetails.type}
            </Typography>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography variant="h6">Amenities</Typography>
              <List dense>
                {room.roomDetails.amenities.map((elt) => (
                  <ListItem key={elt}>
                    <ListItemText primary={elt} />
                  </ListItem>
                ))}
              </List>
            </Collapse>

            <Typography variant="body2" color="text.secondary">
              {room.roomDetails.description}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 2,
          }}
        >
          <Button size="small">Book</Button>
          <Typography variant="subtitle1">
            ${room.pricePerNight} / night
          </Typography>
        </CardActions>
      </Card>
      <RoomModal
        room={room}
        open={expanded}
        onClose={() => setExpanded(!expanded)}
      />
    </>
  );
}

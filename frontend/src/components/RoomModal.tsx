import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
  MobileStepper,
  Button,
} from "@mui/material";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Close from "@mui/icons-material/Close";

export default function RoomModal({
  room,
  open,
  onClose,
}: {
  room: Room;
  open: boolean;
  onClose: () => void;
}) {
  const images =
    [
          "https://picsum.photos/id/1018/600/400",
          "https://picsum.photos/id/1025/600/400",
          "https://picsum.photos/id/1035/600/400",
           "https://picsum.photos/id/1025/600/400",
          "https://picsum.photos/id/1035/600/400",
      
        ];

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, maxSteps - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}
    >
      <Card
        sx={{
          width: { xs: "100%", sm: 450, md: 500 },
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
        }}
      >
        {/* Sticky header */}
        <CardHeader
          title={room.roomDetails.type}
          subheader={`Room ${room.roomNumber}`}
          action={
            <>
            <Box sx={{display:"flex", justifyContent:"space-between",flexDirection:"column"}}>
 <Button onClick={onClose} sx={{bgcolor:"gray"}}> <Close/></Button>
            <Typography variant="h6" color="primary" fontWeight="bold">
              ${room.pricePerNight}/night
            </Typography>
            </Box>
            </>
          }
          sx={{
            position: "sticky",
            top: 0,
            bgcolor: "background.paper",
            zIndex: 1,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />

        <CardContent sx={{ overflowY: "auto", flex: 1 }}>
          {/* ✅ Image */}
          <Box
            component="img"
            src={images[activeStep]}
            alt="room"
            sx={{
              width: "100%",
              height: { xs: 180, sm: 220 },
              objectFit: "cover",
              borderRadius: 2,
              mb: 1,
            }}
          />

          {/* ✅ Stepper controls */}
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{ justifyContent: "center", mb: 2 }}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                Next <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                <KeyboardArrowLeft /> Back
              </Button>
            }
          />

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1">{room.roomDetails.description}</Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1">Amenities</Typography>
          <List dense>
            {room.roomDetails.amenities.map((elt) => (
              <ListItem key={elt}>
                <ListItemText primary={elt} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Modal>
  );
}

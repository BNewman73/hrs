import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  PickersDay,
  type PickersDayProps,
} from "@mui/x-date-pickers/PickersDay";
import { useGetRoomReservationsQuery } from "../../features/roomApi";
import {
  startOfMonth,
  endOfMonth,
  format,
  isWithinInterval,
  isSameDay,
} from "date-fns";

const COLORS: Record<string, string> = {
  available: "transparent",
  selected: "#ff9800",
  selectedBorder: "#0d47a1",
  selectedHover: "#ffac33",
  booked: "#d32f2f",
  blocked: "#d32f2f",
  white: "white",
  inherit: "inherit",
};

interface RoomCalendarProps {
  roomNumber: string;
}

const SimpleCalendar: React.FC<RoomCalendarProps> = ({ roomNumber }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  const startDate = useMemo(() => {
    return format(startOfMonth(currentMonth), "yyyy-MM-dd");
  }, [currentMonth]);

  const endDate = useMemo(() => {
    return format(endOfMonth(currentMonth), "yyyy-MM-dd");
  }, [currentMonth]);

  const {
    data: reservations,
    isLoading,
    error,
  } = useGetRoomReservationsQuery({
    roomNumber: roomNumber,
    startDate,
    endDate,
  });

  const getDateStatus = (date: Date): "available" | "booked" | "blocked" => {
    if (!reservations) return "available";

    for (const reservation of reservations) {
      const resStart = new Date(reservation.start + "T00:00:00");
      const resEnd = new Date(reservation.end + "T00:00:00");

      if (isWithinInterval(date, { start: resStart, end: resEnd })) {
        return reservation.type === "ADMIN_BLOCK" ? "blocked" : "booked";
      }
    }

    return "available";
  };

  const handleDateClick = (date: Date) => {
    const status = getDateStatus(date);
    if (status !== "available") {
      return;
    }
    if (!checkInDate) {
      setCheckInDate(date);
      setCheckOutDate(null);
      return;
    }
    if (!checkOutDate) {
      if (date > checkInDate) {
        setCheckOutDate(date);
      } else {
        setCheckInDate(date);
        setCheckOutDate(null);
      }
      return;
    }

    setCheckInDate(date);
    setCheckOutDate(null);
  };

  const CustomDay = (props: PickersDayProps) => {
    const { day, ...other } = props;
    const status = getDateStatus(day);

    const isCheckIn = checkInDate && isSameDay(day, checkInDate);
    const isCheckOut = checkOutDate && isSameDay(day, checkOutDate);

    let backgroundColor = COLORS.available;
    let color = COLORS.inherit;
    const border = "none";

    if (status === "booked" || status === "blocked") {
      backgroundColor = COLORS.booked;
      color = COLORS.white;
      /*} else if (status === "blocked") {
      backgroundColor = COLORS.blocked;
      color = COLORS.white; */
    } else if (isCheckIn || isCheckOut) {
      backgroundColor = COLORS.selected;
      color = COLORS.white;
    }

    return (
      <PickersDay
        {...other}
        day={day}
        onClick={() => handleDateClick(day)}
        disableHighlightToday={true}
        sx={{
          backgroundColor: `${backgroundColor} !important`,
          color: `${color} !important`,
          border,
          cursor: status === "available" ? "pointer" : "not-allowed",
          "&:hover": {
            backgroundColor:
              status === "available"
                ? `${COLORS.selectedHover} !important`
                : `${backgroundColor} !important`,
          },
        }}
      />
    );
  };

  const handleBooking = () => {
    if (checkInDate && checkOutDate) {
      console.log("Booking:", {
        roomNumber: roomNumber,
        checkIn: format(checkInDate, "yyyy-MM-dd"),
        checkOut: format(checkOutDate, "yyyy-MM-dd"),
      });
      alert(
        `Booking Room ${roomNumber}\nCheck-in: ${format(
          checkInDate,
          "MMM dd, yyyy"
        )}\nCheck-out: ${format(checkOutDate, "MMM dd, yyyy")}`
      );
    }
  };

  const handleReset = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  return (
    <Box color="secondary" sx={{ p: 3, maxWidth: 400, mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Chip label="Available" size="small" variant="outlined" />
        <Chip
          label="Selected"
          sx={{ backgroundColor: COLORS.selected, color: COLORS.white }}
          size="small"
        />
        {/*<Chip
          label="Booked"
          sx={{ backgroundColor: COLORS.booked, color: COLORS.white }}
          size="small"
        />*/}
        <Chip
          label="Unavailable"
          sx={{ backgroundColor: COLORS.blocked, color: COLORS.white }}
          size="small"
        />
      </Box>

      {/* Selected dates display */}
      <Box
        sx={{
          mb: 2,
          p: 2,
          backgroundColor: "secondary",
          border: 1,
          borderRadius: 5,
        }}
      >
        <Typography variant="body2" gutterBottom>
          <strong>Check-in:</strong>{" "}
          {checkInDate ? format(checkInDate, "MMM dd, yyyy") : "Not selected"}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Check-out:</strong>{" "}
          {checkOutDate ? format(checkOutDate, "MMM dd, yyyy") : "Not selected"}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleBooking}
            disabled={!checkInDate || !checkOutDate}
            fullWidth
          >
            Book Now
          </Button>
          <Button variant="outlined" size="small" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </Box>

      {isLoading && (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error">
          Failed to load availability. Please try again.
        </Alert>
      )}

      {!isLoading && !error && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar
            value={null}
            onChange={() => {}}
            onMonthChange={(newMonth) => setCurrentMonth(newMonth)}
            slots={{
              day: CustomDay,
            }}
          />
        </LocalizationProvider>
      )}
    </Box>
  );
};

export default SimpleCalendar;

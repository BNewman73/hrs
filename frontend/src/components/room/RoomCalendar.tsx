/**
 * RoomCalendar
 *
 * Interactive date picker/calendar used for booking or creating admin
 * blocks on a specific room. Displays availability and lets the user
 * select check-in and check-out dates.
 */
import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Button,
  IconButton,
  FormControl,
  Select,
  MenuItem,
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
import { useBooking } from "../../hooks/useBooking";
import { useCreateAdminBlockMutation } from "../../features/roomApi";
import { Add, Remove } from "@mui/icons-material";
import { useAppDispatch } from "../../shared/store/hooks";
import { showToast } from "../../features/toastSlice";

const COLORS: Record<string, string> = {
  available: "transparent",
  selected: "#ff9800",
  selectedBorder: "#0d47a1",
  selectedHover: "#ffac33",
  booked: "#d32f2f",
  blocked: "#d32f2f",
  white: "white",
  black: "black",
  inherit: "inherit",
};

interface RoomCalendarProps {
  roomNumber: string;
  pricePerNight?: number;
  capacity?: number;
  isBlock: boolean;
  onSuccess?: () => void;
}

/**
 * RoomCalendar component
 *
 * Props: `roomNumber`, `pricePerNight`, `capacity`, `isBlock` and an
 * optional `onSuccess` callback. Internally handles date selection and
 * booking/block actions.
 */
const SimpleCalendar: React.FC<RoomCalendarProps> = ({
  roomNumber,
  pricePerNight,
  capacity,
  isBlock,
  onSuccess,
}) => {
  const { bookRoom } = useBooking();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number>(1);
  const [blockReason, setBlockReason] = useState<string>("");

  const startDate = useMemo(() => {
    return format(startOfMonth(currentMonth), "yyyy-MM-dd");
  }, [currentMonth]);

  const endDate = useMemo(() => {
    return format(endOfMonth(currentMonth), "yyyy-MM-dd");
  }, [currentMonth]);

  const {
    data: reservations,
    isLoading: reservationsLoading,
    error,
  } = useGetRoomReservationsQuery({
    roomNumber: roomNumber,
    startDate,
    endDate,
  });

  const [createAdminBlock] = useCreateAdminBlockMutation();

  const getDateStatus = (
    date: Date,
  ): "past" | "available" | "booked" | "blocked" => {
    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
    if (isPast) return "past";
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
  const handleBooking = async () => {
    if (checkInDate && checkOutDate)
      await bookRoom({
        roomNumber,
        roomPricePerNight: pricePerNight!,
        checkInDate: format(checkInDate, "yyyy-MM-dd"),
        checkOutDate: format(checkOutDate, "yyyy-MM-dd"),
        guests,
      });
  };

  const dispatch = useAppDispatch();
  const handleBlock = async () => {
    if (checkInDate && checkOutDate) {
      try {
        await createAdminBlock({
          roomId: roomNumber,
          startDate: format(checkInDate, "yyyy-MM-dd"),
          endDate: format(checkOutDate, "yyyy-MM-dd"),
          blockReason: blockReason,
        }).unwrap();
        dispatch(
          showToast({
            message: `Block created successfully!`,
            severity: "success",
          }),
        );
        handleReset();
        if (onSuccess) onSuccess();
      } catch {
        dispatch(
          showToast({
            message: `Error occurred creating the block!`,
            severity: "error",
          }),
        );
      }
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            // justifyContent: "space-between"
          }}
        >
          <Typography variant="body2">
            <strong>{isBlock ? "Reason:" : "Guests:"}</strong>
          </Typography>
          {!isBlock ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                maxHeight: 10,
              }}
            >
              <IconButton
                size="small"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                disabled={guests == 1}
              >
                <Remove fontSize="small" />
              </IconButton>
              <Typography
                variant="body2"
                sx={{ minWidth: 30, textAlign: "center" }}
              >
                {guests}
              </Typography>
              <IconButton
                size="small"
                onClick={() => setGuests(Math.min(capacity!, guests + 1))}
                disabled={guests == capacity}
              >
                <Add fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <FormControl variant="standard" size="small" sx={{ width: 110 }}>
              <Select
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                disableUnderline
                sx={{
                  pt: "5px",
                  fontSize: "0.9rem",
                  height: 20,
                }}
              >
                <MenuItem sx={{ fontSize: "0.8rem" }} value="CLEANING">
                  Cleaning
                </MenuItem>
                <MenuItem sx={{ fontSize: "0.8rem" }} value="MAINTENANCE">
                  Maintenance
                </MenuItem>
                <MenuItem sx={{ fontSize: "0.8rem" }} value="REPAIR">
                  Repair
                </MenuItem>
                <MenuItem sx={{ fontSize: "0.8rem" }} value="RENOVATION">
                  Renovation
                </MenuItem>
                <MenuItem sx={{ fontSize: "0.8rem" }} value="OTHER">
                  Other
                </MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={isBlock ? handleBlock : handleBooking}
            disabled={
              !checkInDate || !checkOutDate || (isBlock ? !blockReason : false)
            }
            fullWidth
          >
            {isBlock ? "Create Block" : "Book Now"}
          </Button>
          <Button variant="outlined" size="small" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </Box>

      {reservationsLoading && (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error">
          Failed to load availability. Please try again.
        </Alert>
      )}

      {!reservationsLoading && !error && (
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

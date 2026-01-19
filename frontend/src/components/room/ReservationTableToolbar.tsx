import { Box, TextField, Button, MenuItem, Stack, Modal } from "@mui/material";
import RoomCalendar from "../reservations/RoomCalendar";
import { useState } from "react";

interface Props {
  searchQuery: string;
  onSearchChange: (v: string) => void;

  typeFilter: ReservationTypeFilter;
  onTypeChange: (v: ReservationTypeFilter) => void;

  statusFilter: PaymentStatusFilter;
  onStatusChange: (v: PaymentStatusFilter) => void;

  sortOrder: ReservationSortOrder;
  onSortChange: (v: ReservationSortOrder) => void;

  isFiltered: boolean;
  onReset: () => void;
}

export function ReservationTableToolbar({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
  sortOrder,
  onSortChange,
  isFiltered,
  onReset,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [roomNumber, setRoomNumber] = useState<string>("");
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    height: 600,
    boxShadow: 24,
    overflow: "auto",
    borderRadius: "5px",
  };
  return (
    <Box sx={{ mb: 3 }}>
      <Stack spacing={2}>
        {/* SEARCH – full width always */}
        <TextField
          size="small"
          fullWidth
          value={searchQuery}
          placeholder="Search room #..."
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {/* TYPE + STATUS */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            "& > *": { flex: 1 },
          }}
        >
          <TextField
            size="small"
            select
            label="Type"
            value={typeFilter}
            onChange={(e) =>
              onTypeChange(e.target.value as ReservationTypeFilter)
            }
            fullWidth
          >
            <MenuItem value="ALL">All</MenuItem>
            <MenuItem value="GUEST_BOOKING">Guest</MenuItem>
            <MenuItem value="BLOCKED">Blocked</MenuItem>
          </TextField>

          <TextField
            size="small"
            select
            label="Status"
            value={statusFilter}
            onChange={(e) =>
              onStatusChange(e.target.value as PaymentStatusFilter)
            }
            fullWidth
          >
            <MenuItem value="ALL">All</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="refunded">Canceled</MenuItem>
          </TextField>
        </Stack>

        {/* SORT + RESET */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            "& > *": { flex: 1 },
          }}
        >
          <TextField
            size="small"
            select
            label="Sort"
            value={sortOrder}
            onChange={(e) =>
              onSortChange(e.target.value as ReservationSortOrder)
            }
            fullWidth
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="date_asc">Date ↑</MenuItem>
            <MenuItem value="date_desc">Date ↓</MenuItem>
          </TextField>

          {isFiltered ? (
            <Button
              onClick={onReset}
              variant="outlined"
              sx={{ height: "40px", whiteSpace: "nowrap" }}
            >
              Reset
            </Button>
          ) : (
            <Box />
          )}
          <Button sx={{ border: "2px solid" }} onClick={() => setOpen(true)}>
            {" "}
            Create Block
          </Button>

          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <TextField
                fullWidth
                label="Enter a Room Number to Create a Admin Block:"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
                sx={{ mt: 2, padding: "0px 10px" }}
              />
              <RoomCalendar
                roomNumber={roomNumber}
                isBlock={true}
                onSuccess={handleClose}
              />
            </Box>
          </Modal>
        </Stack>
      </Stack>
    </Box>
  );
}

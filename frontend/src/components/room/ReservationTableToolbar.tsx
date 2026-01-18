import { Box, TextField, Button, MenuItem, Stack } from "@mui/material";

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
        </Stack>
      </Stack>
    </Box>
  );
}

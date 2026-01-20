/**
 * TransactionTableToolbar
 *
 * Toolbar controls for the transactions table: search input, status filter,
 * date sort selector and an optional reset button. All interactions are
 * delegated to callbacks provided via props.
 *
 * Props interface `Props` describes the shape and callbacks expected.
 */
import {
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface Props {
  searchQuery: string;
  onSearchChange: (v: string) => void;

  statusFilter: TransactionStatusFilter;
  onStatusChange: (v: TransactionStatusFilter) => void;

  sortOrder: TransactionSortOrder;
  onSortChange: (v: TransactionSortOrder) => void;

  isFiltered: boolean;
  onReset: () => void;
}

/**
 * TransactionTableToolbar component
 *
 * Controlled toolbar component used by `TransactionsTable` to manage
 * filtering and sorting state. This is a presentational component that
 * forwards user interactions via the provided callbacks.
 */
export const TransactionTableToolbar = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortOrder,
  onSortChange,
  isFiltered,
  onReset,
}: Props) => (
  <Box
    sx={{
      mb: 3,
      display: "flex",
      flexWrap: "wrap",
      gap: { xs: 1.5, sm: 2 },
      alignItems: "center",
    }}
  >
    {/* SEARCH */}
    <TextField
      size="small"
      sx={{
        bgcolor: "white",
        borderRadius: "8px",
        flex: { xs: "1 1 100%", md: "1 1 300px" },
      }}
      placeholder="Search payment ID or email..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        },
      }}
    />

    {/* FILTERS */}
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        flex: { xs: "1 1 100%", md: "0 1 auto" },
        flexWrap: "wrap",
      }}
    >
      {/* STATUS */}
      <FormControl
        size="small"
        sx={{
          minWidth: { xs: "calc(50% - 12px)", sm: 160 },
          bgcolor: "white",
        }}
      >
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          label="Status"
          onChange={(e) =>
            onStatusChange(e.target.value as TransactionStatusFilter)
          }
        >
          <MenuItem value="ALL">All</MenuItem>
          <MenuItem value="succeeded">Succeeded</MenuItem>
          <MenuItem value="failed">Failed</MenuItem>
          <MenuItem value="canceled">Canceled</MenuItem>
          <MenuItem value="refunded">Refunded</MenuItem>
        </Select>
      </FormControl>

      {/* SORT */}
      <FormControl
        size="small"
        sx={{
          minWidth: { xs: "calc(50% - 12px)", sm: 160 },
          bgcolor: "white",
        }}
      >
        <InputLabel>Date</InputLabel>
        <Select
          value={sortOrder}
          label="Date"
          onChange={(e) => onSortChange(e.target.value as TransactionSortOrder)}
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="date_desc">Newest → Oldest</MenuItem>
          <MenuItem value="date_asc">Oldest → Newest</MenuItem>
        </Select>
      </FormControl>

      {/* RESET */}
      {isFiltered && (
        <Button
          variant="text"
          color="error"
          size="small"
          startIcon={<RestartAltIcon />}
          onClick={onReset}
        >
          Reset
        </Button>
      )}
    </Box>
  </Box>
);

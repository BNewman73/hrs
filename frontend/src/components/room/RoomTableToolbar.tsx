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

type SortOrder = "asc" | "desc" | "none";

interface ToolbarProps {
  isFiltered: boolean;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  typeFilter: RoomType | "ALL";
  onTypeChange: (val: RoomType | "ALL") => void;
  sortOrder: SortOrder;
  onSortChange: (val: SortOrder) => void;
  onReset: () => void;
}

export const RoomTableToolbar = ({ isFiltered, ...p }: ToolbarProps) => (
  <Box
    sx={{
      mb: 3,
      display: "flex",
      flexWrap: "wrap",
      gap: { xs: 1.5, sm: 2 },
      alignItems: "center",
    }}
  >
    <TextField
      size="small"
      sx={{
        bgcolor: "white",
        borderRadius: "8px",
        flex: { xs: "1 1 100%", md: "1 1 300px" },
      }}
      placeholder="Search room #..."
      value={p.searchQuery}
      onChange={(e) => p.onSearchChange(e.target.value)}
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

    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        flex: { xs: "1 1 100%", md: "0 1 auto" },
        justifyContent: { xs: "space-between", md: "flex-start" },
        flexWrap: "wrap",
      }}
    >
      <FormControl
        size="small"
        sx={{ minWidth: { xs: "calc(50% - 12px)", sm: 130 }, bgcolor: "white" }}
      >
        <InputLabel>Type</InputLabel>
        <Select
          value={p.typeFilter}
          label="Type"
          onChange={(e) => p.onTypeChange(e.target.value as RoomType | "ALL")}
        >
          <MenuItem value="ALL">All Types</MenuItem>
          {["SINGLE", "DOUBLE", "DELUXE", "SUITE"].map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        size="small"
        sx={{ minWidth: { xs: "calc(50% - 12px)", sm: 120 }, bgcolor: "white" }}
      >
        <InputLabel>Price</InputLabel>
        <Select
          value={p.sortOrder}
          label="Price"
          onChange={(e) => p.onSortChange(e.target.value as SortOrder)}
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="asc">Low to High</MenuItem>
          <MenuItem value="desc">High to Low</MenuItem>
        </Select>
      </FormControl>

      {isFiltered && (
        <Button
          variant="text"
          color="error"
          size="small"
          startIcon={<RestartAltIcon />}
          onClick={p.onReset}
          sx={{ ml: { xs: 0, sm: "auto" } }}
        >
          Reset
        </Button>
      )}
    </Box>
  </Box>
);

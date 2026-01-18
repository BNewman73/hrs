import {
  Box,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
type UserRoleFilter = "ALL" | "ADMIN" | "MANAGER" | "GUEST";
type UserSortOrder = "none" | "name_asc" | "name_desc";

interface Props {
  searchQuery: string;
  onSearchChange: (v: string) => void;

  roleFilter: UserRoleFilter;
  onRoleChange: (v: UserRoleFilter) => void;

  sortOrder: UserSortOrder;
  onSortChange: (v: UserSortOrder) => void;

  isFiltered: boolean;
  onReset: () => void;
}

export function UserTableToolbar({
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleChange,
  sortOrder,
  onSortChange,
  isFiltered,
  onReset,
}: Props) {
  return (
    <Box sx={{ mb: 3 }}>
      {/* SEARCH */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search name or email..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      {/* FILTERS */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            sm: "auto auto auto",
          },
          gap: 1.5,
          alignItems: "center",
        }}
      >
        <TextField
          size="small"
          select
          label="Role"
          value={roleFilter}
          onChange={(e) => onRoleChange(e.target.value as UserRoleFilter)}
        >
          <MenuItem value="ALL">All</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
          <MenuItem value="MANAGER">Manager</MenuItem>
          <MenuItem value="GUEST">Guest</MenuItem>
        </TextField>

        <TextField
          size="small"
          select
          label="Sort"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value as UserSortOrder)}
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="name_asc">Name A–Z</MenuItem>
          <MenuItem value="name_desc">Name Z–A</MenuItem>
        </TextField>

        {isFiltered && (
          <Button
            size="small"
            color="error"
            startIcon={<RestartAltIcon />}
            onClick={onReset}
            sx={{
              justifySelf: { xs: "stretch", sm: "flex-start" },
            }}
          >
            Reset
          </Button>
        )}
      </Box>
    </Box>
  );
}

/**
 * EntityTable
 *
 * Generic presentational table used across the admin UI to render lists of
 * entities. Accepts column metadata, rows, pagination state and a
 * `renderRow` callback to produce each row's content.
 */
import {
  Box,
  Paper,
  Typography,
  List,
  TablePagination,
  CircularProgress,
} from "@mui/material";

interface TitleColumn {
  label: string;
  width: string | number | { xs?: string; sm?: string };
  hideOnMobile?: boolean;
}

interface EntityTableProps<T> {
  titleColumns: TitleColumn[];
  rows: T[];
  renderRow: (row: T) => React.ReactNode;
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (p: number) => void;
  onRowsPerPageChange: (n: number) => void;
  emptyMessage?: string;
  isLoading: boolean;
}

export function EntityTable<T>({
  titleColumns,
  rows,
  renderRow,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  emptyMessage = "No records found.",
  isLoading,
}: EntityTableProps<T>) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          bgcolor: "#fcfcfc",
          p: 2,
          borderBottom: "1px solid #eee",
        }}
      >
        {titleColumns.map((c) => (
          <Typography
            key={c.label}
            sx={{
              width: c.width,
              fontWeight: 800,
              fontSize: "0.75rem",
              color: "text.secondary",
              textTransform: "uppercase",
              display: c.hideOnMobile ? { xs: "none", sm: "block" } : "block",
            }}
          >
            {c.label}
          </Typography>
        ))}
      </Box>

      {/* ROWS */}
      <List disablePadding>
        {rows.map(renderRow)}

        {isLoading ? (
          <Box sx={{ p: 6, textAlign: "center" }}>
            <CircularProgress size="3rem" />
          </Box>
        ) : (
          rows.length === 0 && (
            <Box sx={{ p: 6, textAlign: "center" }}>
              <Typography color="text.secondary">{emptyMessage}</Typography>
            </Box>
          )
        )}
      </List>

      {/* PAGINATION */}
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={(_, p) => onPageChange(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) =>
          onRowsPerPageChange(parseInt(e.target.value, 10))
        }
        rowsPerPageOptions={[5, 10, 25]}
        sx={{ borderTop: "1px solid #eee" }}
      />
    </Paper>
  );
}

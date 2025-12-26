import { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  List,
  Modal,
  useTheme,
  useMediaQuery,
  TablePagination,
} from "@mui/material";
import { useRoomTable } from "../../hooks/useRoomTable";
import { RoomItem } from "./RoomItem";
import { RoomTableToolbar } from "./RoomTableToolbar";
import RoomCrudForm from "./RoomCrudForm";

// Define the grid proportions to ensure header and items align perfectly
const GRID_CONFIG = {
  roomNo: { xs: "40%", sm: "30%" },
  price: { xs: "35%", sm: "30%" },
  category: "25%",
  actions: "80px",
};

export default function RoomTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const logic = useRoomTable();

  const [expanded, setExpanded] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomDTO>();

  return (
    <Box sx={{ width: "100%" }}>
      <RoomTableToolbar
        isFiltered={logic.isFiltered}
        searchQuery={logic.searchQuery}
        onSearchChange={logic.setSearchQuery}
        typeFilter={logic.typeFilter}
        onTypeChange={logic.setTypeFilter}
        sortOrder={logic.sortOrder}
        onSortChange={logic.setSortOrder}
        onReset={logic.handleReset}
      />

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        {/* HEADER GRID */}
        <Box
          sx={{
            display: "flex",
            bgcolor: "#fcfcfc",
            p: 2,
            borderBottom: "1px solid #eee",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              width: GRID_CONFIG.roomNo,
              fontWeight: 800,
              fontSize: "0.75rem",
              color: "text.secondary",
              textTransform: "uppercase",
            }}
          >
            Room
          </Typography>
          <Typography
            sx={{
              width: GRID_CONFIG.price,
              fontWeight: 800,
              fontSize: "0.75rem",
              color: "text.secondary",
              textTransform: "uppercase",
            }}
          >
            Price
          </Typography>
          <Typography
            sx={{
              width: GRID_CONFIG.category,
              fontWeight: 800,
              fontSize: "0.75rem",
              color: "text.secondary",
              textTransform: "uppercase",
              display: { xs: "none", sm: "block" }, // Hides header on mobile
            }}
          >
            Category
          </Typography>
          <Typography
            sx={{
              width: GRID_CONFIG.actions,
              textAlign: "center",
              fontWeight: 800,
              fontSize: "0.75rem",
              color: "text.secondary",
              textTransform: "uppercase",
            }}
          >
            Edit
          </Typography>
        </Box>

        {/* DATA LIST */}
        <List disablePadding>
          {logic.rooms.map((room) => (
            <RoomItem
              key={room.roomNumber}
              room={room}
              gridConfig={GRID_CONFIG}
              isExpanded={expanded === room.roomNumber}
              onToggle={() =>
                setExpanded(
                  expanded === room.roomNumber ? null : room.roomNumber
                )
              }
              onEdit={() => {
                setSelectedRoom({
                  ...room,
                  roomType: room.roomDetails.type as RoomType,
                });
                setModalOpen(true);
              }}
            />
          ))}
          {logic.rooms.length === 0 && (
            <Box sx={{ p: 6, textAlign: "center" }}>
              <Typography color="text.secondary">
                No matching rooms found.
              </Typography>
            </Box>
          )}
        </List>

        <TablePagination
          component="div"
          count={logic.totalCount}
          page={logic.page}
          onPageChange={(_, p) => logic.setPage(p)}
          rowsPerPage={logic.rowsPerPage}
          onRowsPerPageChange={(e) =>
            logic.setRowsPerPage(parseInt(e.target.value, 10))
          }
          rowsPerPageOptions={isMobile ? [5, 10] : [5, 10, 25]}
          sx={{
            borderTop: "1px solid #eee",
            "& .MuiTablePagination-toolbar": {
              flexWrap: isMobile ? "wrap" : "nowrap",
            },
          }}
        />
      </Paper>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box sx={{ outline: "none", width: "100%", maxWidth: 500 }}>
          <RoomCrudForm
            props={selectedRoom}
            crud="Update"
            onClose={() => setModalOpen(false)}
          />
        </Box>
      </Modal>
    </Box>
  );
}

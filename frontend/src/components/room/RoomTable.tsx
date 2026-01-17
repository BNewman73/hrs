import { useState } from "react";
import { Box, Modal } from "@mui/material";
import { EntityTable } from "./EntityTable";
import { RoomRow } from "./RoomRow";
import { useRoomTable } from "../../hooks/useRoomTable";
import { RoomTableToolbar } from "./RoomTableToolbar";
import RoomCrudForm from "./RoomCrudForm";

const GRID_CONFIG = {
  roomNo: { xs: "40%", sm: "30%" },
  price: { xs: "35%", sm: "30%" },
  category: "25%",
  actions: "80px",
};

export default function RoomTable() {
  const logic = useRoomTable();

  const [expanded, setExpanded] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomDTO>();

  return (
    <Box>
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

      <EntityTable
        titleColumns={[
          { label: "Room", width: GRID_CONFIG.roomNo },
          { label: "Price", width: GRID_CONFIG.price },
          {
            label: "Category",
            width: GRID_CONFIG.category,
            hideOnMobile: true,
          },
          { label: "Edit", width: GRID_CONFIG.actions },
        ]}
        rows={logic.rooms}
        totalCount={logic.totalCount}
        page={logic.page}
        rowsPerPage={logic.rowsPerPage}
        onPageChange={logic.setPage}
        onRowsPerPageChange={logic.setRowsPerPage}
        isLoading={logic.isLoading}
        renderRow={(room) => (
          <RoomRow
            key={room.roomNumber}
            room={room}
            gridConfig={GRID_CONFIG}
            isExpanded={expanded === room.roomNumber}
            onToggle={() =>
              setExpanded(expanded === room.roomNumber ? null : room.roomNumber)
            }
            onEdit={() => {
              setSelectedRoom({
                ...room,
                roomType: room.roomDetails.type,
              });
              setModalOpen(true);
            }}
          />
        )}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 10 }}>
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

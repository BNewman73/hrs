import { useState } from "react";
import { Box } from "@mui/material";
import { EntityTable } from "./EntityTable";
import { ReservationRow } from "./ReservationRow";
import { useGetAllReservationsQuery } from "../../features/reservationApi";

const GRID_CONFIG = {
  room: "20%",
  dates: "35%",
  type: "20%",
  status: "15%",
  expand: "10%",
};

export default function ReservationTable() {
  const { data: reservations = [], isLoading } = useGetAllReservationsQuery();

  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const paginated = reservations.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%" }}>
      <EntityTable
        titleColumns={[
          { label: "Room", width: GRID_CONFIG.room },
          { label: "Dates", width: GRID_CONFIG.dates },
          { label: "Type", width: GRID_CONFIG.type },
          { label: "Status", width: GRID_CONFIG.status },
          { label: "", width: GRID_CONFIG.expand },
        ]}
        rows={paginated}
        totalCount={reservations.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        emptyMessage="No reservations found."
        isLoading={isLoading}
        renderRow={(reservation) => (
          <ReservationRow
            key={reservation.id}
            reservation={reservation}
            isExpanded={expanded === reservation.id}
            onToggle={() =>
              setExpanded(expanded === reservation.id ? null : reservation.id)
            }
          />
        )}
      />
    </Box>
  );
}

/**
 * ReservationTable
 *
 * Admin-facing reservations table with search, filtering and expandable
 * reservation rows. Fetches reservation+guest data and delegates row
 * rendering to `ReservationRow`.
 */
import { useState, useMemo } from "react";
import { Box } from "@mui/material";
import { EntityTable } from "../EntityTable";
import { ReservationRow } from "./ReservationRow";
import { ReservationTableToolbar } from "./ReservationTableToolbar";
import { useGetAllReservationsWithGuestQuery } from "../../features/reservationApi";

const GRID_CONFIG = {
  room: "20%",
  dates: "35%",
  type: "20%",
  status: "15%",
  expand: "10%",
};

/**
 * ReservationTable component
 *
 * Renders the admin reservation listing. No props.
 */
export default function ReservationTable() {
  const { data: reservations = [], isLoading } =
    useGetAllReservationsWithGuestQuery();

  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ReservationTypeFilter>("ALL");
  const [statusFilter, setStatusFilter] = useState<PaymentStatusFilter>("ALL");
  const [sortOrder, setSortOrder] = useState<ReservationSortOrder>("none");

  const filteredAndSorted = useMemo(() => {
    let result = [...reservations];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((r) =>
        r.reservation.roomId.toLowerCase().includes(q),
      );
    }

    if (typeFilter !== "ALL") {
      result = result.filter((r) => r.reservation.type === typeFilter);
    }

    if (statusFilter !== "ALL") {
      result = result.filter(
        (r) => r.reservation.paymentStatus === statusFilter,
      );
    }

    if (sortOrder !== "none") {
      result.sort((a, b) =>
        sortOrder === "date_asc"
          ? new Date(a.reservation.startDate).getTime() -
            new Date(b.reservation.startDate).getTime()
          : new Date(b.reservation.startDate).getTime() -
            new Date(a.reservation.startDate).getTime(),
      );
    }

    return result;
  }, [reservations, searchQuery, typeFilter, statusFilter, sortOrder]);

  const paginated = filteredAndSorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Box>
      <ReservationTableToolbar
        searchQuery={searchQuery}
        onSearchChange={(v) => {
          setSearchQuery(v);
          setPage(0);
        }}
        typeFilter={typeFilter}
        onTypeChange={(v) => {
          setTypeFilter(v);
          setPage(0);
        }}
        statusFilter={statusFilter}
        onStatusChange={(v) => {
          setStatusFilter(v);
          setPage(0);
        }}
        sortOrder={sortOrder}
        onSortChange={(v) => {
          setSortOrder(v);
          setPage(0);
        }}
        isFiltered={
          searchQuery !== "" ||
          typeFilter !== "ALL" ||
          statusFilter !== "ALL" ||
          sortOrder !== "none"
        }
        onReset={() => {
          setSearchQuery("");
          setTypeFilter("ALL");
          setStatusFilter("ALL");
          setSortOrder("none");
          setPage(0);
        }}
      />

      <EntityTable
        titleColumns={[
          { label: "Room", width: { xs: "40%", sm: GRID_CONFIG.room } },
          { label: "Dates", width: GRID_CONFIG.dates, hideOnMobile: true },
          { label: "Type", width: GRID_CONFIG.type, hideOnMobile: true },
          {
            label: "Status",
            width: { xs: "40%", sm: GRID_CONFIG.status },
          },
          { label: "", width: GRID_CONFIG.expand },
        ]}
        rows={paginated}
        totalCount={filteredAndSorted.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        emptyMessage="No reservations found."
        isLoading={isLoading}
        renderRow={(row) => (
          <ReservationRow
            key={row.reservation.id}
            reservation={row}
            isExpanded={expanded === row.reservation.id}
            onToggle={() =>
              setExpanded(
                expanded === row.reservation.id ? null : row.reservation.id,
              )
            }
          />
        )}
      />
    </Box>
  );
}

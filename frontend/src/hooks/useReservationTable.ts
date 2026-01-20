/**
 * Hook to provide paginated, filtered reservation data for table views.
 *
 * It consumes `useGetAllReservationsQuery` and exposes helpers for
 * searching, filtering, paging and resetting the table state.
 *
 * @returns An object with reservation page data and controls used by table components.
 */
import { useMemo, useState } from "react";
import { useGetAllReservationsQuery } from "../features/reservationApi";

type ReservationTypeFilter = "ALL" | "GUEST_BOOKING" | "BLOCKED";
type PaymentStatusFilter = "ALL" | "paid" | "refunded";

export function useReservationTable() {
  const {
    data: rawReservations = [],
    isLoading,
    isError,
  } = useGetAllReservationsQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ReservationTypeFilter>("ALL");
  const [statusFilter, setStatusFilter] = useState<PaymentStatusFilter>("ALL");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filtered = useMemo(() => {
    let result = [...rawReservations];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.roomId.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q) ||
          r.blockReason?.toLowerCase().includes(q),
      );
    }

    if (typeFilter !== "ALL") {
      result = result.filter((r) => r.type === typeFilter);
    }

    if (statusFilter !== "ALL") {
      result = result.filter((r) => r.paymentStatus === statusFilter);
    }

    return result;
  }, [rawReservations, searchQuery, typeFilter, statusFilter]);

  const paginated = useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  const handleReset = () => {
    setSearchQuery("");
    setTypeFilter("ALL");
    setStatusFilter("ALL");
    setPage(0);
  };

  return {
    reservations: paginated,
    totalCount: filtered.length,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,

    searchQuery,
    setSearchQuery: (v: string) => {
      setSearchQuery(v);
      setPage(0);
    },

    typeFilter,
    setTypeFilter: (v: ReservationTypeFilter) => {
      setTypeFilter(v);
      setPage(0);
    },

    statusFilter,
    setStatusFilter: (v: PaymentStatusFilter) => {
      setStatusFilter(v);
      setPage(0);
    },

    handleReset,

    isLoading,
    isError,

    isFiltered:
      searchQuery !== "" || typeFilter !== "ALL" || statusFilter !== "ALL",
  };
}

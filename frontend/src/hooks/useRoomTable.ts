/**
 * Hook that prepares room data for table/list views.
 *
 * It handles searching, filtering by room type, sorting, pagination and
 * exposes simple setters for UI controls.
 *
 * @returns An object containing the current page of rooms and control handlers.
 */
import { useState, useMemo } from "react";
import { useGetAllRoomsQuery } from "../features/roomApi";
import { RoomType } from "../types/enum";

const collator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

type SortOrder = "asc" | "desc" | "none";

export function useRoomTable() {
  const { data: rawRooms = [], isLoading, isError } = useGetAllRoomsQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const [typeFilter, setTypeFilter] = useState<RoomType | "ALL">("ALL");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredAndSorted = useMemo(() => {
    let result = [...rawRooms].sort((a, b) =>
      collator.compare(a.roomNumber, b.roomNumber),
    );

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.roomNumber.toLowerCase().includes(q) ||
          r.roomDetails.type.toLowerCase().includes(q),
      );
    }

    if (typeFilter !== "ALL") {
      result = result.filter((r) => r.roomDetails.type === typeFilter);
    }

    if (sortOrder !== "none") {
      result.sort((a, b) =>
        sortOrder === "asc"
          ? a.pricePerNight - b.pricePerNight
          : b.pricePerNight - a.pricePerNight,
      );
    }

    return result;
  }, [rawRooms, searchQuery, sortOrder, typeFilter]);

  const paginated = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredAndSorted.slice(start, start + rowsPerPage);
  }, [filteredAndSorted, page, rowsPerPage]);

  const handleReset = () => {
    setSearchQuery("");
    setSortOrder("none");
    setTypeFilter("ALL");
    setPage(0);
  };

  return {
    rooms: paginated,
    totalCount: filteredAndSorted.length,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    searchQuery,
    setSearchQuery: (val: string) => {
      setSearchQuery(val);
      setPage(0);
    },
    sortOrder,
    setSortOrder: (val: SortOrder) => {
      setSortOrder(val);
      setPage(0);
    },
    typeFilter,
    setTypeFilter: (val: RoomType | "ALL") => {
      setTypeFilter(val);
      setPage(0);
    },
    handleReset,
    isLoading,
    isError,

    isFiltered:
      searchQuery !== "" || sortOrder !== "none" || typeFilter !== "ALL",
  };
}

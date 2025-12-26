import { useState, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../shared/store/hooks";
import { fetchRooms } from "../features/roomSlice";
import { showToast } from "../features/toastSlice";

const collator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});
type SortOrder = "asc" | "desc" | "none";

export function useRoomTable() {
  const dispatch = useAppDispatch();
  const rawRooms = useAppSelector((state) => state.room.items);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [typeFilter, setTypeFilter] = useState<RoomType | "ALL">("ALL");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchRooms())
      .unwrap()
      .catch(() =>
        dispatch(showToast({ message: "Sync failed", severity: "error" }))
      );
  }, [dispatch]);

  const filteredAndSorted = useMemo(() => {
    let result = [...rawRooms].sort((a, b) =>
      collator.compare(a.roomNumber, b.roomNumber)
    );

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.roomNumber.toLowerCase().includes(q) ||
          r.roomDetails.type.toLowerCase().includes(q)
      );
    }
    if (typeFilter !== "ALL")
      result = result.filter((r) => r.roomDetails.type === typeFilter);
    if (sortOrder !== "none") {
      result.sort((a, b) =>
        sortOrder === "asc"
          ? a.pricePerNight - b.pricePerNight
          : b.pricePerNight - a.pricePerNight
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
    isFiltered:
      searchQuery !== "" || sortOrder !== "none" || typeFilter !== "ALL",
  };
}

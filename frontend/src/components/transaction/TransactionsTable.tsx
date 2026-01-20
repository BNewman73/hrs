/**
 * TransactionsTable
 *
 * Displays a paginated, searchable table of payment transactions using
 * `EntityTable`. Includes toolbar controls for searching, filtering by
 * status, and sorting. Rows are rendered with `TransactionRow` and the
 * toolbar is provided by `TransactionTableToolbar`.
 *
 * Usage:
 * ```tsx
 * <TransactionsTable />
 * ```
 */
import { Box } from "@mui/material";
import { useState, useMemo } from "react";
import { EntityTable } from "../EntityTable";
import { TransactionRow } from "./TransactionRow";
import { useGetTransactionsQuery } from "../../features/roomApi";
import { TransactionTableToolbar } from "./TransactionTableToolbar";

/**
 * TransactionsTable component
 *
 * Fetches transactions via `useGetTransactionsQuery`, applies client-side
 * filtering, sorting and pagination, and renders the table UI.
 */
export default function TransactionsTable() {
  const { data: transactions = [], isLoading } = useGetTransactionsQuery();

  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<TransactionStatusFilter>("ALL");
  const [sortOrder, setSortOrder] = useState<TransactionSortOrder>("none");

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.paymentIntentId.toLowerCase().includes(q) ||
          t.customerEmail?.toLowerCase().includes(q),
      );
    }

    if (statusFilter !== "ALL") {
      result = result.filter((t) => t.status === statusFilter);
    }

    if (sortOrder !== "none") {
      result.sort((a, b) =>
        sortOrder === "date_asc"
          ? new Date(a.created).getTime() - new Date(b.created).getTime()
          : new Date(b.created).getTime() - new Date(a.created).getTime(),
      );
    }

    return result;
  }, [transactions, searchQuery, statusFilter, sortOrder]);

  const paginated = useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  return (
    <Box>
      <TransactionTableToolbar
        searchQuery={searchQuery}
        onSearchChange={(v) => {
          setSearchQuery(v);
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
          searchQuery !== "" || statusFilter !== "ALL" || sortOrder !== "none"
        }
        onReset={() => {
          setSearchQuery("");
          setStatusFilter("ALL");
          setSortOrder("none");
          setPage(0);
        }}
      />

      <EntityTable
        titleColumns={[
          { label: "Payment ID", width: "35%" },
          { label: "Date", width: "25%", hideOnMobile: true },
          { label: "Amount", width: "20%" },
          { label: "Status", width: "15%" },
          { label: "", width: "5%" },
        ]}
        rows={paginated}
        totalCount={filtered.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={(n) => {
          setRowsPerPage(n);
          setPage(0);
        }}
        isLoading={isLoading}
        emptyMessage="No transactions found."
        renderRow={(row) => (
          <TransactionRow
            key={row.paymentIntentId}
            transaction={row}
            isExpanded={expanded === row.paymentIntentId}
            onToggle={() =>
              setExpanded(
                expanded === row.paymentIntentId ? null : row.paymentIntentId,
              )
            }
          />
        )}
      />
    </Box>
  );
}

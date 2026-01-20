/**
 * UserTable
 *
 * Admin users listing with search, filter and edit capabilities. Fetches
 * the list of users via `useGetAllUsersQuery` and supports updating a
 * selected user with `useUpdateUserMutation`.
 */
import { useState, useMemo } from "react";
import { Box, Modal } from "@mui/material";
import { EntityTable } from "../EntityTable";
import { UserRow } from "./UserRow";
import { UserTableToolbar } from "./UserTableToolbar";
import UserCrudForm from "./UserCrudForm";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../features/userApi";

const GRID_CONFIG = {
  name: { xs: "70%", sm: "35%" },
  email: "35%",
  role: "20%",
  actions: "80px",
};

type UserRoleFilter = "ALL" | "ADMIN" | "MANAGER" | "GUEST";
type UserSortOrder = "none" | "name_asc" | "name_desc";

/**
 * UserTable component
 *
 * Renders paginated user rows and manages the edit modal state. No props.
 */
export default function UserTable() {
  const { data: users = [], isLoading } = useGetAllUsersQuery();
  const [updateUser] = useUpdateUserMutation();

  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRoleFilter>("ALL");
  const [sortOrder, setSortOrder] = useState<UserSortOrder>("none");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null);

  const filteredAndSorted = useMemo(() => {
    let result = [...users];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q),
      );
    }

    if (roleFilter !== "ALL") {
      result = result.filter((u) => u.role === roleFilter);
    }

    if (sortOrder !== "none") {
      result.sort((a, b) => {
        const aName = `${a.firstName} ${a.lastName}`.toLowerCase();
        const bName = `${b.firstName} ${b.lastName}`.toLowerCase();
        return sortOrder === "name_asc"
          ? aName.localeCompare(bName)
          : bName.localeCompare(aName);
      });
    }

    return result;
  }, [users, searchQuery, roleFilter, sortOrder]);

  const paginated = useMemo(
    () =>
      filteredAndSorted.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [filteredAndSorted, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: "100%" }}>
      <UserTableToolbar
        searchQuery={searchQuery}
        onSearchChange={(v) => {
          setSearchQuery(v);
          setPage(0);
        }}
        roleFilter={roleFilter}
        onRoleChange={(v) => {
          setRoleFilter(v);
          setPage(0);
        }}
        sortOrder={sortOrder}
        onSortChange={(v) => {
          setSortOrder(v);
          setPage(0);
        }}
        isFiltered={
          searchQuery !== "" || roleFilter !== "ALL" || sortOrder !== "none"
        }
        onReset={() => {
          setSearchQuery("");
          setRoleFilter("ALL");
          setSortOrder("none");
          setPage(0);
        }}
      />

      <EntityTable
        titleColumns={[
          { label: "Name", width: GRID_CONFIG.name },
          { label: "Email", width: GRID_CONFIG.email, hideOnMobile: true },
          { label: "Role", width: GRID_CONFIG.role, hideOnMobile: true },
          { label: "Edit", width: GRID_CONFIG.actions },
        ]}
        rows={paginated}
        totalCount={filteredAndSorted.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        isLoading={isLoading}
        emptyMessage="No users found."
        renderRow={(user: UserDTO) => (
          <UserRow
            key={user.id}
            user={user}
            gridConfig={GRID_CONFIG}
            isExpanded={expanded === user.id}
            onToggle={() => setExpanded(expanded === user.id ? null : user.id)}
            onEdit={() => {
              setSelectedUser(user);
              setModalOpen(true);
            }}
          />
        )}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ maxWidth: 520, mx: "auto", mt: { xs: 6, sm: 10 } }}>
          {selectedUser && (
            <UserCrudForm
              user={selectedUser}
              onSubmit={(updated) => updateUser(updated)}
              onClose={() => setModalOpen(false)}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
}

/**
 * UserCrudForm
 *
 * Form used to edit a user's profile and role. This admin-facing form
 * accepts a `UserDTO`, allows editing fields and calls the provided
 * `onSubmit` callback with the updated user object.
 *
 * Props:
 * - `user`: UserDTO - the user to edit
 * - `onSubmit(user)`: callback invoked when form is submitted
 * - `onClose()`: callback to close the form/modal
 */
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/**
 * UserCrudForm component
 *
 * Controlled form component that manages local form state and forwards
 * the updated `UserDTO` via `onSubmit`.
 */
export default function UserCrudForm({
  user,
  onSubmit,
  onClose,
}: {
  user: UserDTO;
  onSubmit: (user: UserDTO) => void;
  onClose: () => void;
}) {
  const [formUser, setFormUser] = useState<UserDTO>({
    ...user,
  });

  const handleChange = <K extends keyof UserDTO>(
    field: K,
    value: UserDTO[K],
  ) => {
    setFormUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formUser);
    onClose();
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          bgcolor: "background.paper",
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h6" fontWeight={800}>
            Edit User
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "text.secondary" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Update user information and role.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          <TextField
            label="First Name"
            value={formUser.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            fullWidth
          />

          <TextField
            label="Last Name"
            value={formUser.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            fullWidth
          />

          <TextField
            label="Email"
            value={formUser.email}
            onChange={(e) => handleChange("email", e.target.value)}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={formUser.role}
              label="Role"
              disabled={formUser.role === "ADMIN" ? true : false}
              onChange={(e) => handleChange("role", e.target.value as UserRole)}
            >
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="MANAGER">Manager</MenuItem>
              <MenuItem value="GUEST">Guest</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ flex: 1, fontWeight: 700 }}
            >
              Save Changes
            </Button>
            <Button onClick={onClose} color="inherit">
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

/**
 * GuestAccountCard
 *
 * Similar to `AccountCard` but used for guest-facing profile editing. Loads
 * the principal, allows editing basic fields and persists updates.
 */
import type { ChangeEvent } from "react";
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import {
  useGetPrincipalQuery,
  useUpdateProfileMutation,
} from "../../features/userApi";
import { updateUserField } from "../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../shared/store/hooks";

export default function AccountCard() {
  const dispatch = useAppDispatch();

  useGetPrincipalQuery();

  const user = useAppSelector((state) => state.user.user);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  if (!user) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateUserField({
        field: e.target.name as
          | "firstName"
          | "lastName"
          | "email"
          | "avatarUrl",
        value: e.target.value,
      }),
    );
  };

  const handleSave = async () => {
    await updateProfile({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatarUrl: user.avatarUrl,
    });
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "300px 1fr" },
          gap: 4,
        }}
      >
        {/* Left */}
        <Box sx={{ textAlign: "center" }}>
          <Avatar
            src={user.avatarUrl}
            sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
          />
          <Typography fontWeight={700}>
            {user.firstName} {user.lastName}
          </Typography>
          <Chip label={user.role} sx={{ mt: 1 }} />
        </Box>

        {/* Right */}
        <Box sx={{ display: "grid", gap: 2 }}>
          <TextField
            name="firstName"
            label="First Name"
            value={user.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="lastName"
            label="Last Name"
            value={user.lastName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="email"
            label="Email"
            value={user.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="avatarUrl"
            label="Avatar URL"
            value={user.avatarUrl}
            onChange={handleChange}
            fullWidth
          />

          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={isLoading}
              sx={{ px: 4, fontWeight: 700 }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

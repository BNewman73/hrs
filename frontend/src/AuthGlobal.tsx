/**
 * Authentication bootstrap component.
 *
 * When mounted, this component attempts to load the current principal
 * via `useGetPrincipalQuery` and updates the Redux `user` slice. It
 * intentionally renders `null` because it only performs background side-effects.
 *
 * @module src/AuthGlobal
 */
import { useEffect } from "react";
import { useGetPrincipalQuery } from "./features/userApi";
import { setUser, clearUser } from "./features/userSlice";
import { useDispatch } from "react-redux";

export default function AuthBootstrap() {
  const dispatch = useDispatch();
  const { data, error } = useGetPrincipalQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (data) dispatch(setUser(data));
    if (error) dispatch(clearUser());
  }, [data, error, dispatch]);

  return null;
}

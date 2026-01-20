/**
 * Typed React-Redux hooks for the application.
 *
 * Exports `useAppDispatch` and `useAppSelector` which are typed versions of
 * the standard `useDispatch` and `useSelector` hooks. Import these instead of
 * the untyped hooks to get full TypeScript support when interacting with the
 * Redux store.
 *
 * @module src/shared/store/hooks
 */
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Typed versions of the hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

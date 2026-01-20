/**
 * roomApi
 *
 * RTK Query service for room-related endpoints: listing rooms by type,
 * availability checks, reservations for a specific room, and administrative
 * room management (create/update/delete). Exposes typed hooks for use in
 * components.
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RoomType } from "../types/enum";
import { reservationApi } from "./reservationApi";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    credentials: "include",
  }),
  tagTypes: ["Rooms", "RoomReservations"],
  endpoints: (builder) => ({
    getAllRoomsByType: builder.query({
      query: (roomType: RoomType) => ({
        url: `/rooms/type/${roomType}`,
        params: {
          roomType,
        },
      }),
    }),
    getAvailableRooms: builder.query<Room[], RoomAvailabilityRequest>({
      query: (params) => ({
        url: "/reservations/available",
        method: "GET",
        params: {
          checkInDate: params.checkInDate,
          checkOutDate: params.checkOutDate,
          guests: params.guests,
          roomType: params.roomType,
        },
      }),
    }),
    getRoomReservations: builder.query<CalendarEvent[], RoomCalendarRequest>({
      query: (params) => ({
        url: `/rooms/${params.roomNumber}/reservations`,
        method: "GET",
        params: {
          startDate: params.startDate,
          endDate: params.endDate,
        },
      }),
      providesTags: (_result, _error, { roomNumber }) => [
        { type: "RoomReservations", id: roomNumber },
      ],
    }),
    getComprehensiveRoomDetails: builder.query<RoomDetailsDTO[], void>({
      query: () => ({
        url: "/room-details/comprehensive",
        method: "GET",
      }),
    }),
    createCheckoutSession: builder.mutation({
      query: (body: {
        roomNumber: string;
        checkInDate: string;
        checkOutDate: string;
        guests: number;
        numberOfNights: number;
        totalPrice: number;
      }) => ({
        url: "/payment/create-checkout-session",
        method: "POST",
        body,
      }),
    }),
    getTransactions: builder.query<Transaction[], void>({
      query: () => ({
        url: "/payment/transactions",
        method: "GET",
      }),
    }),
    getAllRooms: builder.query<Room[], void>({
      query: () => ({
        url: "/rooms",
        method: "GET",
      }),
      providesTags: ["Rooms"],
    }),
    updateRoom: builder.mutation<Room, RoomDTO>({
      query: (params) => ({
        url: `/rooms/${params.publicID}`,
        method: "PUT",
        body: {
          pricePerNight: params.pricePerNight,
          images: params.images,
          roomType: params.roomType,
          description: params.description,
        },
      }),
      invalidatesTags: ["Rooms"],
    }),
    createRoom: builder.mutation<Room, RoomDTO>({
      query: (room) => ({
        method: "POST",
        url: `/rooms`,
        body: room,
      }),
      invalidatesTags: ["Rooms"],
    }),
    deleteRoom: builder.mutation<void, string>({
      query: (param) => ({
        method: "DELETE",
        url: `/rooms/${param}`,
      }),
      invalidatesTags: ["Rooms"],
    }),
    completeReservation: builder.mutation<Reservation, string>({
      query: (sessionId) => ({
        url: `/reservations/complete/${sessionId}`,
        method: "POST",
      }),
    }),
    getUpcomingReservations: builder.query<ReservationResponseDTO[], void>({
      query: () => "/reservations/mine/upcoming",
    }),
    getPastReservations: builder.query<ReservationResponseDTO[], void>({
      query: () => "/reservations/mine/past",
    }),
    getCurrentReservations: builder.query<ReservationResponseDTO[], void>({
      query: () => "/reservations/mine/current",
    }),

    createAdminBlock: builder.mutation({
      query: (block: {
        roomId: string;
        startDate: string;
        endDate: string;
        blockReason: string;
      }) => ({
        url: "/reservations/blocks",
        method: "POST",
        body: block,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            reservationApi.util.invalidateTags([{ type: "Reservations" }]),
          );
        } catch (e) {
          console.log(e);
        }
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "RoomReservations", id: arg.roomId },
      ],
    }),
    getTransactionHistory: builder.query<TransactionDTO[], number | void>({
      query: (limit) => ({
        url: "/payment/transactions",
        params: {
          limit: limit || 10,
        },
      }),
    }),
  }),
});

export const {
  useGetAllRoomsByTypeQuery,
  useGetAvailableRoomsQuery,
  useGetRoomReservationsQuery,
  useGetAllRoomsQuery,
  useGetTransactionsQuery,
  useUpdateRoomMutation,
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useGetComprehensiveRoomDetailsQuery,
  useCreateCheckoutSessionMutation,
  useCompleteReservationMutation,
  useGetUpcomingReservationsQuery,
  useGetPastReservationsQuery,
  useGetCurrentReservationsQuery,
  useCreateAdminBlockMutation,
} = roomApi;

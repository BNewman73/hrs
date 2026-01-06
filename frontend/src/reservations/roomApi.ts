import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_BASE = import.meta.env.VITE_API_BASE;
export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAvailableRooms: builder.query<Room[], RoomAvailabilityRequest>({
      query: (params) => ({
        url: "/reservations/available",
        method: "GET",
        params: {
          checkInDate: params.checkInDate,
          checkOutDate: params.checkOutDate,
          guests: params.guests,
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
    }),
  }),
});

export const { useGetAvailableRoomsQuery, useGetRoomReservationsQuery } =
  roomApi;

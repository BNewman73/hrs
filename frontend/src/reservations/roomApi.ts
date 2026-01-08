import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  }),
  endpoints: (builder) => ({
    getAvailableRooms: builder.query<Room[], RoomAvailabilityRequest>({
      query: (params) => ({
        url: "/reservations/available",
        method: "GET",
        params: {
          roomType: params.roomType,
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
  }),
});

export const {
  useGetAvailableRoomsQuery,
  useGetRoomReservationsQuery,
  useGetComprehensiveRoomDetailsQuery,
  useCreateCheckoutSessionMutation,
} = roomApi;

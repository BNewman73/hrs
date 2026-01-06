import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_BASE = import.meta.env.VITE_API_BASE;
export const reservationApi = createApi({
  reducerPath: "reservationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllReservations: builder.query({
      query: () => "/reservations",
    }),
    getReservationById: builder.query({
      query: (id) => `/reservations/${id}`,
    }),
    getReservationsByUserId: builder.query({
      query: (userId) => `/reservations/user/${userId}`,
    }),
    getReservationsByType: builder.query({
      query: (type) => `/reservations/type/${type}`,
    }),
    getReservationsByRoom: builder.query({
      query: ({ roomId, startDate, endDate }) => {
        let url = `/reservations/room/${roomId}`;
        if (startDate && endDate) {
          url += `?startDate=${startDate}&endDate=${endDate}`;
        }
        return url;
      },
    }),
    createGuestBooking: builder.mutation({
      query: (booking) => ({
        url: "/reservations/bookings",
        method: "POST",
        body: booking,
      }),
    }),
    createAdminBlock: builder.mutation({
      query: (block) => ({
        url: "/reservations/blocks",
        method: "POST",
        body: block,
      }),
    }),
    deleteReservation: builder.mutation({
      query: (id) => ({
        url: `/reservations/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllReservationsQuery,
  useGetReservationByIdQuery,
  useGetReservationsByUserIdQuery,
  useGetReservationsByTypeQuery,
  useGetReservationsByRoomQuery,
  useCreateGuestBookingMutation,
  useCreateAdminBlockMutation,
  useDeleteReservationMutation,
} = reservationApi;

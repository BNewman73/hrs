import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
export const reservationApi = createApi({
  reducerPath: "reservationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    credentials: "include",
  }),
  tagTypes: ["Reservations"],
  endpoints: (builder) => ({
    getAllReservations: builder.query<ReservationDTO[], void>({
      query: () => "/reservations",
      providesTags: ["Reservations"],
    }),
    getAllReservationsWithGuest: builder.query<ReservationWithGuestDTO[], void>(
      {
        query: () => "/reservations/with-guests",
        providesTags: ["Reservations"],
      },
    ),
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
    getOccupancy: builder.query<
      Record<string, number>,
      { checkInDate: string; checkOutDate: string }
    >({
      query: ({ checkInDate, checkOutDate }) => ({
        url: "/reservations/occupancy",
        params: { checkInDate, checkOutDate },
      }),
    }),
    getRevenue: builder.query<
      Record<string, number>,
      { date: string}
    >({
      query: ({ date }) => ({
        url: "/reservations/revenue",
        params: { date },
      }),
    }),
    createGuestBooking: builder.mutation({
      query: (booking) => ({
        url: "/reservations/bookings",
        method: "POST",
        body: booking,
      }),
    }),
    deleteReservation: builder.mutation({
      query: (id) => ({
        url: `/reservations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reservations"],
    }),
    refundReservation: builder.mutation<RefundResponse, string>({
      query: (id) => ({
        url: `/reservations/refund/${id}`, // stripePaymentIntent
        method: "POST",
      }),
      invalidatesTags: ["Reservations"],
    }),
  }),
});

export const {
  useGetAllReservationsQuery,
  useGetAllReservationsWithGuestQuery,
  useGetReservationByIdQuery,
  useGetReservationsByUserIdQuery,
  useGetReservationsByTypeQuery,
  useGetReservationsByRoomQuery,
  useGetOccupancyQuery,
  useGetRevenueQuery,
  useCreateGuestBookingMutation,
  useDeleteReservationMutation,
  useRefundReservationMutation,
} = reservationApi;

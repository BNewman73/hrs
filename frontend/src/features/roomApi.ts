import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    credentials: "include",
  }),
  tagTypes: ["Rooms"],
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetAvailableRoomsQuery,
  useGetRoomReservationsQuery,
  useGetAllRoomsQuery,
  useUpdateRoomMutation,
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useGetComprehensiveRoomDetailsQuery,
  useCreateCheckoutSessionMutation,
} = roomApi;

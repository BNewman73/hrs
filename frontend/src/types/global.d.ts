export {};

declare global {
  type RoomType = "SINGLE" | "DOUBLE";

  type Amenity =
    | "WIFI"
    | "TV"
    | "REFRIGERATOR"
    | "STOVE"
    | "BALCONY"
    | "SAFE"
    | "COFFEE_MAKER"
    | "MICROWAVE";

  interface RoomDetails {
    type: RoomType;
    description: string;
    amenities: Amenity[];
    maxCapacity: number;
  }

  interface Room {
    roomNumber: string;
    pricePerNight: number;
    images: string[];
    roomDetails: RoomDetails;
  }

  interface RoomPostDTO {
    roomNumber: string;
    pricePerNight: number;
    images: string[];
    roomType: RoomType;
  }

  interface RoomAvailabilityRequest {
    checkInDate: string;
    checkOutDate: string;
    guests?: number;
  }

  export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    resourceId: string; // room number
    type: "GUEST_BOOKING" | "ADMIN_BLOCK";
    guestName?: string;
    blockReason?: string;
  }

  export interface RoomCalendarRequest {
    roomNumber: string;
    startDate: string;
    endDate: string;
  }
}

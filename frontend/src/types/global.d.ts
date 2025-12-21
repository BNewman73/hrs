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

  interface RoomPostDTO{
     roomNumber: string;
    pricePerNight: number;
    images: string[];
    roomType: RoomType;

  }

}

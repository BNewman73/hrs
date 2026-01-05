export {};

declare global {
  type RoomType = "SINGLE" | "DOUBLE" | "DELUXE" | "SUITE";

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
    publicID: string;
  }

  interface RoomDTO {
    roomNumber: string;
    publicID: string;
    pricePerNight: number;
    images: string[];
    roomType: RoomType;
  }

  interface User {
    id: number;
    name: string;
    email: string;
  }

  interface NavBarProps {
    user: User;
  }
  interface ToolbarProps {
    searchQuery: string;
    onSearchChange: (val: string) => void;
    typeFilter: RoomType | "ALL"; // Specific type
    onTypeChange: (val: RoomType | "ALL") => void; // Specific type
    sortOrder: SortOrder; // Specific type
    onSortChange: (val: SortOrder) => void; // Specific type
    onReset: () => void;
    isFiltered: boolean;
  }
  interface GridConfig {
    roomNo: { xs: string; sm: string };
    price: { xs: string; sm: string };
    category: string;
    actions: string;
  }

  interface RoomItemProps {
    room: Room; // Use your Room type here
    gridConfig: GridConfig;
    isExpanded: boolean;
    onToggle: () => void;
    onEdit: () => void;
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

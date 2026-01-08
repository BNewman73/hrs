export {};

declare global {
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
    tech: Tech[];
    comfort: Comfort[];
    provisions: Provisions[];
    miscellaneous: Miscellaneous[];
    maxCapacity: number;
  }

  interface Room {
    roomNumber: string;
    pricePerNight: number;
    image: string;
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
    roomType: string;
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

  export interface RoomDetailsDTO {
    type: string;
    description: string;
    maxCapacity: number;
    amenitiesByCategory: AmenitiesByCategory;
    minPrice: number;
    maxPrice: number;
    images: string[];
  }

  export interface AmenitiesByCategory {
    "Tech & Connectivity"?: string[];
    "Comfort & Sleep"?: string[];
    "Food & Beverage"?: string[];
    "Safety & Convenience"?: string[];
  }

  export enum RoomType {
    SINGLE = "SINGLE",
    DOUBLE = "DOUBLE",
    DELUXE = "DELUXE",
    SUITE = "SUITE",
    PRESIDENTIAL_SUITE = "PRESIDENTIAL_SUITE",
    ACCESSIBLE = "ACCESSIBLE",
  }

  export enum Tech {
    WIFI = "WIFI",
    HIGH_SPEED_WIFI = "HIGH_SPEED_WIFI",
    TV = "TV",
    SMART_TV_STREAMING = "SMART_TV_STREAMING",
    UNIVERSAL_SOCKETS = "UNIVERSAL_SOCKETS",
    USB_C_PORTS = "USB_C_PORTS",
    SMART_LIGHTS = "SMART_LIGHTS",
  }

  export enum Comfort {
    BLACKOUT_CURTAINS = "BLACKOUT_CURTAINS",
    PILLOW_MENU = "PILLOW_MENU",
    SOUNDPROOFING = "SOUNDPROOFING",
    PREMIUM_LINENS = "PREMIUM_LINENS",
    BATHROBE = "BATHROBE",
    SLIPPERS = "SLIPPERS",
    AIR_PURIFIER = "AIR_PURIFIER",
  }

  export enum Provisions {
    MINI_BAR = "MINI_BAR",
    COFFEE_MAKER = "COFFEE_MAKER",
    ELECTRIC_KETTLE = "ELECTRIC_KETTLE",
    COMPLIMENTARY_WATER = "COMPLIMENTARY_WATER",
    KITCHENETTE = "KITCHENETTE",
    MICROWAVE = "MICROWAVE",
  }

  export enum Miscellaneous {
    IRONING_BOARD = "IRONING_BOARD",
    LUGGAGE_RACK = "LUGGAGE_RACK",
    WORK_DESK = "WORK_DESK",
    ERGONOMIC_CHAIR = "ERGONOMIC_CHAIR",
    BALCONY = "BALCONY",
    SAFE = "SAFE",
    YOGA_MAT = "YOGA_MAT",
    HAIR_DRYER = "HAIR_DRYER",
  }
}

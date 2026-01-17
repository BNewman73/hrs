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

  export interface RefundResponse {
    id: string;
    object: "refund";
    amount: number;
    balance_transaction: string;
    charge: string;
    created: number; // unix timestamp (seconds)
    currency: string;

    destination_details: {
      type: "card";
      card: {
        reference: string;
        reference_status: "available" | "pending" | "unavailable";
        reference_type: "acquirer_reference_number";
        type: "refund";
      };
    };

    metadata: Record<string, string>;

    payment_intent: string | null;
    reason: "duplicate" | "fraudulent" | "requested_by_customer" | null;

    receipt_number: string | null;
    source_transfer_reversal: string | null;
    transfer_reversal: string | null;

    status: "pending" | "succeeded" | "failed" | "canceled";
  }

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
    images: string[];
    roomDetails: RoomDetails;
    publicID: string;
    description: string;
  }

  interface RoomDTO {
    roomNumber: string;
    publicID: string;
    pricePerNight: number;
    images: string[];
    roomType: RoomType;
    description: string;
  }
  interface Reservation {
    id: string;
    publicId: string;
    roomId: string;
    startDate: string;
    endDate: string;
    guests: number;
    // numberOfNights: number;
    totalPrice: number;
    // guestEmail: string;
    stripeSessionId: string;
    stripePaymentIntentId: string;
    paymentStatus: string;
  }
  interface ReservationDTO {
    id: string;
    roomId: string;
    startDate: string;
    endDate: string;
    type: ReservationType;
    totalPrice?: number;
    blockReason?: BlockReason;
    notes?: string;
    paymentStatus?: string;
    stripePaymentIntentId: string;
  }
  export interface ReservationResponseDTO {
    id: string;
    publicId: string;
    startDate: string;
    endDate: string;
    guests: number;
    totalPrice: number;
    paymentStatus: string;
    roomNumber: string;
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

  declare module "swiper/css";
  declare module "swiper/css/navigation";
  declare module "swiper/css/pagination";
}

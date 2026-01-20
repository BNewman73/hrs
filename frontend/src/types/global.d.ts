/**
 * Global ambient types and DTO interfaces used throughout the frontend.
 *
 * This file augments the global namespace with common app shapes (Room,
 * Reservation, DTOs) so components and hooks can import them without
 * repeating type imports. Keep this file focused on shared runtime types.
 *
 * @module src/types/global
 */
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

  type ReservationTypeFilter = "ALL" | "GUEST_BOOKING" | "BLOCKED";
  type PaymentStatusFilter = "ALL" | "paid" | "canceled";
  type ReservationSortOrder = "none" | "date_asc" | "date_desc";

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

  interface TransactionDTO {
    paymentIntentId: string;
    amount: number; // Amount in cents
    currency: string;
    status: string;
    created: string; // ISO 8601 timestamp
    customerEmail: string | null;
    // reservation: TransactionReservationDTO;
    // user: TransactionUserDTO;
  }

  // whatever fields you want to display
  // interface TransactionReservationDTO {}

  // whatever fields you want to display
  // interface TransactionUserDTO {}

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
    stripePaymentIntentId: string;
    roomNumber: string;
    roomType: RoomType;
    roomCapacity: number;
    roomPricePerNight: number;
  }

  interface ReservationWithGuestDTO {
    reservation: ReservationDTO;
    guest?: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      avatarUrl?: string;
      role: string;
    };
  }
  type ToastState = {
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  };
  interface Transaction {
    paymentIntentId: string;
    amount: number;
    currency: string; // "usd"
    status: string;
    created: string;
    customerEmail: string;
    reservation: ReservationDTO;
  }
  interface User {
    id: number;
    name: string;
    email: string;
  }
  type UserRole = "ADMIN" | "MANAGER" | "GUEST";

  export interface UserDTO {
    id: string;
    publicId: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
    provider: string;
    role: "GUEST" | "ADMIN" | "MANAGER";
    enabled?: boolean;
  }
  export type TransactionStatusFilter =
    | "ALL"
    | "succeeded"
    | "failed"
    | "canceled"
    | "refunded";

  export type TransactionSortOrder = "none" | "date_asc" | "date_desc";

  interface NavBarProps {
    variant?: "light" | "dark";
    showHomeButton?: boolean;
    onMenuClick?: () => void;
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

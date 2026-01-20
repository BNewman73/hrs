/**
 * Shared enums and display-name maps used across the UI for rooms and
 * room amenities. These values are stable identifiers used by the backend
 * and should match server-side enums.
 *
 * @module src/types/enum
 */
export enum RoomType {
  SINGLE = "SINGLE",
  DOUBLE = "DOUBLE",
  DELUXE = "DELUXE",
  SUITE = "SUITE",
  PRESIDENTIAL_SUITE = "PRESIDENTIAL_SUITE",
  ACCESSIBLE = "ACCESSIBLE",
}

export const RoomTypeDisplayNames: Record<RoomType, string> = {
  [RoomType.SINGLE]: "Single Room",
  [RoomType.DOUBLE]: "Double Room",
  [RoomType.DELUXE]: "Deluxe King Room",
  [RoomType.SUITE]: "Executive Suite",
  [RoomType.PRESIDENTIAL_SUITE]: "Presidential Suite",
  [RoomType.ACCESSIBLE]: "Accessible Room",
};

export enum Tech {
  WIFI = "WIFI",
  HIGH_SPEED_WIFI = "HIGH_SPEED_WIFI",
  TV = "TV",
  SMART_TV_STREAMING = "SMART_TV_STREAMING",
  UNIVERSAL_SOCKETS = "UNIVERSAL_SOCKETS",
  USB_C_PORTS = "USB_C_PORTS",
  SMART_LIGHTS = "SMART_LIGHTS",
}

export const TechDisplayNames: Record<Tech, string> = {
  [Tech.WIFI]: "Free Wi-Fi",
  [Tech.HIGH_SPEED_WIFI]: "High-Speed Fiber Wi-Fi",
  [Tech.TV]: "Flat-screen TV",
  [Tech.SMART_TV_STREAMING]: "Smart TV with Streaming",
  [Tech.UNIVERSAL_SOCKETS]: "Universal Power Sockets",
  [Tech.USB_C_PORTS]: "USB-C Charging Ports",
  [Tech.SMART_LIGHTS]: "Smart Lighting System",
};

export enum Comfort {
  BLACKOUT_CURTAINS = "BLACKOUT_CURTAINS",
  PILLOW_MENU = "PILLOW_MENU",
  SOUNDPROOFING = "SOUNDPROOFING",
  PREMIUM_LINENS = "PREMIUM_LINENS",
  BATHROBE = "BATHROBE",
  SLIPPERS = "SLIPPERS",
  AIR_PURIFIER = "AIR_PURIFIER",
}

export const ComfortDisplayNames: Record<Comfort, string> = {
  [Comfort.BLACKOUT_CURTAINS]: "Blackout Curtains",
  [Comfort.PILLOW_MENU]: "Custom Pillow Menu",
  [Comfort.SOUNDPROOFING]: "Soundproofed Walls",
  [Comfort.PREMIUM_LINENS]: "Premium High-Thread Linens",
  [Comfort.BATHROBE]: "Plush Bathrobes",
  [Comfort.SLIPPERS]: "Complimentary Slippers",
  [Comfort.AIR_PURIFIER]: "HEPA Air Purifier",
};

export enum Provisions {
  MINI_BAR = "MINI_BAR",
  COFFEE_MAKER = "COFFEE_MAKER",
  ELECTRIC_KETTLE = "ELECTRIC_KETTLE",
  COMPLIMENTARY_WATER = "COMPLIMENTARY_WATER",
  KITCHENETTE = "KITCHENETTE",
  MICROWAVE = "MICROWAVE",
}

export const ProvisionsDisplayNames: Record<Provisions, string> = {
  [Provisions.MINI_BAR]: "Fully Stocked Mini-Bar",
  [Provisions.COFFEE_MAKER]: "Nespresso Coffee Maker",
  [Provisions.ELECTRIC_KETTLE]: "Electric Kettle",
  [Provisions.COMPLIMENTARY_WATER]: "Bottled Spring Water",
  [Provisions.KITCHENETTE]: "Private Kitchenette",
  [Provisions.MICROWAVE]: "Compact Microwave",
};

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

export const MiscellaneousDisplayNames: Record<Miscellaneous, string> = {
  [Miscellaneous.IRONING_BOARD]: "Iron & Ironing Board",
  [Miscellaneous.LUGGAGE_RACK]: "Foldable Luggage Rack",
  [Miscellaneous.WORK_DESK]: "Spacious Work Desk",
  [Miscellaneous.ERGONOMIC_CHAIR]: "Ergonomic Office Chair",
  [Miscellaneous.BALCONY]: "Private Balcony",
  [Miscellaneous.SAFE]: "In-room Electronic Safe",
  [Miscellaneous.YOGA_MAT]: "Complimentary Yoga Mat",
  [Miscellaneous.HAIR_DRYER]: "Ionic Hair Dryer",
};

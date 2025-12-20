package com.skillstorm.hrs.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection ="room_details")
public class RoomDetails {
    @Id // Maps to MongoDB's _id field
    private RoomType type;
    private String description;
    private List<Amenity> amenities;
    private int maxCapacity; 

  
   public enum RoomType {
    SINGLE, DOUBLE, DELUXE, SUITE, PRESIDENTIAL_SUITE, ACCESSIBLE
}

public enum Amenity {
    // Tech & Connectivity
    HIGH_SPEED_WIFI, SMART_TV_STREAMING, UNIVERSAL_SOCKETS, USB_C_PORTS, SMART_LIGHTS,
    
    // Comfort & Sleep
    BLACKOUT_CURTAINS, PILLOW_MENU, SOUNDPROOFING, PREMIUM_LINENS, BATHROBE, SLIPPERS,
    
    // Wellness & Hygiene
    ECO_FRIENDLY_TOILETRIES, HAIR_DRYER, MAGNIFYING_MIRROR, YOGA_MAT, AIR_PURIFIER,
    
    // Food & Beverage
    MINI_BAR, NESPRESSO_MACHINE, ELECTRIC_KETTLE, COMPLIMENTARY_WATER, KITCHENETTE,
    
    // Safety & Convenience
    LAPTOP_SAFE, IRONING_BOARD, LUGGAGE_RACK, WORK_DESK, ERGONOMIC_CHAIR,VOICE_CONTROL,WIFI,TV,COFFEE_MAKER,BALCONY,MICROWAVE,SAFE
}

}
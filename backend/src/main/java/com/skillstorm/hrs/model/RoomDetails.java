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
@Document(collection = "room_details")
public class RoomDetails {
    @Id // Maps to MongoDB's _id field
    private RoomType type;
    private String description;
    private List<Tech> tech;
    private List<Comfort> comfort;
    private List<Provisions> provisions;
    private List<Miscellaneous> miscellaneous;
    private int maxCapacity;

    public enum RoomType {
        SINGLE, DOUBLE, DELUXE, SUITE, PRESIDENTIAL_SUITE, ACCESSIBLE
    }

    public enum Tech {
        WIFI, HIGH_SPEED_WIFI, TV, SMART_TV_STREAMING, UNIVERSAL_SOCKETS, USB_C_PORTS, SMART_LIGHTS
    }

    public enum Comfort {
        BLACKOUT_CURTAINS, PILLOW_MENU, SOUNDPROOFING, PREMIUM_LINENS, BATHROBE, SLIPPERS, AIR_PURIFIER
    }

    public enum Provisions {
        MINI_BAR, COFFEE_MAKER, ELECTRIC_KETTLE, COMPLIMENTARY_WATER, KITCHENETTE, MICROWAVE
    }

    public enum Miscellaneous {
        IRONING_BOARD, LUGGAGE_RACK, WORK_DESK, ERGONOMIC_CHAIR, BALCONY, SAFE, YOGA_MAT, HAIR_DRYER
    }

}
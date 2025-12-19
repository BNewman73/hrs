package com.skillstorm.hrs.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomDetails {
    private RoomType type;
    private String description;
    private List<Amenity> amenities;
    private int maxCapacity; 

    public enum RoomType {
        SINGLE,
        DOUBLE
    }
    public enum Amenity {
        WIFI, TV, REFRIGERATOR, STOVE, BALCONY, SAFE, COFFEE_MAKER, MICROWAVE
    }
}
package com.skillstorm.hrs.dto.roomDTOS;

import java.util.List;

import com.skillstorm.hrs.model.RoomDetails;

import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class RoomPatchDTO {
    @Positive
    private Integer pricePerNight;
    
    private List<String> images;
    
    private RoomDetails.RoomType roomType;

}

package com.skillstorm.hrs.dto.roomDTOS;

import java.util.List;

import com.skillstorm.hrs.model.RoomDetails;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
@Data
public class RoomPutDTO {
    @NotNull
    @Positive
    private Integer pricePerNight;

    @NotEmpty
    private List<String> images;

    @NotNull
    private RoomDetails.RoomType roomType; 
}

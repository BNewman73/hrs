package com.skillstorm.hrs.dto.roomDTOS;

import java.util.List;

import com.skillstorm.hrs.model.RoomDetails;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
@Data
public class RoomDTO {
    @NotBlank 
    private String roomNumber;

    @NotNull
    @Positive
    private Integer pricePerNight;

    @NotEmpty
    private List<String> images;

    @NotNull
    private RoomDetails.RoomType roomType; 
}

package com.skillstorm.hrs.dto.roomDTOS;

import java.util.List;

import com.skillstorm.hrs.model.RoomDetails;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class RoomPutDTO {
    @NotNull
    @Positive
    private Integer pricePerNight;

    @NotNull
    private List<String> images;
    @NotBlank
    private String description;

    @NotNull
    private RoomDetails.RoomType roomType;
}

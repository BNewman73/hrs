package com.skillstorm.hrs.dto.reservation;

import com.skillstorm.hrs.dto.userDTOs.UserDTO;
import com.skillstorm.hrs.model.Reservation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationWithGuestDTO {
    private Reservation reservation;
    private UserDTO guest;
}

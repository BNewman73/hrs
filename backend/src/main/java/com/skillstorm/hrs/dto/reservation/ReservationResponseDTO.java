package com.skillstorm.hrs.dto.reservation;

import java.time.LocalDate;
import com.skillstorm.hrs.model.RoomDetails.RoomType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponseDTO {
    private String id;
    private String publicId;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer guests;
    private Integer totalPrice;
    private String paymentStatus;
    private String stripePaymentIntentId;

    // Room information
    private String roomNumber;
    private RoomType roomType;
    private Integer roomCapcity;
    private Integer roomPricePerNight;
}

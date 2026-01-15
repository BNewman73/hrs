package com.skillstorm.hrs.dto.reservation;

import java.time.LocalDate;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDTO {

  @NotNull(message = "Room ID is required")
  private String roomId;

  @NotNull(message = "Start date is required")
  @Future(message = "Start date must be in the future")
  private LocalDate startDate;

  @NotNull(message = "End date is required")
  @Future(message = "End date must be in the future")
  private LocalDate endDate;

  @NotNull(message = "User ID is required")
  private String userId;

  @NotNull(message = "Number of guests is required")
  @Min(value = 1, message = "Number of guests must be atleast one")
  private Integer guests;

  @NotNull(message = "Total price is required")
  @Min(value = 1, message = "Total price must be atleast one")
  private Integer totalPrice;
}

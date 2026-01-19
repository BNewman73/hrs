package com.skillstorm.hrs.dto.reservation;

import java.time.LocalDate;

import com.skillstorm.hrs.model.Reservation.BlockReason;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlockRequestDTO {
  @NotNull(message = "Room number is required")
  private String roomId;

  @NotNull(message = "Start date is required")
  @Future(message = "Start date must be in the future")
  private LocalDate startDate;

  @NotNull(message = "End date is required")
  @Future(message = "End date must be in the future")
  private LocalDate endDate;

  @NotNull(message = "Block reason is required")
  private BlockReason blockReason;
}

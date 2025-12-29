package com.skillstorm.hrs.dto;

import java.time.LocalDate;

import com.skillstorm.hrs.model.Reservation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CalendarEventDTO {
  private String id;
  private String title;
  private LocalDate start;
  private LocalDate end;
  private String resourceId; // room number
  private String type; // GUEST_BOOKING or ADMIN_BLOCK
  private String guestName;
  private String blockReason;

  public static CalendarEventDTO from(Reservation reservation) {
    String title;
    if (reservation.getType() == Reservation.ReservationType.ADMIN_BLOCK) {
      title = "BLOCKED: "
          + (reservation.getBlockReason() != null ? reservation.getBlockReason().toString() : "Unavailable");
    } else {
      title = "BOOKED";
    }

    return CalendarEventDTO.builder()
        .id(reservation.getId())
        .title(title)
        .start(reservation.getStartDate())
        .end(reservation.getEndDate())
        .resourceId(reservation.getRoomId())
        .type(reservation.getType().toString())
        .blockReason(reservation.getBlockReason() != null
            ? reservation.getBlockReason().toString()
            : null)
        .build();
  }
}
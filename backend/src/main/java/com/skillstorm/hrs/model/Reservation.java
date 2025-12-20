package com.skillstorm.hrs.model;

import java.time.LocalDate;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.skillstorm.hrs.dto.BlockRequestDTO;
import com.skillstorm.hrs.dto.BookingRequestDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "reservations")
public class Reservation extends BaseEntity {
  private ReservationType type;

  @Field("room_id")
  private String roomId;

  @Field("start_date")
  private LocalDate startDate;

  @Field("end_date")
  private LocalDate endDate;

  @Field("user_id")
  private String userId; // null for admin blocks

  @Field("number_of_adults")
  private Integer numberOfAdults; // null for admin blocks

  @Field("number_of_children")
  private Integer numberOfChildren; // null for admin blocks

  @Field("total_price")
  private Integer totalPrice; // null for admin blocks

  @Field("block_reason")
  private BlockReason blockReason; // null for guest bookings

  @Field("blocked_by")
  private String blockedBy; // id of admin who submitted block

  private String notes;

  public enum ReservationType {
    GUEST_BOOKING,
    ADMIN_BLOCK
  }

  public enum BlockReason {
    CLEANING,
    MAINTENANCE,
    REPAIR,
    RENOVATION,
    OTHER
  }

  public static Reservation from(BlockRequestDTO request) {
    return Reservation.builder()
        .type(ReservationType.ADMIN_BLOCK)
        .roomId(request.getRoomId())
        .startDate(request.getStartDate())
        .endDate(request.getEndDate())
        .blockReason(request.getBlockReason())
        .blockedBy(request.getBlockedBy())
        .build();
  }

  public static Reservation from(BookingRequestDTO request) {
    return Reservation.builder()
        .type(ReservationType.GUEST_BOOKING)
        .roomId(request.getRoomId())
        .startDate(request.getStartDate())
        .endDate(request.getEndDate())
        .userId(request.getUserId())
        .numberOfAdults(request.getNumberOfAdults())
        .numberOfChildren(request.getNumberOfChildren())
        .totalPrice(request.getTotalPrice())
        .build();
  }
}

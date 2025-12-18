package com.skillstorm.hrs.model;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

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
// TODO: compound index annotation
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
}

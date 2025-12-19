package com.skillstorm.hrs.model;

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
@Document(collection = "rooms")
public class Room extends BaseEntity {
  @Indexed(unique = true)
  @Field("room_number")
  private String roomNumber;

  @Field("price_per_night")
  private Integer pricePerNight;

  private List<String> images;

  private RoomDetails roomDetails;
 
}


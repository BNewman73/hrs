package com.skillstorm.hrs.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckoutRequest {
  private String roomNumber;
  private String checkInDate;
  private String checkOutDate;
  private int guests;
  private int numberOfNights;
  private double totalPrice;
}

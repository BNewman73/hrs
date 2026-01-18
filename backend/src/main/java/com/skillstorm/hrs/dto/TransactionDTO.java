package com.skillstorm.hrs.dto;

import java.time.Instant;

import com.skillstorm.hrs.model.Reservation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTO {
  // Core payment info from Stripe Payment Intent
  private String paymentIntentId;
  private Long amount; // Amount in cents (e.g., 15000 = $150.00)
  private String currency; // e.g., "usd"
  private String status; // "succeeded", "failed", "canceled", etc.
  private Instant created;
  private String customerEmail;
  // additional fields
  private Reservation reservation;
}

package com.skillstorm.hrs.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.skillstorm.hrs.dto.CheckoutRequest;
import com.skillstorm.hrs.dto.TransactionDTO;
import com.skillstorm.hrs.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

  @Autowired
  private PaymentService paymentService;

  /**
   * Creates a Stripe checkout session based on the provided request details.
   * @param request The checkout request details.
   * @return ResponseEntity containing the session ID and URL or an error message.
   */
  @PostMapping("/create-checkout-session")
  public ResponseEntity<?> createCheckoutSession(@RequestBody CheckoutRequest request) {
    try {
      Session session = paymentService.createCheckoutSession(request);

      Map<String, String> response = new HashMap<>();
      response.put("sessionId", session.getId());
      response.put("url", session.getUrl());

      return ResponseEntity.ok(response);
    } catch (StripeException e) {
      Map<String, String> error = new HashMap<>();
      error.put("error", e.getMessage());
      return ResponseEntity.badRequest().body(error);
    }
  }

  /**
   * Test endpoint to verify the PaymentController is working.
   * @return ResponseEntity with a test message.
   */
  @GetMapping("/test")
  public ResponseEntity<String> test() {
    return ResponseEntity.ok("Payment controller is working!");
  @GetMapping("/transactions")
  public ResponseEntity<?> getTransactionHistory(
      @RequestParam(required = false, defaultValue = "10") Integer limit) {

    try {
      List<TransactionDTO> transactions = paymentService.getTransactionHistory(limit);
      System.out.println("Successfully retrieved " + transactions.size() + " transactions");
      return ResponseEntity.ok(transactions);

    } catch (StripeException e) {
      System.out.println("Stripe API error: " + e.getMessage());
      return ResponseEntity
          .status(HttpStatus.BAD_GATEWAY)
          .body("Error fetching transactions from Stripe: " + e.getMessage());

    } catch (Exception e) {
      System.out.println("Unexpected error fetching transactions: {}" + e.getMessage());
      return ResponseEntity
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("An unexpected error occurred");
    }
  }
}
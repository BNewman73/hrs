package com.skillstorm.hrs.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.skillstorm.hrs.dto.CheckoutRequest;
import com.skillstorm.hrs.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
  }
}
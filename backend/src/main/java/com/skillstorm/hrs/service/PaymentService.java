package com.skillstorm.hrs.service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.skillstorm.hrs.dto.CheckoutRequest;
import com.skillstorm.hrs.dto.TransactionDTO;
import com.skillstorm.hrs.model.Reservation;
import com.skillstorm.hrs.model.User;
import com.skillstorm.hrs.repository.ReservationRepository;
import com.skillstorm.hrs.repository.UserRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentIntentCollection;
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentIntentListParams;
import com.stripe.param.checkout.SessionCreateParams;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {

        private final ReservationRepository reservationRepository;
        private final UserRepository userRepository;

        @Value("${APP_FRONTEND_URL:http://localhost:3000}")
        private String baseUrl;

        /**
         * Creates a Stripe checkout session based on the provided request details.
         * @param request
         * @return Session
         * @throws StripeException
         */
        public Session createCheckoutSession(CheckoutRequest request) throws StripeException {
                long amountInCents = (long) (request.getTotalPrice() * 100);

                // Create line item for the booking
                SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                                .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                                .setCurrency("usd")
                                                                .setUnitAmount(amountInCents)
                                                                .setProductData(
                                                                                SessionCreateParams.LineItem.PriceData.ProductData
                                                                                                .builder()
                                                                                                .setName("Room " + request
                                                                                                                .getRoomNumber()
                                                                                                                + " - "
                                                                                                                + request.getNumberOfNights()
                                                                                                                + " nights")
                                                                                                .setDescription(
                                                                                                                "Check-in: " + request
                                                                                                                                .getCheckInDate()
                                                                                                                                + " | Check-out: "
                                                                                                                                + request.getCheckOutDate())
                                                                                                .build())
                                                                .build())
                                .setQuantity(1L)
                                .build();

                // Create the checkout session
                SessionCreateParams params = SessionCreateParams.builder()
                                .setMode(SessionCreateParams.Mode.PAYMENT)
                                .setSuccessUrl(baseUrl + "/booking-success?session_id={CHECKOUT_SESSION_ID}")
                                .setCancelUrl(baseUrl + "/booking-cancel")
                                .addLineItem(lineItem)
                                // Store metadata to create reservation later
                                .putMetadata("roomNumber", request.getRoomNumber())
                                .putMetadata("checkInDate", request.getCheckInDate())
                                .putMetadata("checkOutDate", request.getCheckOutDate())
                                .putMetadata("guests", String.valueOf(request.getGuests()))
                                .build();

                return Session.create(params);
        }

        public List<TransactionDTO> getTransactionHistory(Integer limit) throws StripeException {
                System.out.println("Fetching transaction history from Stripe with limit: " + limit);

                // Set default limit if not provided
                if (limit == null || limit <= 0) {
                        limit = 10;
                }

                // Stripe has a max limit of 100
                if (limit > 100) {
                        limit = 100;
                }

                // Build parameters for listing Payment Intents
                PaymentIntentListParams params = PaymentIntentListParams.builder()
                                .setLimit(limit.longValue())
                                .build();

                // Call Stripe API
                PaymentIntentCollection paymentIntents = PaymentIntent.list(params);

                // Map to DTOs
                return paymentIntents.getData().stream()
                                .map(this::mapToTransactionDTO)
                                .filter(dto -> dto.getReservation() != null)
                                .collect(Collectors.toList());
        }

        private TransactionDTO mapToTransactionDTO(PaymentIntent paymentIntent) {
                Optional<Reservation> reservationOpt = reservationRepository
                                .findByStripePaymentIntentId(paymentIntent.getId());
                Reservation reservation = null;
                User user = null;
                if (reservationOpt.isPresent()) {
                        reservation = reservationOpt.get();
                        if (reservation.getUserId() != null) {
                                Optional<User> userOpt = userRepository.findByProviderId(reservation.getUserId());
                                if (userOpt.isPresent()) {
                                        user = userOpt.get();
                                }
                        }
                }

                return TransactionDTO.builder()
                                .paymentIntentId(paymentIntent.getId())
                                .amount(paymentIntent.getAmount())
                                .currency(paymentIntent.getCurrency())
                                .status(paymentIntent.getStatus())
                                .created(Instant.ofEpochSecond(paymentIntent.getCreated()))
                                .customerEmail(paymentIntent.getReceiptEmail())
                                .reservation(reservation)
                                .user(user)
                                .build();
        }
}
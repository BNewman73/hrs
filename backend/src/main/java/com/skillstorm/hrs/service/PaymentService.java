package com.skillstorm.hrs.service;

import org.springframework.stereotype.Service;

import com.skillstorm.hrs.dto.CheckoutRequest;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class PaymentService {

        private final String baseUrl = "https://d24rfvgips8loh.cloudfront.net";

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
}
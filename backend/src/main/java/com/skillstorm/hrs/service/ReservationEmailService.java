package com.skillstorm.hrs.service;

import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.Body;
import software.amazon.awssdk.services.ses.model.Content;
import software.amazon.awssdk.services.ses.model.Destination;
import software.amazon.awssdk.services.ses.model.Message;
import software.amazon.awssdk.services.ses.model.SendEmailRequest;

@Service
@RequiredArgsConstructor
public class ReservationEmailService {

        private final SesClient sesClient;

        @Value("${app.email.from}")
        private String from;

        public void sendBookingConfirmation(

                        String receiptUrl,
                        String to,
                        String roomNumber,
                        String checkInDate,
                        String checkOutDate,
                        int guests,
                        int totalPrice,
                        String firstName,
                        String lastName) {

                String htmlBody = buildHtml(

                                roomNumber,
                                checkInDate,
                                checkOutDate,
                                guests,
                                totalPrice,
                                receiptUrl,
                                firstName,
                                lastName);

                SendEmailRequest request = SendEmailRequest.builder()
                                .source(from)
                                .destination(Destination.builder()
                                                .toAddresses(to)
                                                .build())
                                .message(Message.builder()
                                                .subject(Content.builder()
                                                                .data("Your Storm Stay Reservation Is Confirmed")
                                                                .charset("UTF-8")
                                                                .build())
                                                .body(Body.builder()
                                                                .html(Content.builder()
                                                                                .data(htmlBody)
                                                                                .charset("UTF-8")
                                                                                .build())
                                                                .build())
                                                .build())
                                .build();

                sesClient.sendEmail(request);
        }

        private String buildHtml(
                        String roomNumber,
                        String checkInDate,
                        String checkOutDate,
                        int guests,
                        int totalPrice,
                        String receiptUrl,
                        String firstName,
                        String lastName) {
                String html = loadTemplate("booking-confirmation.html");

                return html

                                .replace("{{roomNumber}}", roomNumber)
                                .replace("{{checkInDate}}", checkInDate)
                                .replace("{{checkOutDate}}", checkOutDate)
                                .replace("{{guests}}", String.valueOf(guests))
                                .replace("{{totalPrice}}", String.valueOf(totalPrice))
                                .replace("{{receiptUrl}}", receiptUrl)
                                .replace("{{firstName}}", firstName)
                                .replace("{{lastName}}", lastName);
        }

        private String loadTemplate(String name) {
                try {
                        ClassPathResource resource = new ClassPathResource("email/" + name);
                        return StreamUtils.copyToString(
                                        resource.getInputStream(),
                                        StandardCharsets.UTF_8);
                } catch (Exception e) {
                        throw new RuntimeException("Failed to load email template: " + name, e);
                }
        }
}

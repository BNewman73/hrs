package com.skillstorm.hrs.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hrs.dto.reservation.BlockRequestDTO;
import com.skillstorm.hrs.dto.reservation.BookingRequestDTO;
import com.skillstorm.hrs.exception.InvalidReservationException;
import com.skillstorm.hrs.model.Reservation;
import com.skillstorm.hrs.model.Reservation.ReservationType;
import com.skillstorm.hrs.model.Room;
import com.skillstorm.hrs.model.RoomDetails.RoomType;
import com.skillstorm.hrs.model.User;
import com.skillstorm.hrs.service.ReservationService;
import com.skillstorm.hrs.service.UserService;
import com.stripe.model.Refund;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class ReservationController {
  private final ReservationService reservationService;
  private final UserService userService;

  @GetMapping
  public ResponseEntity<List<Reservation>> getAllReservations() {
    List<Reservation> reservations = reservationService.getAllReservations();
    return new ResponseEntity<>(reservations, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Reservation> getReservationById(@PathVariable String id) {
    Reservation reservation = reservationService.getReservationById(id);
    return new ResponseEntity<>(reservation, HttpStatus.OK);
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<List<Reservation>> getReservationsByUserId(@PathVariable String id) {
    List<Reservation> reservations = reservationService.getReservationsByUserId(id);
    return new ResponseEntity<>(reservations, HttpStatus.OK);
  }

  @GetMapping("/type/{type}")
  public ResponseEntity<List<Reservation>> getReservationsByType(@PathVariable ReservationType type) {
    List<Reservation> reservations = reservationService.getReservationsByType(type);
    return new ResponseEntity<>(reservations, HttpStatus.OK);
  }

  @GetMapping("/room/{roomId}")
  public ResponseEntity<List<Reservation>> getReservationsByRoomAndDateRange(
      @PathVariable String roomId,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
    if ((startDate != null && endDate == null) || (startDate == null && endDate != null))
      throw new InvalidReservationException("Both startDate and endDate must be provided together");
    List<Reservation> reservations;
    if (startDate != null && endDate != null)
      reservations = reservationService.getReservationsByRoomAndDateRange(roomId, startDate, endDate);
    else
      reservations = reservationService.getReservationsByRoomId(roomId);
    return new ResponseEntity<>(reservations, HttpStatus.OK);
  }

  @PostMapping("/bookings")
  public ResponseEntity<Reservation> createBooking(@Valid @RequestBody BookingRequestDTO request) {
    Reservation reservation = reservationService.createBooking(request);
    return new ResponseEntity<>(reservation, HttpStatus.CREATED);
  }

  @PostMapping("/blocks")
  public ResponseEntity<Reservation> createBlock(@Valid @RequestBody BlockRequestDTO request) {
    Reservation reservation = reservationService.createBlock(request);
    return new ResponseEntity<>(reservation, HttpStatus.CREATED);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteReservation(@PathVariable String id) {
    reservationService.deleteReservation(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @GetMapping("/available")
  public ResponseEntity<List<Room>> getAvailableRooms(
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
      @RequestParam Integer guests,
      @RequestParam RoomType roomType) {

    if (checkOutDate.isBefore(checkInDate) || checkOutDate.isEqual(checkInDate)) {
      throw new InvalidReservationException("Check out date must be strictly after check in date");
    }

    List<Room> availableRooms = reservationService.getAvailableRooms(checkInDate, checkOutDate, guests, roomType);
    return new ResponseEntity<>(availableRooms, HttpStatus.OK);
  }

  @PostMapping("/complete/{sessionId}")
  public ResponseEntity<?> completeReservation(@PathVariable String sessionId,
      @AuthenticationPrincipal OAuth2User principal) {
    try {
      User user = userService.oauth2UserToUser(principal);
      Reservation reservation = reservationService.createReservationFromSessionId(sessionId, user.getProviderId());
      return ResponseEntity.ok(reservation);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error creating reservation: " + e.getMessage());
    }
  }

  @GetMapping("/mine")
  public ResponseEntity<List<Reservation>> getMyReservations(@AuthenticationPrincipal OAuth2User principal) {
    String userId = userService.principalToUserId(principal);
    List<Reservation> reservations = reservationService.getUserReservations(userId);
    return new ResponseEntity<>(reservations, HttpStatus.OK);
  }

  @GetMapping("/mine/upcoming")
  public ResponseEntity<List<Reservation>> getMyUpcomingReservations(
      @AuthenticationPrincipal OAuth2User principal) {
    String userId = userService.principalToUserId(principal);
    List<Reservation> reservations = reservationService.getUpcomingReservations(userId);
    return ResponseEntity.ok(reservations);
  }

  @GetMapping("/mine/past")
  public ResponseEntity<List<Reservation>> getMyPastReservations(
      @AuthenticationPrincipal OAuth2User principal) {
    String userId = userService.principalToUserId(principal);
    List<Reservation> reservations = reservationService.getPastReservations(userId);
    return ResponseEntity.ok(reservations);
  }
  @PostMapping("/refund/{paymentId}")
  public ResponseEntity<Refund> createBooking(@PathVariable String paymentId) {
    Refund refund = reservationService.postRefund(paymentId);
    return new ResponseEntity<>(refund, HttpStatus.CREATED);
  }

}

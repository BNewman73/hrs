package com.skillstorm.hrs.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.skillstorm.hrs.model.Room;
import com.skillstorm.hrs.model.Reservation.ReservationType;
import com.skillstorm.hrs.model.RoomDetails.RoomType;
import com.skillstorm.hrs.service.ReservationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/reservations")
@RequiredArgsConstructor
public class ReservationController {
  private final ReservationService reservationService;

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
}

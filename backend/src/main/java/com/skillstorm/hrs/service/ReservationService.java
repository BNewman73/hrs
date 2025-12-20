package com.skillstorm.hrs.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skillstorm.hrs.dto.BlockRequestDTO;
import com.skillstorm.hrs.dto.BookingRequestDTO;
import com.skillstorm.hrs.exception.InvalidReservationException;
import com.skillstorm.hrs.exception.ResourceNotFoundException;
import com.skillstorm.hrs.exception.RoomNotAvailableException;
import com.skillstorm.hrs.model.Reservation;
import com.skillstorm.hrs.model.Reservation.ReservationType;
import com.skillstorm.hrs.repository.ReservationRepository;
import com.skillstorm.hrs.repository.RoomRepository;
import com.skillstorm.hrs.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationService {

  private final UserRepository userRepository;
  private final ReservationRepository reservationRepository;
  private final RoomRepository roomRepository;

  public Reservation getReservationById(String id) {
    Optional<Reservation> reservation = reservationRepository.findById(id);
    if (!reservation.isPresent())
      throw new ResourceNotFoundException("Reservation not found with id " + id);
    return reservation.get();
  }

  public List<Reservation> getReservationsByUserId(String userId) {
    checkUserExists(userId);
    return reservationRepository.findByUserId(userId);
  }

  public List<Reservation> getReservationsByRoomId(String roomId) {
    checkRoomExists(roomId);
    return reservationRepository.findByRoomId(roomId);
  }

  public List<Reservation> getReservationsByType(ReservationType type) {
    return reservationRepository.findByType(type);
  }

  public List<Reservation> getReservationsByRoomAndDateRange(String roomId, LocalDate startDate, LocalDate EndDate) {
    checkRoomExists(roomId);
    return reservationRepository.findByRoomIdAndDateRange(roomId, startDate, EndDate);
  }

  public List<Reservation> getAllReservations() {
    return reservationRepository.findAll();
  }

  public void deleteReservation(String id) {
    if (!reservationRepository.existsById(id))
      throw new ResourceNotFoundException("Reservation not found with id " + id);
    reservationRepository.deleteById(id);
  }

  public Reservation createBlock(BlockRequestDTO request) {
    checkDateLogic(request.getStartDate(), request.getEndDate());
    checkRoomAvailability(request.getRoomId(), request.getStartDate(), request.getEndDate());
    Reservation reservation = Reservation.from(request);
    return reservationRepository.save(reservation);
  }

  public Reservation createBooking(BookingRequestDTO request) {
    // checkUserExists(request.getUserId())
    checkDateLogic(request.getStartDate(), request.getEndDate());
    checkRoomAvailability(request.getRoomId(), request.getStartDate(), request.getEndDate());
    Reservation reservation = Reservation.from(request);
    return reservationRepository.save(reservation);
  }

  private void checkDateLogic(LocalDate startDate, LocalDate endDate) {
    if (endDate.isBefore(startDate) || endDate.isEqual(startDate)) {
      throw new InvalidReservationException("End date must be after start date");
    }
  }

  private void checkRoomAvailability(String roomId, LocalDate startDate, LocalDate endDate) {
    checkRoomExists(roomId);
    List<Reservation> conflicts = reservationRepository.findOverlappingReservations(roomId, startDate, endDate);
    if (!conflicts.isEmpty()) {
      throw new RoomNotAvailableException("Room " + roomId + " is not available from " + startDate + " to " + endDate);
    }
  }

  private void checkRoomExists(String id) {
    if (!roomRepository.existsById(id))
      throw new ResourceNotFoundException("Room not found with id " + id);
  }

  private void checkUserExists(String id) {
    if (!userRepository.existsById(id))
      throw new ResourceNotFoundException("User not found with id " + id);
  }
}

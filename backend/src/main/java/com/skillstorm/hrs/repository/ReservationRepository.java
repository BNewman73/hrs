package com.skillstorm.hrs.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.skillstorm.hrs.model.Reservation;
import com.skillstorm.hrs.model.Reservation.ReservationType;

@Repository
public interface ReservationRepository extends MongoRepository<Reservation, String> {
  List<Reservation> findByUserId(String userId);

  List<Reservation> findByRoomId(String roomId);

  List<Reservation> findByType(ReservationType type);

  // find all reservations for a room within startDate and endDate
  @Query("{ 'room_id': ?0, 'end_date': { $gte: ?1 }, 'start_date' : { $lte: ?2 }}")
  List<Reservation> findByRoomIdAndDateRange(String roomId, LocalDate startDate, LocalDate endDate);

  // find existing reservations anytime from startDate to endDate for specific
  // room
  @Query("{ 'room_id': ?0, $or: [ " +
      "{ 'start_date' : { $lt: ?1 }, 'end_date': { $gt: ?2 } }, " +
      "{ 'start_date' : { $gte: ?1, $lte: ?2 } }," +
      "{ 'end_date' : { $gte: ?1, $lte: ?2 } }" +
      " ]}")
  List<Reservation> findOverlappingReservations(String roomNum, LocalDate startDate, LocalDate endDate);

  // find existing reservations anytime from startDate to EndDate for all rooms
  @Query("{ $or: [ " +
      "{ 'start_date': { $lte: ?0 }, 'end_date': { $gte: ?1 } }, " +
      "{ 'start_date' : { $gte: ?0, $lte: ?1 } }," +
      "{ 'end_date' : { $gte: ?0, $lte: ?1 } }" +
      " ] }")
  List<Reservation> findReservationsInDateRange(LocalDate startDate, LocalDate endDate);
}

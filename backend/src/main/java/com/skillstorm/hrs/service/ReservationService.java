package com.skillstorm.hrs.service;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.skillstorm.hrs.dto.CalendarEventDTO;
import com.skillstorm.hrs.dto.reservation.BlockRequestDTO;
import com.skillstorm.hrs.dto.reservation.BookingRequestDTO;
import com.skillstorm.hrs.dto.reservation.RefundResponseDTO;
import com.skillstorm.hrs.dto.reservation.ReservationWithGuestDTO;
import com.skillstorm.hrs.dto.userDTOs.UserDTO;
import com.skillstorm.hrs.dto.reservation.ReservationResponseDTO;
import com.skillstorm.hrs.exception.InvalidReservationException;
import com.skillstorm.hrs.exception.ResourceNotFoundException;
import com.skillstorm.hrs.exception.RoomNotAvailableException;
import com.skillstorm.hrs.model.Reservation;
import com.skillstorm.hrs.model.Reservation.ReservationType;
import com.skillstorm.hrs.model.Room;
import com.skillstorm.hrs.model.RoomDetails.RoomType;
import com.skillstorm.hrs.model.User;
import com.skillstorm.hrs.repository.ReservationRepository;
import com.skillstorm.hrs.repository.RoomRepository;
import com.skillstorm.hrs.repository.UserRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Refund;
import com.stripe.model.checkout.Session;
import com.stripe.param.RefundCreateParams;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationService {

  private final UserRepository userRepository;
  private final ReservationRepository reservationRepository;
  private final RoomRepository roomRepository;
  private final ReservationEmailService emailService;

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

  public List<ReservationWithGuestDTO> getAllReservationsWithGuests() {

    List<Reservation> reservations = reservationRepository.findAll();

    Set<String> providerIds = reservations.stream()
        .map(Reservation::getUserId)
        .filter(Objects::nonNull)
        .collect(Collectors.toSet());

    Map<String, User> usersByProviderId = userRepository
        .findByProviderIdIn(providerIds)
        .stream()
        .collect(Collectors.toMap(User::getProviderId, Function.identity()));

    return reservations.stream().map(reservation -> {

      ReservationWithGuestDTO dto = new ReservationWithGuestDTO();
      dto.setReservation(reservation);

      User guest = usersByProviderId.get(reservation.getUserId());
      if (guest != null) {
        dto.setGuest(new UserDTO(
            guest.getId(),
            guest.getFirstName(),
            guest.getLastName(),
            guest.getEmail(),
            guest.getAvatarUrl(),
            guest.getProvider().name(),
            guest.getRole().name()));
      }

      return dto;
    }).toList();
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

  private void checkRoomAvailability(String roomNum, LocalDate startDate, LocalDate endDate) {
    checkRoomExists(roomNum);
    List<Reservation> conflicts = reservationRepository.findOverlappingReservations(roomNum, startDate, endDate);
    if (!conflicts.isEmpty()) {
      throw new RoomNotAvailableException("Room " + roomNum + " is not available from " + startDate + " to " + endDate);
    }
  }

  private void checkRoomExists(String num) {
    if (!roomRepository.findByRoomNumber(num).isPresent())
      throw new ResourceNotFoundException("Room not found with num " + num);
  }

  private void checkUserExists(String id) {
    if (!userRepository.existsById(id))
      throw new ResourceNotFoundException("User not found with id " + id);
  }

  public List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, Integer guests,
      RoomType roomType) {
    List<Room> allRooms = roomRepository.findAll();

    List<Reservation> overlappingReservations = reservationRepository.findReservationsInDateRange(checkInDate,
        checkOutDate);
    System.out.println("overlapping reservations: " + overlappingReservations);

    Set<String> bookedRoomIds = overlappingReservations.stream()
        .map(Reservation::getRoomId)
        .collect(Collectors.toSet());

    List<Room> availableRooms = allRooms.stream()
        .filter(room -> !bookedRoomIds.contains(room.getRoomNumber()))
        .filter(room -> guests == null || room.getRoomDetails().getMaxCapacity() >= guests)
        .filter(room -> roomType == null || room.getRoomDetails().getType().equals(roomType))
        .collect(Collectors.toList());

    return availableRooms;
  }

  public List<CalendarEventDTO> getRoomReservations(String roomNumber, LocalDate startDate, LocalDate endDate) {
    List<Reservation> reservations = reservationRepository
        .findReservationsInDateRange(startDate, endDate)
        .stream()
        .filter(r -> r.getRoomId().equals(roomNumber))
        .filter(r -> !"refunded".equals(r.getPaymentStatus()))
        .collect(Collectors.toList());

    return reservations.stream()
        .map(CalendarEventDTO::from)
        .collect(Collectors.toList());
  }

  public Reservation createReservationFromStripeSession(
      String receiptUrl,
      String sessionId,
      String paymentIntentId,
      String guestEmail,
      String roomNumber,
      String checkInDate,
      String checkOutDate,
      int guests,
      int totalPrice,
      String userId) {

    // Find the room
    Room room = roomRepository.findByRoomNumber(roomNumber)
        .orElseThrow(() -> new RuntimeException("Room not found: " + roomNumber));

    // Calculate number of nights
    LocalDate checkIn = LocalDate.parse(checkInDate);
    LocalDate checkOut = LocalDate.parse(checkOutDate);

    // Create reservation
    Reservation reservation = Reservation.builder()
        .userId(userId)
        .roomId(roomNumber)
        .startDate(checkIn)
        .endDate(checkOut)
        .guests(guests)
        .totalPrice(totalPrice)
        .stripeSessionId(sessionId)
        .stripePaymentIntentId(paymentIntentId)
        .paymentStatus("paid")
        .type(Reservation.ReservationType.GUEST_BOOKING)
        .build();
    Reservation savedReservation = reservationRepository.save(reservation);
    User user = userRepository.findByProviderId(userId)
        .orElseThrow(() -> new RuntimeException("User not found: " + userId));
    emailService.sendBookingConfirmation(receiptUrl, guestEmail, roomNumber, checkInDate, checkOutDate, guests,
        totalPrice, user.getFirstName(), user.getLastName());
    return savedReservation;
  }

  // CREATE RESERVATION AFTER STRIPE SUCCESS
  public Reservation createReservationFromSessionId(String sessionId, String userId) throws StripeException {
    System.out.println("=== Creating reservation from session ID: " + sessionId + " ===");

    // Fetch session from Stripe
    Session session = Session.retrieve(sessionId);
    System.out.println("Session retrieved from Stripe");

    // Check if payment was successful
    if (!"paid".equals(session.getPaymentStatus())) {
      throw new RuntimeException("Payment not completed for session: " + sessionId);
    }

    // Check if reservation already exists (prevent duplicates)
    if (reservationRepository.findByStripeSessionId(sessionId).isPresent()) {
      System.out.println("Reservation already exists for this session");
      return reservationRepository.findByStripeSessionId(sessionId).get();
    }

    // Extract metadata
    String roomNumber = session.getMetadata().get("roomNumber");
    String checkInDate = session.getMetadata().get("checkInDate");
    String checkOutDate = session.getMetadata().get("checkOutDate");
    String guests = session.getMetadata().get("guests");

    System.out.println("Metadata extracted:");
    System.out.println("  Room: " + roomNumber);
    System.out.println("  Check-in: " + checkInDate);
    System.out.println("  Check-out: " + checkOutDate);
    System.out.println("  Guests: " + guests);
    PaymentIntent paymentIntent = PaymentIntent.retrieve(session.getPaymentIntent());
    String latestChargeId = paymentIntent.getLatestCharge();
    if (latestChargeId == null) {
      throw new RuntimeException("No Stripe charge found for payment intent");
    }

    Charge charge = Charge.retrieve(latestChargeId);
    String receiptUrl = charge.getReceiptUrl();

    // Create reservation using existing method
    return createReservationFromStripeSession(
        receiptUrl,
        session.getId(),
        session.getPaymentIntent(),
        session.getCustomerDetails().getEmail(),
        roomNumber,
        checkInDate,
        checkOutDate,
        Integer.parseInt(guests),
        (int) (session.getAmountTotal() / 100.0),
        userId);
  }

  // get reservations associated with User providerId
  public List<Reservation> getUserReservations(String userId) {
    return reservationRepository.findByUserIdOrderByStartDateDesc(userId);
  }

  public List<ReservationResponseDTO> getUpcomingReservations(String userId) {
    LocalDate today = LocalDate.now();
    List<Reservation> reservations = reservationRepository
        .findByUserIdAndStartDateGreaterThanOrderByStartDateAsc(userId, today);
    return reservations.stream()
        .map(this::mapToResponseDTO)
        .collect(Collectors.toList());
  }

  public List<ReservationResponseDTO> getPastReservations(String userId) {
    LocalDate today = LocalDate.now();
    List<Reservation> reservations = reservationRepository
        .findByUserIdAndEndDateLessThanOrderByEndDateDesc(userId, today);

    return reservations.stream()
        .map(this::mapToResponseDTO)
        .collect(Collectors.toList());
  }

  public List<ReservationResponseDTO> getCurrentReservations(String userId) {
    LocalDate today = LocalDate.now();
    List<Reservation> reservations = reservationRepository
        .findCurrentReservationsByUserId(userId, today);
    return reservations.stream().map(this::mapToResponseDTO).collect(Collectors.toList());
  }

  private ReservationResponseDTO mapToResponseDTO(Reservation reservation) {
    Room room = roomRepository.findByRoomNumber(reservation.getRoomId())
        .orElseThrow(() -> new ResourceNotFoundException("Room not found with number " + reservation.getRoomId()));

    return ReservationResponseDTO.builder()
        .id(reservation.getId())
        .publicId(reservation.getPublicId())
        .startDate(reservation.getStartDate())
        .endDate(reservation.getEndDate())
        .guests(reservation.getGuests())
        .totalPrice(reservation.getTotalPrice())
        .paymentStatus(reservation.getPaymentStatus())
        .stripePaymentIntentId(reservation.getStripePaymentIntentId())
        .roomNumber(room.getRoomNumber())
        .roomType(room.getRoomDetails().getType())
        .roomCapcity(room.getRoomDetails().getMaxCapacity())
        .roomPricePerNight(room.getPricePerNight())
        .build();
  }

  public RefundResponseDTO postRefund(String paymentIntentId) {
    try {
      PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);

      String latestChargeId = paymentIntent.getLatestCharge();
      if (latestChargeId == null) {
        throw new IllegalStateException("No Stripe charge found for payment intent");
      }

      RefundCreateParams params = RefundCreateParams.builder()
          .setCharge(latestChargeId)
          .build();

      Refund refund = Refund.create(params);

      Reservation reservation = reservationRepository
          .findByStripePaymentIntentId(paymentIntentId)
          .orElseThrow(() -> new IllegalStateException("Reservation not found for payment intent"));

      reservation.setPaymentStatus("refunded");
      reservationRepository.save(reservation);

      return RefundResponseDTO.builder()
          .refundId(refund.getId())
          .paymentIntentId(paymentIntentId)
          .chargeId(latestChargeId)
          .amount(refund.getAmount())
          .currency(refund.getCurrency())
          .status(refund.getStatus())
          .created(refund.getCreated())
          .build();

    } catch (StripeException e) {
      throw new RuntimeException("Stripe refund failed: " + e.getMessage(), e);
    }
  }

  public Map<LocalDate, Integer> getOccupancyByDay(LocalDate startDate, LocalDate endDate) {

    List<Reservation> reservations = reservationRepository.findReservationsInDateRange(startDate, endDate);
    Map<LocalDate, Integer> occupancyMap = new LinkedHashMap<>();

    for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
      int count = 0;
      for (Reservation reservation : reservations) {
        if (!date.isBefore(reservation.getStartDate()) && date.isBefore(reservation.getEndDate())) {
          count++;
        }
      }
      occupancyMap.put(date, count);
    }
    return occupancyMap;
  }

}

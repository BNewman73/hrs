package com.skillstorm.hrs.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hrs.dto.CalendarEventDTO;
import com.skillstorm.hrs.dto.roomDTOS.RoomDTO;
import com.skillstorm.hrs.dto.roomDTOS.RoomPatchDTO;
import com.skillstorm.hrs.dto.roomDTOS.RoomPutDTO;
import com.skillstorm.hrs.dto.roomDTOS.RoomResponseDTO;
import com.skillstorm.hrs.model.Room;
import com.skillstorm.hrs.model.RoomDetails.RoomType;
import com.skillstorm.hrs.service.ReservationService;
import com.skillstorm.hrs.service.RoomService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/rooms")
public class RoomController {
    private final RoomService roomService;
    private final ReservationService reservationService;

    public RoomController(RoomService roomService, ReservationService reservationService) {
        this.roomService = roomService;
        this.reservationService = reservationService;
    }

    /**
     * Creates a new Room entry in the database.
     * @param room The RoomDTO object to create.
     * @return ResponseEntity containing the created RoomResponseDTO object.
     */
    @PostMapping
    public ResponseEntity<RoomResponseDTO> postRoom(@RequestBody @Valid RoomDTO room) {
        RoomResponseDTO createdRoom = roomService.createRoom(room);
        return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
    }

    /**
     * Retrieves all rooms from the database.
     * @return ResponseEntity containing the list of all RoomResponseDTO objects.
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<RoomResponseDTO>> getRooms() {
        List<RoomResponseDTO> allRooms = roomService.retrieveAllRooms();
        return ResponseEntity.ok(allRooms);
    }

    /**
     * Retrieves rooms by their type.
     * @param roomType The type of rooms to retrieve.
     * @return ResponseEntity containing the list of Room objects of the specified type.
     */
    @GetMapping("/type/{roomType}")
    public ResponseEntity<List<Room>> getRoomsByType(@PathVariable RoomType roomType) {
        System.out.println(roomType);
        List<Room> rooms = roomService.getRoomsByType(roomType);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    /**
     * Retrieves a room by its public ID.
     * @param publicId The public ID of the room to retrieve.
     * @return ResponseEntity containing the RoomResponseDTO object.
     */
    @GetMapping("{publicId}")
    public ResponseEntity<RoomResponseDTO> getRoom(@PathVariable String publicId) {

        return ResponseEntity.ok(roomService.retrieveRoom(publicId));
    }

    /**
     * Updates a room by its public ID.
     * @param publicId The public ID of the room to update.
     * @param dto The RoomPutDTO object containing updated room information.
     * @return ResponseEntity containing the updated RoomResponseDTO object.
     */
    @PutMapping("/{publicId}")
    public ResponseEntity<RoomResponseDTO> putRoom(
            @PathVariable String publicId,
            @RequestBody @Valid RoomPutDTO dto) {
        return ResponseEntity.ok(roomService.updateRoom(publicId, dto, true));
    }

    /**
     * Partially updates a room by its public ID.
     * @param publicId The public ID of the room to update.
     * @param dto The RoomPatchDTO object containing updated room information.
     * @return ResponseEntity containing the updated RoomResponseDTO object.
     */
    @PatchMapping("/{publicId}")
    public ResponseEntity<RoomResponseDTO> patchRoom(
            @PathVariable String publicId,
            @RequestBody @Valid RoomPatchDTO dto) {
        return ResponseEntity.ok(roomService.updateRoom(publicId, dto, false));
    }

    /**
     * Deletes a room by its public ID.
     * @param publicId The public ID of the room to delete.
     * @return ResponseEntity with no content.
     */
    @DeleteMapping("/{publicId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable String publicId) {
        roomService.deleteRoom(publicId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Retrieves reservations for a specific room within a date range.
     * @param roomNumber The room number to retrieve reservations for.
     * @param startDate The start date of the date range.
     * @param endDate The end date of the date range.
     * @return ResponseEntity containing the list of CalendarEventDTO objects.
     */
    @GetMapping("/{roomNumber}/reservations")
    public ResponseEntity<List<CalendarEventDTO>> getRoomReservations(
            @PathVariable String roomNumber,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<CalendarEventDTO> events = reservationService.getRoomReservations(roomNumber, startDate, endDate);
        return ResponseEntity.ok(events);
    }

}

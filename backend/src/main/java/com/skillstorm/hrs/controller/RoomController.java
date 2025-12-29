package com.skillstorm.hrs.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping
    public ResponseEntity<RoomResponseDTO> postRoom(@RequestBody @Valid RoomDTO room) {
        RoomResponseDTO createdRoom = roomService.createRoom(room);
        return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<RoomResponseDTO>> getRooms() {
        List<RoomResponseDTO> allRooms = roomService.retrieveAllRooms();
        return ResponseEntity.ok(allRooms);
    }

    @GetMapping("{publicId}")
    public ResponseEntity<RoomResponseDTO> getRoom(@PathVariable String publicId) {

        return ResponseEntity.ok(roomService.retrieveRoom(publicId));
    }

    @PutMapping("/{publicId}")
    public ResponseEntity<RoomResponseDTO> putRoom(
            @PathVariable String publicId,
            @RequestBody @Valid RoomPutDTO dto) {
        return ResponseEntity.ok(roomService.updateRoom(publicId, dto, true));
    }

    @PatchMapping("/{publicId}")
    public ResponseEntity<RoomResponseDTO> patchRoom(
            @PathVariable String publicId,
            @RequestBody @Valid RoomPatchDTO dto) {
        return ResponseEntity.ok(roomService.updateRoom(publicId, dto, false));
    }

    @DeleteMapping("/{publicId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable String publicId) {
        roomService.deleteRoom(publicId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{roomNumber}/reservations")
    public ResponseEntity<List<CalendarEventDTO>> getRoomReservations(
            @PathVariable String roomNumber,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<CalendarEventDTO> events = reservationService.getRoomReservations(roomNumber, startDate, endDate);
        return ResponseEntity.ok(events);
    }

}

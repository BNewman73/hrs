package com.skillstorm.hrs.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hrs.dto.RoomDetailsDTO;
import com.skillstorm.hrs.model.RoomDetails;
import com.skillstorm.hrs.service.RoomDetailsService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping("/room-details")
public class RoomDetailsController {
    private final RoomDetailsService roomDetailsService;

    /**
     * Creates a new RoomDetails entry in the database.
     * @param roomDetails The RoomDetails object to create.
     * @return ResponseEntity containing the created RoomDetails object.
     */
    @PostMapping
    public ResponseEntity<RoomDetails> postRoomDetials(@RequestBody RoomDetails roomDetails) {

        return new ResponseEntity<>(roomDetailsService.createRoomDetails(roomDetails), HttpStatus.CREATED);
    }

    /**
     * Retrieves all RoomDetails entries from the database.
     * @return ResponseEntity containing the list of all RoomDetails objects.
     */
    @GetMapping
    public ResponseEntity<List<RoomDetails>> getRoom() {
        return new ResponseEntity<>(roomDetailsService.getRoomDetails(), HttpStatus.CREATED);
    }

    /**
     * Retrieves comprehensive details for all RoomDetails entries.
     * @return ResponseEntity containing the list of RoomDetailsDTO objects.
     */
    @GetMapping("/comprehensive")
    public ResponseEntity<List<RoomDetailsDTO>> getComprehensiveRoomDetails() {
        List<RoomDetailsDTO> roomDetails = roomDetailsService.getComprehensiveRoomDetails();
        return new ResponseEntity<>(roomDetails, HttpStatus.OK);
    }
}

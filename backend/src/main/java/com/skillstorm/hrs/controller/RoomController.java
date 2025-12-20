package com.skillstorm.hrs.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hrs.dto.roomDTOS.RoomDTO;
import com.skillstorm.hrs.dto.roomDTOS.RoomPatchDTO;
import com.skillstorm.hrs.dto.roomDTOS.RoomPutDTO;
import com.skillstorm.hrs.model.Room;
import com.skillstorm.hrs.service.RoomService;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/rooms")
public class RoomController {
    private final RoomService roomService;
    
public RoomController(RoomService roomService){
    this.roomService=roomService;
}

@PostMapping
public ResponseEntity<Room> postRoom(@RequestBody RoomDTO room){
    Room createdRoom = roomService.createRoom(room);
    return new ResponseEntity<>(createdRoom,HttpStatus.CREATED);
}

@GetMapping
public ResponseEntity<List<Room>> getRooms() {
    List<Room> allRooms = roomService.retrieveAllRooms(); 
    return ResponseEntity.ok(allRooms);
}

 @PutMapping("/{roomNumber}")
    public ResponseEntity<RoomDTO> putRoom(
            @PathVariable String roomNumber,
            @RequestBody @Valid RoomPutDTO dto) {
     return ResponseEntity.ok(roomService.updateRoom(roomNumber, dto, true));
    }

    @PatchMapping("/{roomNumber}")
    public ResponseEntity<RoomDTO> patchRoom(
            @PathVariable String roomNumber,
            @RequestBody@Valid RoomPatchDTO dto) {
        return ResponseEntity.ok(roomService.updateRoom(roomNumber, dto, false));
    }
    @DeleteMapping("/{roomNumber}")
    public ResponseEntity<String> deleteRoom(@PathVariable String roomNumber){
                roomService.deleteRoom(roomNumber);
                return ResponseEntity.noContent().build();
    }   


}

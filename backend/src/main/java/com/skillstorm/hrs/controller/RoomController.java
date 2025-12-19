package com.skillstorm.hrs.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hrs.model.Room;
import com.skillstorm.hrs.service.RoomService;


@RestController
@RequestMapping("/rooms")
public class RoomController {
    private final RoomService roomService;
    
public RoomController(RoomService roomService){
    this.roomService=roomService;
}

@PostMapping
public ResponseEntity<Room> postRoom(@RequestBody Room room){
    Room createdRoom = roomService.createRoom(room);
    return new ResponseEntity<>(createdRoom,HttpStatus.CREATED);
}

@GetMapping()
public ResponseEntity<List<Room>> getRooms() {
    List<Room> allRooms = roomService.retrieveAllRooms(); 
    return ResponseEntity.ok(allRooms);
}


}

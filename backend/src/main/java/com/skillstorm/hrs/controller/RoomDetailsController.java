package com.skillstorm.hrs.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hrs.model.RoomDetails;
import com.skillstorm.hrs.service.RoomDetailsService;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@RestController
@RequestMapping("/room/details")
public class RoomDetailsController {
    private final RoomDetailsService roomDetailsService;
    @PostMapping
    public ResponseEntity<RoomDetails> postRoomDetials(@RequestBody RoomDetails roomDetails) {
        
        
        return new ResponseEntity<>( roomDetailsService.createRoomDetails(roomDetails),HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<RoomDetails>>  getRoom() {
        return new ResponseEntity<>( roomDetailsService.getRoomDetails(),HttpStatus.CREATED); 
    }
    


    
}

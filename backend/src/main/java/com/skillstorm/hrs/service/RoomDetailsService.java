package com.skillstorm.hrs.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.skillstorm.hrs.model.RoomDetails;
import com.skillstorm.hrs.repository.RoomDetailsRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RoomDetailsService {
    private final RoomDetailsRepository roomDetailsRepository;


    public RoomDetails createRoomDetails(RoomDetails roomDetails ){
        if(roomDetailsRepository.findById(roomDetails.getType()).isPresent()){
                       throw new RuntimeException(roomDetails.getType().toString() + " already exists!");
        }
        return roomDetailsRepository.save(roomDetails);
    }
    public List<RoomDetails> getRoomDetails(){
        return roomDetailsRepository.findAll();
    }
    
}

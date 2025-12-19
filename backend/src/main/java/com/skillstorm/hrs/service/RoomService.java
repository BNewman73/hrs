package com.skillstorm.hrs.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.skillstorm.hrs.model.Room;
import com.skillstorm.hrs.repository.RoomRepository;



@Service 
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository){
        this.roomRepository =roomRepository;
    }
    @Transactional
    public Room createRoom(Room room){
        if (roomRepository.findByRoomNumber(room.getRoomNumber()).isPresent()) {
            throw new RuntimeException("Room number " + room.getRoomNumber() + " already exists!");
        }
            return roomRepository.save(room);
    }

    public List<Room> retrieveAllRooms(){
        return roomRepository.findAll();
    }

}

package com.skillstorm.hrs.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.skillstorm.hrs.dto.roomDTOS.RoomDTO;
import com.skillstorm.hrs.model.Room;
import com.skillstorm.hrs.repository.RoomRepository;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Service 
public class RoomService {

    private final RoomRepository roomRepository;

    private final ModelMapper modelMapper;

    @Transactional
    public Room createRoom(RoomDTO room){
        if (roomRepository.findByRoomNumber(room.getRoomNumber()).isPresent()) {
            throw new RuntimeException("Room number " + room.getRoomNumber() + " already exists!");
        }
            Room newRoom = roomRepository.save(modelMapper.map(room,Room.class));
    
            return newRoom;
    }

    public void deleteRoom(String roomNumber){
       Room room = roomRepository.findByRoomNumber(roomNumber).orElseThrow(()->  new RuntimeException("Room not found: " + roomNumber));
        roomRepository.deleteById(room.getId());
        

    }

    public List<Room> retrieveAllRooms(){
        return roomRepository.findAll();
    }
    
@Transactional
public RoomDTO updateRoom(String roomNumber, Object dto, boolean isPut) {
    Room existing = roomRepository.findByRoomNumber(roomNumber)
            .orElseThrow(() -> new RuntimeException("Room not found: " + roomNumber));

    if (isPut) {
        modelMapper.map(dto, existing);
    } else {
        modelMapper.map(dto, existing);
    }

    Room saved = roomRepository.save(existing);
    return modelMapper.map(saved, RoomDTO.class);
}

}

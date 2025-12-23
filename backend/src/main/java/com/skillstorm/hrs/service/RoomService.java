package com.skillstorm.hrs.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.skillstorm.hrs.dto.roomDTOS.RoomDTO;
import com.skillstorm.hrs.dto.roomDTOS.RoomResponseDTO;
import com.skillstorm.hrs.model.Room;
import com.skillstorm.hrs.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final ModelMapper modelMapper;

    @Transactional
    public RoomResponseDTO createRoom(RoomDTO room) {
        // Check for duplicates using Room Number (Business logic)
        if (roomRepository.findByRoomNumber(room.getRoomNumber()).isPresent()) {
            throw new RuntimeException("Room number " + room.getRoomNumber() + " already exists!");
        }
        return convertToDto(roomRepository.save(convertToRoom(room)), RoomResponseDTO.class);
    }

    @Transactional
    public void deleteRoom(String publicId) {
        Room room = roomRepository.findByPublicId(publicId)
                .orElseThrow(() -> new RuntimeException("Room not found: " + publicId));
        roomRepository.delete(room);
    }

    public List<RoomResponseDTO> retrieveAllRooms() {
        return roomRepository.findAll().stream()
                .map(room -> convertToDto(room, RoomResponseDTO.class))
                .toList();
    }

    public RoomResponseDTO retrieveRoom(String publicId) {
        Room room = roomRepository.findByPublicId(publicId)
                .orElseThrow(() -> new RuntimeException("Room not found: " + publicId));

        return convertToDto(room, RoomResponseDTO.class);
    }

    @Transactional
    public <T> RoomResponseDTO updateRoom(String publicId, T dto, boolean isFullUpdate) {
        Room room = roomRepository.findByPublicId(publicId)
                .orElseThrow(() -> new RuntimeException("Room not found: " + publicId));

        if (!isFullUpdate) {
            // PATCH logic: Tell ModelMapper to skip nulls so we don't wipe existing data
            modelMapper.getConfiguration().setSkipNullEnabled(true);
            modelMapper.map(dto, room);
            modelMapper.getConfiguration().setSkipNullEnabled(false); // Reset to default
        } else {
            // PUT logic: Standard mapping
            modelMapper.map(dto, room);
        }

        Room savedRoom = roomRepository.save(room);
        return convertToDto(savedRoom, RoomResponseDTO.class);
    }

    // --- Generic Helper Functions ---

    private <S, T> T convertToDto(S entity, Class<T> targetClass) {
        return modelMapper.map(entity, targetClass);
    }

    private <T> Room convertToRoom(T roomDTO) {
        return modelMapper.map(roomDTO, Room.class);
    }
}
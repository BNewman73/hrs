package com.skillstorm.hrs.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.skillstorm.hrs.dto.roomDTOS.RoomDTO;
import com.skillstorm.hrs.dto.roomDTOS.RoomResponseDTO;
import com.skillstorm.hrs.exception.ResourceNotFoundException;
import com.skillstorm.hrs.exception.RoomNotAvailableException;
import com.skillstorm.hrs.model.Room;
import com.skillstorm.hrs.model.RoomDetails.RoomType;
import com.skillstorm.hrs.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final ModelMapper modelMapper;

    /**
     * Creates a new Room entry in the database.
     */
    @Transactional
    public RoomResponseDTO createRoom(RoomDTO room) {
        // Business logic: Use RoomNotAvailableException for duplicates
        if (roomRepository.findByRoomNumber(room.getRoomNumber()).isPresent()) {
            throw new RoomNotAvailableException("Room number " + room.getRoomNumber() + " already exists!");
        }
        try {
            System.out.println("ATTEMPTING TO SEND EMAIL TO: ");

            System.out.println("EMAIL SEND REQUEST SUBMITTED");

        } catch (Exception e) {
            throw new RuntimeException("Failed to send reservation confirmation email", e);
        }

        return convertToDto(roomRepository.save(convertToRoom(room)), RoomResponseDTO.class);
    }

    /**
     * Deletes a Room entry from the database.
     * @param publicId The public ID of the room to delete.
     */
    @Transactional
    public void deleteRoom(String publicId) {
        Room room = roomRepository.findByPublicId(publicId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with ID: " + publicId));
        roomRepository.delete(room);
    }

    /**
     * Retrieves all rooms from the database.
     */
    public List<RoomResponseDTO> retrieveAllRooms() {
        return roomRepository.findAll().stream()
                .map(room -> convertToDto(room, RoomResponseDTO.class))
                .toList();
    }

    /**
     * Retrieves a specific room by its public ID.
     * @return RoomResponseDTO
     */
    public RoomResponseDTO retrieveRoom(String publicId) {
        Room room = roomRepository.findByPublicId(publicId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with ID: " + publicId));

        return convertToDto(room, RoomResponseDTO.class);
    }

    /**
     * Updates a Room entry in the database.
     * @param publicId The public ID of the room to update.
     * @param dto The DTO containing updated room information.
     * @param isFullUpdate Flag indicating whether it's a full update (PUT) or partial update (PATCH).
     * @return Updated RoomResponseDTO
     */
    @Transactional
    public <T> RoomResponseDTO updateRoom(String publicId, T dto, boolean isFullUpdate) {
        Room room = roomRepository.findByPublicId(publicId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with ID: " + publicId));

        if (!isFullUpdate) {
            modelMapper.getConfiguration().setSkipNullEnabled(true);
            modelMapper.map(dto, room);
            modelMapper.getConfiguration().setSkipNullEnabled(false);
        } else {
            modelMapper.map(dto, room);
        }

        Room savedRoom = roomRepository.save(room);
        return convertToDto(savedRoom, RoomResponseDTO.class);
    }

    /**
     * Retrieves rooms by their type.
     */
    public List<Room> getRoomsByType(RoomType roomType) {
        return roomRepository.findByRoomDetails(roomType);
    }

    /** Converts an entity to a DTO of the specified target class. */
    private <S, T> T convertToDto(S entity, Class<T> targetClass) {
        return modelMapper.map(entity, targetClass);
    }

    /** Converts a room DTO to a Room entity. */
    private <T> Room convertToRoom(T roomDTO) {
        return modelMapper.map(roomDTO, Room.class);
    }

}
package com.skillstorm.hrs.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.skillstorm.hrs.model.Room;
import com.skillstorm.hrs.model.RoomDetails.RoomType;

public interface RoomRepository extends MongoRepository<Room, String> {
    Optional<Room> findByRoomNumber(String roomNumber);

    Optional<Room> findByPublicId(String publicId);

    List<Room> findByRoomDetails(RoomType roomType);
}
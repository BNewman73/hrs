package com.skillstorm.hrs.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.skillstorm.hrs.model.Room;

public interface RoomRepository extends MongoRepository<Room, String> {
    Optional<Room> findByRoomNumber(String roomNumber);

    Optional<Room> findByPublicId(String publicId);
}
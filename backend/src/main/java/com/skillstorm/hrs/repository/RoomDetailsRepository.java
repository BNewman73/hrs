package com.skillstorm.hrs.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.hrs.model.RoomDetails;
import com.skillstorm.hrs.model.RoomDetails.RoomType;

@Repository
public interface RoomDetailsRepository extends MongoRepository<RoomDetails, RoomType> {

}

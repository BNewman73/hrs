package com.skillstorm.hrs.service;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.skillstorm.hrs.dto.RoomDetailsDTO;
import com.skillstorm.hrs.model.Room;
import com.skillstorm.hrs.model.RoomDetails;
import com.skillstorm.hrs.repository.RoomDetailsRepository;
import com.skillstorm.hrs.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class RoomDetailsService {
    private final RoomDetailsRepository roomDetailsRepository;
    private final RoomRepository roomRepository;

    public RoomDetails createRoomDetails(RoomDetails roomDetails) {
        if (roomDetailsRepository.findById(roomDetails.getType()).isPresent()) {
            throw new RuntimeException(roomDetails.getType().toString() + " already exists!");
        }
        return roomDetailsRepository.save(roomDetails);
    }

    public List<RoomDetails> getRoomDetails() {
        return roomDetailsRepository.findAll();
    }

    public List<RoomDetails> getAllRoomDetails() {
        return roomDetailsRepository.findAll();
    }

    public List<RoomDetailsDTO> getComprehensiveRoomDetails() {
        List<RoomDetails> allRoomDetails = roomDetailsRepository.findAll();
        return allRoomDetails.stream()
                .map(this::buildRoomDetailsDTO)
                .collect(Collectors.toList());
    }

    private RoomDetailsDTO buildRoomDetailsDTO(RoomDetails roomDetails) {
        List<Room> roomsOfType = roomRepository.findByRoomDetails(roomDetails.getType());
        double minPrice = roomsOfType.stream()
                .mapToInt(Room::getPricePerNight)
                .min()
                .orElse(0);
        double maxPrice = roomsOfType.stream()
                .mapToInt(Room::getPricePerNight)
                .max()
                .orElse(0);
        List<String> images = roomsOfType.stream()
                .map(Room::getImage)
                .filter(image -> image != null && !image.isEmpty())
                .distinct()
                .collect(Collectors.toList());
        Map<String, List<String>> amenitiesByCategory = buildAmenitiesMap(roomDetails);
        return RoomDetailsDTO.builder()
                .type(roomDetails.getType().name())
                .description(roomDetails.getDescription())
                .maxCapacity(roomDetails.getMaxCapacity())
                .amenitiesByCategory(amenitiesByCategory)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .images(images)
                .build();
    }

    private Map<String, List<String>> buildAmenitiesMap(RoomDetails roomDetails) {
        Map<String, List<String>> amenitiesMap = new LinkedHashMap<>();
        if (roomDetails.getTech() != null && !roomDetails.getTech().isEmpty()) {
            amenitiesMap.put("Tech & Connectivity",
                    roomDetails.getTech().stream()
                            .map(tech -> formatEnumName(tech.name()))
                            .collect(Collectors.toList()));
        }
        if (roomDetails.getComfort() != null && !roomDetails.getComfort().isEmpty()) {
            amenitiesMap.put("Comfort & Sleep",
                    roomDetails.getComfort().stream()
                            .map(comfort -> formatEnumName(comfort.name()))
                            .collect(Collectors.toList()));
        }
        if (roomDetails.getProvisions() != null && !roomDetails.getProvisions().isEmpty()) {
            amenitiesMap.put("Food & Beverage",
                    roomDetails.getProvisions().stream()
                            .map(provision -> formatEnumName(provision.name()))
                            .collect(Collectors.toList()));
        }
        if (roomDetails.getMiscellaneous() != null && !roomDetails.getMiscellaneous().isEmpty()) {
            amenitiesMap.put("Safety & Convenience",
                    roomDetails.getMiscellaneous().stream()
                            .map(misc -> formatEnumName(misc.name()))
                            .collect(Collectors.toList()));
        }
        return amenitiesMap;
    }

    private String formatEnumName(String enumValue) {
        return Arrays.stream(enumValue.split("_"))
                .map(word -> word.charAt(0) + word.substring(1).toLowerCase())
                .collect(Collectors.joining(" "));
    }

}

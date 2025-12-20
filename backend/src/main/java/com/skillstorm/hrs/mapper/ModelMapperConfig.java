package com.skillstorm.hrs.mapper;

import org.modelmapper.Conditions;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration.AccessLevel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.skillstorm.hrs.dto.roomDTOS.RoomDTO;
import com.skillstorm.hrs.dto.roomDTOS.RoomPatchDTO;
import com.skillstorm.hrs.dto.roomDTOS.RoomPutDTO;
import com.skillstorm.hrs.model.Room;
import com.skillstorm.hrs.model.RoomDetails;
import com.skillstorm.hrs.model.RoomDetails.RoomType;
import com.skillstorm.hrs.repository.RoomDetailsRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class ModelMapperConfig {

    private final RoomDetailsRepository roomDetailsRepository;

    @Bean
    public ModelMapper modelMapper() {

        ModelMapper modelMapper = new ModelMapper();

        // Global configuration
        modelMapper.getConfiguration()
                .setFieldMatchingEnabled(true)
                .setFieldAccessLevel(AccessLevel.PRIVATE)
                .setSkipNullEnabled(true)
                .setPropertyCondition(Conditions.isNotNull())
                .setAmbiguityIgnored(true);

        // Shared converter: RoomType -> RoomDetails
        Converter<RoomType, RoomDetails> typeToDetailsConverter = ctx -> {
            RoomType source = ctx.getSource();
            if (source == null) return null;

            return roomDetailsRepository.findById(source)
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "RoomDetails not found for type: " + source));
        };

        // Apply mappings
        configureRoomMappings(modelMapper, typeToDetailsConverter);

        return modelMapper;
    }

    private void configureRoomMappings(ModelMapper modelMapper,
                                       Converter<RoomType, RoomDetails> converter) {

        modelMapper.createTypeMap(RoomDTO.class, Room.class)
                .addMappings(mapper ->
                        mapper.using(converter)
                              .map(RoomDTO::getRoomType, Room::setRoomDetails));

        modelMapper.createTypeMap(RoomPutDTO.class, Room.class)
                .addMappings(mapper ->
                        mapper.using(converter)
                              .map(RoomPutDTO::getRoomType, Room::setRoomDetails));

        modelMapper.createTypeMap(RoomPatchDTO.class, Room.class)
                .addMappings(mapper ->
                        mapper.using(converter)
                              .map(RoomPatchDTO::getRoomType, Room::setRoomDetails));
    }
}

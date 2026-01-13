package com.skillstorm.hrs.config;

import org.modelmapper.Conditions;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration.AccessLevel;
import org.modelmapper.convention.MatchingStrategies;
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

                modelMapper.getConfiguration()
                                .setMatchingStrategy(MatchingStrategies.STRICT)
                                .setFieldMatchingEnabled(true)
                                .setFieldAccessLevel(AccessLevel.PRIVATE)
                                .setSkipNullEnabled(true)
                                .setPropertyCondition(Conditions.isNotNull());

                // Define the Converter logic
                Converter<RoomType, RoomDetails> typeToDetailsConverter = ctx -> {
                        RoomType source = ctx.getSource();
                        if (source == null)
                                return null;

                        return roomDetailsRepository.findById(source)
                                        .orElseThrow(() -> new IllegalArgumentException(
                                                        "No RoomDetails found in DB for type: " + source));
                };

                configureRoomMappings(modelMapper, typeToDetailsConverter);

                return modelMapper;
        }

        private void configureRoomMappings(ModelMapper modelMapper,
                        Converter<RoomType, RoomDetails> converter) {

                // Mapping for RoomDTO
                modelMapper.typeMap(RoomDTO.class, Room.class).addMappings(mapper -> {
                        mapper.skip(Room::setRoomDetails);
                        mapper.using(converter).map(RoomDTO::getRoomType, Room::setRoomDetails);
                });

                // Mapping for RoomPutDTO
                modelMapper.typeMap(RoomPutDTO.class, Room.class).addMappings(mapper -> {
                        mapper.skip(Room::setRoomDetails);
                        mapper.using(converter).map(RoomPutDTO::getRoomType, Room::setRoomDetails);
                });

                // Mapping for RoomPatchDTO
                modelMapper.typeMap(RoomPatchDTO.class, Room.class).addMappings(mapper -> {
                        mapper.skip(Room::setRoomDetails);
                        mapper.using(converter).map(RoomPatchDTO::getRoomType, Room::setRoomDetails);
                });
        }
}
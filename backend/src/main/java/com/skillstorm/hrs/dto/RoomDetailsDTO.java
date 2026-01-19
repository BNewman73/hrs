package com.skillstorm.hrs.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomDetailsDTO {
  private String type;
  private String description;
  private int maxCapacity;
  private Map<String, List<String>> amenitiesByCategory;
  private double minPrice;
  private double maxPrice;
  private List<String> images;
}

package com.skillstorm.hrs.dto.userDTOs;

public record UserDTO(
    String id,
    String firstName,
    String lastName,
    String email,
    String avatarUrl,
    String provider,
    String role
) {}
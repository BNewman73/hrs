package com.skillstorm.hrs.dto.userDTOs;

public record UserUpdateDTO(
    String firstName,
    String lastName,
    String email,
    String avatarUrl
) {}

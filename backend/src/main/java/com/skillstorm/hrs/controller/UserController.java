package com.skillstorm.hrs.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hrs.dto.userDTOs.UserDTO;
import com.skillstorm.hrs.dto.userDTOs.UserProfileDTO;
import com.skillstorm.hrs.dto.userDTOs.UserUpdateDTO;
import com.skillstorm.hrs.model.User;
import com.skillstorm.hrs.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Get the currently authenticated user's profile information from the OAuth2
     * provider.
     * 
     * @param principal the authenticated OAuth2 user
     */
    @GetMapping("/principal")
    public UserProfileDTO user(@AuthenticationPrincipal OAuth2User principal) {
        return userService.oauth2UserToUserProfileDto(principal);
    }

    /**
     * Get the currently authenticated user's stored information from the database.
     * 
     * @param principal the authenticated OAuth2 user
     * @return
     */
    @GetMapping("/storedUser")
    public UserDTO getCurrentUser(@AuthenticationPrincipal OAuth2User principal) {
        return userService.oauth2UserToUserDto(principal);
    }

    /**
     * Update the currently authenticated user's stored information in the database.
     * 
     * @param principal     the authenticated OAuth2 user
     * @param userUpdateDTO the user update data
     * @return the updated UserDTO
     */
    @PutMapping("/storedUser/update")
    public ResponseEntity<UserDTO> updateCurrentUser(@AuthenticationPrincipal OAuth2User principal,
            @RequestBody UserUpdateDTO userUpdateDTO) {

        UserDTO updatedUser = userService.updateUserFromOAuth2User(principal, userUpdateDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/me")
    public ResponseEntity<User> getUser(@AuthenticationPrincipal OAuth2User principal) {
        return new ResponseEntity<>(userService.oauth2UserToUser(principal), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<User>> getUser() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PutMapping("/{publicId}")
    public ResponseEntity<User> updateUser(
            @PathVariable String publicId,
            @RequestBody UserDTO dto) {
        return new ResponseEntity<>(userService.updateUser(dto, publicId), HttpStatus.OK);
    }

}
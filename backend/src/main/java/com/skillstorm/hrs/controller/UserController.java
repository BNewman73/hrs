package com.skillstorm.hrs.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.hrs.dto.userDTOs.UserDTO;
import com.skillstorm.hrs.model.User;
import com.skillstorm.hrs.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/principal")
    public UserDTO user(@AuthenticationPrincipal OAuth2User principal) {
        return userService.oauth2UserToUserDto(principal);
    }

    @GetMapping("/current-user")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal OAuth2User oauthUser) {

        String providerStr = (String) oauthUser.getAttribute("provider");
        String providerId = (String) oauthUser.getAttribute("providerId");

        if (providerStr == null || providerId == null) {
            return ResponseEntity.badRequest().build();
        }

        User.Provider provider = User.Provider.valueOf(providerStr.toUpperCase());

        return userService.getByProviderAndProviderId(provider, providerId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}

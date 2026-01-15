package com.skillstorm.hrs.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.skillstorm.hrs.dto.userDTOs.UserDTO;
import com.skillstorm.hrs.dto.userDTOs.UserProfileDTO;
import com.skillstorm.hrs.dto.userDTOs.UserUpdateDTO;
import com.skillstorm.hrs.model.User;
import com.skillstorm.hrs.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getByProviderAndProviderId(User.Provider provider, String providerId) {
        return userRepository.findByProviderAndProviderId(provider, providerId);
    }

    public UserProfileDTO oauth2UserToUserProfileDto(OAuth2User user) {
        final Map<String, Object> attributes = user.getAttributes();

        String id = parseAttributes(attributes, "sub", "id");
        String email = parseAttributes(attributes, "email", "login");
        String name = parseAttributes(attributes, "name", "given_name", "login");
        String avatar = parseAttributes(attributes, "picture", "avatar_url");

        return new UserProfileDTO(id, name, email, avatar);
    }

    /**
     * Converts an OAuth2User to a UserDTO by fetching the corresponding User from
     * the database.
     * 
     * @param user OAuth2User object
     * @return UserDTO representation of the user
     */
    public UserDTO oauth2UserToUserDto(OAuth2User principal) {

        User user = oauth2UserToUser(principal);

        return new UserDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getAvatarUrl(),
                user.getProvider().name(),
                user.getRole().name());
    }

    public UserDTO updateUserFromOAuth2User(OAuth2User principal, UserUpdateDTO userUpdateDTO) {

        User user = oauth2UserToUser(principal);

        user.setFirstName(userUpdateDTO.firstName());
        user.setLastName(userUpdateDTO.lastName());
        user.setEmail(userUpdateDTO.email());
        user.setAvatarUrl(userUpdateDTO.avatarUrl());

        User updatedUser = userRepository.save(user);

        return new UserDTO(
                updatedUser.getId(),
                updatedUser.getFirstName(),
                updatedUser.getLastName(),
                updatedUser.getEmail(),
                updatedUser.getAvatarUrl(),
                updatedUser.getProvider().name(),
                updatedUser.getRole().name());
    }

    public User findOrCreateUser(User.Provider provider, String providerId, String email, String firstName,
            String lastName, String avatar) {
        return userRepository
                .findByProviderAndProviderId(provider, providerId)
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .provider(provider)
                            .providerId(providerId)
                            .email(email)
                            .firstName(firstName)
                            .lastName(lastName)
                            .avatarUrl(avatar)
                            .role(User.UserRole.GUEST)
                            .enabled(true)
                            .build();

                    return userRepository.save(newUser);
                });
    }

    /**
     * 
     * Checks if an attribute exists in the map. Returns null if the attribute
     * doesn't exist.
     * 
     * @param map  Attribute map
     * @param keys Attribute
     * @return String representation of associated value or null
     */
    public String parseAttributes(Map<String, Object> map, String... keys) {
        for (String key : keys) {
            if (map.containsKey(key) && map.get(key) != null) {
                return map.get(key).toString();
            }
        }
        return null;
    }

    public User.Provider determineProvider(String issuer) {
        if (issuer != null && issuer.contains("github.com")) {
            return User.Provider.GITHUB;
        } else {
            return User.Provider.GOOGLE;
        }
    }

    /**
     * Converts an OAuth2User to a User entity by fetching from the database.
     * 
     * @param principal OAuth2User object
     * @return User entity
     */
    public User oauth2UserToUser(OAuth2User principal) {
        Map<String, Object> attributes = principal.getAttributes();
        String id = parseAttributes(attributes, "sub", "id");
        String issuer = parseAttributes(attributes, "iss", "url");
        User.Provider provider = determineProvider(issuer);

        return userRepository.findByProviderAndProviderId(provider, id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public String principalToUserId(OAuth2User principal) {
        return oauth2UserToUser(principal).getProviderId();
    }

}
package com.skillstorm.hrs.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.skillstorm.hrs.dto.userDTOs.UserDTO;
import com.skillstorm.hrs.model.User;
import com.skillstorm.hrs.repository.UserRepository;

@Service
public class UserService {
    
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getByProviderAndProviderId(User.Provider provider, String providerId) {
        return userRepository.findByProviderAndProviderId(provider, providerId);
    }

    public UserDTO oauth2UserToUserDto(OAuth2User user) {
        Map<String, Object> attributes = user.getAttributes();

        String id = parseAttributes(attributes, "sub", "id");
        String email = parseAttributes(attributes, "email", "login");
        String name = parseAttributes(attributes, "name", "given_name", "login");
        String avatar = parseAttributes(attributes, "picture", "avatar_url");

        return new UserDTO(id, name, email, avatar);
    }

    /**
     * 
     * Checks if an attribute exists in the map. Returns null if the attribute doesn't exist.
     * 
     * @param map Attribute map
     * @param keys Attribute
     * @return String representation of associated value or null
     */
    private String parseAttributes(Map<String, Object> map, String... keys) {
        for (String key : keys) {
            if (map.containsKey(key) && map.get(key) != null) {
                return map.get(key).toString();
            }
        }
        return null;
    }

}
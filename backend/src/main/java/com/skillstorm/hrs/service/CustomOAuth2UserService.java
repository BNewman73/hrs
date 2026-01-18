package com.skillstorm.hrs.service;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.skillstorm.hrs.model.User;

@Service

public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserService userService;

    public CustomOAuth2UserService(@Lazy UserService userService) {
        this.userService = userService;
    }

    /**
     * Loads the user from the OAuth2 provider, processes the user information,
     * and returns an OAuth2User with the appropriate roles.
     */
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oauth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oauth2User.getAttributes();

        String id = userService.parseAttributes(attributes, "sub", "id");
        String issuer = userService.parseAttributes(attributes, "iss", "url");
        User.Provider provider = userService.determineProvider(issuer);

        String email = userService.parseAttributes(attributes, "email");
        String name = userService.parseAttributes(attributes, "given_name", "name");
        String lastName = userService.parseAttributes(attributes, "family_name");
        String avatar = userService.parseAttributes(attributes, "picture", "avatar_url");

        User user = userService.findOrCreateUser(provider, id, email, name, lastName, avatar);

        // Map the DB role to a Spring Security authority

        List<SimpleGrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));

        // Return the user with the correct roles attached
        return new DefaultOAuth2User(authorities, attributes, provider == User.Provider.GOOGLE ? "email" : "id");
    }
}

package com.skillstorm.hrs.service;

import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.skillstorm.hrs.model.User;
import com.skillstorm.hrs.repository.UserRepository;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;
    private final OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        
        OAuth2User oauth2User = delegate.loadUser(userRequest);
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        User.Provider provider = User.Provider.valueOf(registrationId.toUpperCase());
        Map<String, Object> attributes = oauth2User.getAttributes();

        String providerId;
        String email;
        String firstName;
        String lastName;

        if (provider == User.Provider.GOOGLE) {
            providerId = (String) attributes.get("sub");
            email = (String) attributes.get("email");
            firstName = (String) attributes.get("given_name");
            lastName = (String) attributes.get("family_name");
        } else if (provider == User.Provider.GITHUB) {
            providerId = String.valueOf(attributes.get("id"));
            email = (String) attributes.get("email");
            firstName = (String) attributes.get("name");
            lastName = "";
        } else {
            throw new OAuth2AuthenticationException("Unsupported provider");
        }

        User user = userRepository.findByProviderAndProviderId(provider, providerId).orElseGet(() -> 
            registerNewUser(provider, providerId, email, firstName, lastName)
        );

        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getRole())), attributes, "email");
    }

    private User registerNewUser(User.Provider provider, String providerId, String email, String firstName, String lastName) {
        User user = User.builder()
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .provider(provider)
                .providerId(providerId)
                .role(User.UserRole.GUEST)
                .enabled(true)
                .build();

        return userRepository.save(user);
    }

}

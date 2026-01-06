package com.skillstorm.hrs.service;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.skillstorm.hrs.model.User;
import com.skillstorm.hrs.repository.UserRepository;
import com.skillstorm.hrs.security.CustomUserPrincipal;
import com.skillstorm.hrs.security.OAuthUserInfo;
import com.skillstorm.hrs.security.OAuthUserInfoFactory;

@Service
public class CustomOAuth2UserService
        implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest)
            throws OAuth2AuthenticationException {

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();

        OAuth2User oauth2User = delegate.loadUser(userRequest);

        User.Provider provider = User.Provider.valueOf(
                userRequest.getClientRegistration()
                        .getRegistrationId()
                        .toUpperCase());

        OAuthUserInfo userInfo = OAuthUserInfoFactory.getUserInfo(provider, oauth2User.getAttributes());

        if (userInfo.getProviderId() == null) {
            throw new OAuth2AuthenticationException("Missing provider ID");
        }

        User user = upsertUser(provider, userInfo);

        return new CustomUserPrincipal(user, oauth2User.getAttributes());
    }

    private User upsertUser(User.Provider provider, OAuthUserInfo info) {

        return userRepository
                .findByProviderAndProviderId(provider, info.getProviderId())
                .map(existing -> {
                    existing.setEmail(info.getEmail());
                    existing.setFirstName(info.getFirstName());
                    existing.setLastName(info.getLastName());
                    existing.setEnabled(true);
                    return userRepository.save(existing);
                })
                .orElseGet(() -> {
                    User user = new User();
                    user.setProvider(provider);
                    user.setProviderId(info.getProviderId());
                    user.setEmail(info.getEmail());
                    user.setFirstName(info.getFirstName());
                    user.setLastName(info.getLastName());
                    user.setRole(User.UserRole.GUEST);
                    user.setEnabled(true);
                    return userRepository.save(user);
                });
    }
}

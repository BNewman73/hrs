package com.skillstorm.hrs.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

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
}
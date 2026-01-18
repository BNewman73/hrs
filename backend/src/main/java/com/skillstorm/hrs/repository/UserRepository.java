package com.skillstorm.hrs.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.hrs.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByProviderAndProviderId(User.Provider provider, String providerId);

    Optional<User> findByProviderId(String providerId);

    List<User> findByProviderIdIn(Set<String> providerIds);

    Optional<User> findByPublicId(String publidId);

}

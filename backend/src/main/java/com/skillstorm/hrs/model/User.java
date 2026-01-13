package com.skillstorm.hrs.model;

import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "users")
@CompoundIndex(name = "provider_providerId_unique", def = "{'provider': 1, 'providerId': 1}", unique = true)
public class User extends BaseEntity {

  private Provider provider;
  private String providerId;

  @Field("first_name")
  private String firstName;
  @Field("last_name")
  private String lastName;

  private String email;
  private String avatarUrl;

  private UserRole role;
  private boolean enabled;

  public enum UserRole {
    GUEST,
    ADMIN,
    MANAGER
  }

  public enum Provider {
    GOOGLE,
    GITHUB
  }
}
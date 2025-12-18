package com.skillstorm.hrs.model;

import org.springframework.data.mongodb.core.index.Indexed;
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
public class User extends BaseEntity {
  @Indexed(unique = true)
  private String email;

  // match name in db
  @Field("first_name")
  private String firstName;

  // match name in db
  @Field("last_name")
  private String lastName;

  private String password;

  private UserRole role;

  private boolean enabled;

  public enum UserRole {
    GUEST,
    ADMIN,
    MANAGERJk
  }
}

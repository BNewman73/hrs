package com.skillstorm.hrs.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.skillstorm.hrs.repository")
@EnableMongoAuditing
public class MongoConfig {
}

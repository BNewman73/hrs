package com.skillstorm.hrs.config;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
//this file
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http 
            .cors(cors -> {})    // Must enable Cors          
            .csrf(csrf -> csrf.disable()) // Must disable CSRF for POST requests to work
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // This "unlocks" all your API doors
            );
        return http.build();
    }
}



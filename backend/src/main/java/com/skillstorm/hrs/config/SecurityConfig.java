package com.skillstorm.hrs.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.skillstorm.hrs.security.CustomAuthenticationSuccessHandler;
// import com.skillstorm.hrs.service.CustomOAuth2UserService;
// import com.skillstorm.hrs.service.CustomOidcUserService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

        @Value("${app.frontend.url}")
        private String frontendUrl;

        private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;
        // private final CustomOAuth2UserService customOAuth2UserService;
        // private final CustomOidcUserService customOidcUserService;

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                return http
                                .csrf(csrf -> csrf.disable())
                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/payment/transactions").permitAll()
                                                .requestMatchers("/oauth2/**", "/login/**").permitAll()
                                                .requestMatchers("/room-details/comprehensive").permitAll()

                                                .anyRequest().authenticated())
                                .oauth2Login(oauth -> oauth

                                                .successHandler(customAuthenticationSuccessHandler))
                                .logout(logout -> logout
                                                .logoutUrl("/logout")
                                                .logoutSuccessUrl(frontendUrl + "/login"))
                                .build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration config = new CorsConfiguration();

                config.setAllowCredentials(true);

                config.addAllowedOrigin("https://d24rfvgips8loh.cloudfront.net");
                config.addAllowedOrigin("http://localhost:3000");

                config.addAllowedHeader("*");
                config.addAllowedMethod("*");

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", config);
                return source;
        }
}
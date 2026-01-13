package com.skillstorm.hrs.security;

import java.io.IOException;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.skillstorm.hrs.model.User;
import com.skillstorm.hrs.repository.UserRepository;
import com.skillstorm.hrs.service.UserService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationSucessHandler implements AuthenticationSuccessHandler {

    private final UserService userService;

    public CustomAuthenticationSucessHandler(UserService userService) {
        this.userService = userService;   
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
    
        response.sendRedirect("http://localhost:3000/dashboard");

        OAuth2User user = (OAuth2User) authentication.getPrincipal();
        final Map<String, Object> attributes = user.getAttributes();

        String id = userService.parseAttributes(attributes, "sub", "id");
        String email = userService.parseAttributes(attributes, "email");
        String name = userService.parseAttributes(attributes,"given_name", "name");
        String last_name = userService.parseAttributes(attributes, "family_name");
        String avatar = userService.parseAttributes(attributes, "picture", "avatar_url");
        String issuer = userService.parseAttributes(attributes, "iss", "url");
        User.Provider provider = userService.determineProvider(issuer);

        userService.findOrCreateUser(provider, id, email, name, last_name, avatar);
    } 
}

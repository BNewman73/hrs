package com.skillstorm.hrs.security;

import java.util.Map;

import com.skillstorm.hrs.model.User;

public final class OAuthUserInfoFactory {

    private OAuthUserInfoFactory() {}

    public static OAuthUserInfo getUserInfo(
        User.Provider provider,
        Map<String, Object> attributes
    ) {
        return switch (provider) {
            case GOOGLE -> new GoogleOAuthUserInfo(attributes);
            case GITHUB -> new GithubOAuthUserInfo(attributes);
        };
    }
}
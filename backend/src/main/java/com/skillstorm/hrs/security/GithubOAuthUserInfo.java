package com.skillstorm.hrs.security;

import java.util.Map;

public class GithubOAuthUserInfo extends OAuthUserInfo {

    public GithubOAuthUserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getProviderId() {
        return String.valueOf(attributes.get("id"));
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email"); // may be null
    }

    @Override
    public String getFirstName() {
        String name = (String) attributes.get("name");
        if (name == null) {
            return (String) attributes.get("login");
        }
        return name.split(" ")[0];
    }

    @Override
    public String getLastName() {
        String name = (String) attributes.get("name");
        if (name != null && name.contains(" ")) {
            return name.substring(name.indexOf(" ") + 1);
        }
        return "";
    }
}

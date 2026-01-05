package com.skillstorm.hrs.security;

import java.util.Map;

public abstract class OAuthUserInfo {

    protected final Map<String, Object> attributes;

    protected OAuthUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public abstract String getProviderId();
    public abstract String getEmail();
    public abstract String getFirstName();
    public abstract String getLastName();
}

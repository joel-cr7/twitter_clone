package com.backend.twitterclone.security.service;

import com.backend.twitterclone.entity.User;

public interface JWTService {

    // Produce new JWT
    String generateAccessToken(User user);

    // Produce new refresh JWT
    String generateRefreshToken(User user);

    // Get user email from JWT
    Long getUserIdFromToken(String jwtToken);

}

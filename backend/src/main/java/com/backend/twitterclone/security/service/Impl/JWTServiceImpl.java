package com.backend.twitterclone.security.service.Impl;

import com.backend.twitterclone.entity.User;
import com.backend.twitterclone.security.config.JwtConstants;
import com.backend.twitterclone.security.service.JWTService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
@Slf4j
public class JWTServiceImpl implements JWTService {

    @Value("${jwt.secret}")
    private String JWT_SECRET;

    public SecretKey getJwtSecret(){
        return Keys.hmacShaKeyFor(JWT_SECRET.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    public String generateAccessToken(User user) {
        return Jwts.builder()
                .subject(user.getUserId().toString())
                .claim("email", user.getEmail())
                .claim("roles", user.getRoles().toString())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30))      // 30 mins
                .signWith(getJwtSecret())
                .compact();
    }

    @Override
    public String generateRefreshToken(User user) {
        return Jwts.builder()
                .subject(user.getUserId().toString())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 30))
                .signWith(getJwtSecret())
                .compact();
    }

    @Override
    public Long getUserIdFromToken(String jwtToken){
        Claims claims = Jwts.parser()
                .verifyWith(getJwtSecret())
                .build()
                .parseSignedClaims(jwtToken)
                .getPayload();

        return Long.valueOf(claims.getSubject());
    }

}

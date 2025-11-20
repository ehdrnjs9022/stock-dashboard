package com.dk.project.token.util;

import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;


@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretkey;
    private SecretKey key;

    @PostConstruct
    public void init() {
        byte[] decodedKey = Base64.getDecoder().decode(secretkey);
        key = Keys.hmacShaKeyFor(decodedKey);
    }

    public String getAccessToken(Long userNo) {
        return Jwts.builder()
                .subject(String.valueOf(userNo))
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60))
                .claim("role", "ROLE_USER")
                .signWith(key)
                .compact();
    }
    
    public String getRefreshToken(Long userNo) {
    	return Jwts.builder()
    			.subject(String.valueOf(userNo))
    			.issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 14))
                .claim("role", "ROLE_USER")
                .signWith(key)
                .compact();
    	
    	
    }
    
    public Claims parseJwt(String token) {
		
		return Jwts.parser()
				   .verifyWith(key)
				   .build()
				   .parseSignedClaims(token)
				   .getPayload();
	}
    
    
}

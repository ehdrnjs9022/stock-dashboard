package com.dk.project.security.filter;

import java.io.IOException;
import java.net.http.HttpHeaders;

import org.springframework.stereotype.Component;

import com.dk.project.token.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtFilter extends OncePerRequestFilter {

		private final JwtUtil jwtUtil;
	
	protected  void doFilterInternal(
			HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
				
		
		String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
		
		if(authorization == null || !authorization.startsWith("Bearer")) {
			return;
		}
		
		String token = authorization.substring(7);
		
		
		
		
		
		
		
		
		
	}
			
	
}
	
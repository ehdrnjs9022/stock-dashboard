package com.dk.project.security.filter;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.dk.project.auth.model.vo.DkUserDetails;
import com.dk.project.token.util.JwtUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtFilter extends OncePerRequestFilter {

		private final JwtUtil jwtUtil;
		private final UserDetailsService userDetailsService;
	
	protected  void doFilterInternal(
			HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
				
		
		String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
		
		if(authorization == null || !authorization.startsWith("Bearer")) {
			filterChain.doFilter(request, response);
			return;
		
		}
		
		String token = authorization.substring(7);
		
		
		Claims claims =jwtUtil.parseJwt(token);
		
		String userNo = claims.getSubject();
		
		try {
			DkUserDetails user = (DkUserDetails)userDetailsService.loadUserByUsername(userNo);
			
			UsernamePasswordAuthenticationToken authentication =
			        new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
			
			SecurityContextHolder.getContext().setAuthentication(authentication);
			
		} catch (JwtException  e) {
			System.out.println("유효하지않은 토큰");
			e.printStackTrace();
			
		}
		filterChain.doFilter(request, response);
		
	}
			
	
}
	
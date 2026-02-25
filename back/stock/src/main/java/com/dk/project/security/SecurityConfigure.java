package com.dk.project.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.dk.project.security.filter.JwtFilter;

import lombok.RequiredArgsConstructor;

@EnableMethodSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfigure {
	
	private final JwtFilter jwtFilter;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	   
		return http
	        .csrf(AbstractHttpConfigurer::disable)
	        .formLogin(AbstractHttpConfigurer::disable)
	        .httpBasic(AbstractHttpConfigurer::disable)
	        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
	        .authorizeHttpRequests(request -> {
				   request.requestMatchers("/admin/**").hasRole("ADMIN");
				  
				   request.requestMatchers(HttpMethod.POST,
							 "/api/delete",
						   "/api/board/write",
						   "/api/board/like/**",
						   "/api/board/insertComment/**",
						   "/api/board/updateComment/**"
							 ).authenticated();
				   request.requestMatchers(HttpMethod.POST,
						   "/api/find-id",
						   "/api/find-pw",
						   "/api/verifyCode",	
						   "/api/email-send",
						   "/api/logout",
						   "/api/login",
						   "/api/signup",
						   "/api/reissue",
						   "/api/domestic",
						   "/api/domesticDetails"
						   ).permitAll();
				  
				   request.requestMatchers(HttpMethod.PUT, 
							  "/api/password",
							  "/api/board/update/**"
						   ).authenticated();
				   
				  
				   
				   request.requestMatchers(HttpMethod.GET,
						   "/api/**"
							 ).permitAll();
				   
				   request.requestMatchers(HttpMethod.GET,
						   "/api/info"
						   ).authenticated();
				  
				   request.requestMatchers(HttpMethod.DELETE, 
						   "/api/board/delete/**",
						   "/api/board/deleteComment/**"
						   ).authenticated();
				   
            })
            
           .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			   .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
			   .build();
	}
	
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		
		return authConfig.getAuthenticationManager();
	}
	@Bean
	PasswordEncoder passwordEncoder() {
		
		return new BCryptPasswordEncoder();
	}
	
	
	 @Bean
	    public CorsConfigurationSource corsConfigurationSource() {
	        CorsConfiguration configuration = new CorsConfiguration();
	       
	        configuration.addAllowedOrigin("http://localhost:5173"); 
	        configuration.addAllowedMethod("*"); 
	        configuration.addAllowedHeader("*");
	        configuration.setAllowCredentials(true);

	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", configuration);
	        return source;
	    }
	
	
	
}

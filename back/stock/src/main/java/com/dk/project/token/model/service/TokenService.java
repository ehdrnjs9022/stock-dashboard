package com.dk.project.token.model.service;



public interface TokenService {

		
	String getAccessToken(Long userNo);
	String getRefreshToken(Long userNo);
	
	
	
	
	
}

package com.dk.project.token.model.service;

import com.dk.project.token.model.dto.RefreshTokenDTO;
import com.dk.project.token.model.dto.ReissueResponseDTO;

public interface TokenService {

		
	String getAccessToken(String userId);
	String getRefreshToken(Long userNo, String userId);
	
	void logout(RefreshTokenDTO refreshTokenDTO);
	void saveRefreshToken(Long userNo, String refreshToken);
	
	ReissueResponseDTO reissueToken(RefreshTokenDTO refreshTokenDTO);
}

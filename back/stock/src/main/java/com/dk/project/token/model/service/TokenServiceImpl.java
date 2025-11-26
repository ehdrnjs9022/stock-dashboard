package com.dk.project.token.model.service;

import org.springframework.stereotype.Service;

import com.dk.project.token.model.dao.TokenMapper;
import com.dk.project.token.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {
	
	private final JwtUtil jwtUtil;
	private final TokenMapper tokenMapper;

	@Override
	public String getAccessToken(Long userNo) {
		
		String accessToken = jwtUtil.getAccessToken(userNo);
		
		
		return accessToken;
	}

	@Override
	public String getRefreshToken(Long userNo) {
		
		String refreshToken = jwtUtil.getRefreshToken(userNo);
		
		return refreshToken;
	}

	@Override
	public void saveRefreshToken(Long userNo, String refreshToken) {
		
		
		tokenMapper.saveRefreshToken(userNo,refreshToken);
		
	}

	
	
	
}

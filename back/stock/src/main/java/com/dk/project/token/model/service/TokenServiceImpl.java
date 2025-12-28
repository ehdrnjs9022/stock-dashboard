package com.dk.project.token.model.service;

import java.sql.Date;

import org.springframework.stereotype.Service;

import com.dk.project.exception.exceptions.InvalidTokenException;
import com.dk.project.token.model.dao.TokenMapper;
import com.dk.project.token.model.dto.RefreshTokenDTO;
import com.dk.project.token.model.dto.ReissueResponseDTO;
import com.dk.project.token.util.JwtUtil;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {
	
	private final JwtUtil jwtUtil;
	private final TokenMapper tokenMapper;

	@Override
	public String getAccessToken(String userId) {
		
		String accessToken = jwtUtil.getAccessToken(userId);
		
		
		return accessToken;
	}

	@Override
	public String getRefreshToken(Long userNo, String userId) {
		
		String refreshToken = jwtUtil.getRefreshToken(userNo, userId);
		
		return refreshToken;
	}

	@Override
	public void saveRefreshToken(Long userNo, String refreshToken) {
		
		
		tokenMapper.saveRefreshToken(userNo,refreshToken);
		
	}

	@Override
	public void logout(RefreshTokenDTO refreshTokenDTO) {
		
		tokenMapper.deleteRefreshToken(refreshTokenDTO);
		
		
	}

	@Override
	public ReissueResponseDTO reissueToken(RefreshTokenDTO refreshTokenDTO) {
		
		String refreshToken = refreshTokenDTO.getRefreshToken();
		
		
		 RefreshTokenDTO existing  = tokenMapper.refreshTokenCheck(refreshToken);
		 if(existing == null) {
			 throw new InvalidTokenException("Refresh Token이 존재하지 않습니다.");
			 
		 }
		 System.out.println("existing = " + existing);
		 System.out.println("existing.getUserNo() = " + existing.getUserNo());

		 Claims claims = jwtUtil.parseJwt(refreshToken);
		 String userId = claims.getSubject();
		 Long userNo = existing.getUserNo();
		 
		 tokenMapper.deleteReissueRefreshToken(userNo);
		 
		 String reissueRefreshToken = jwtUtil.getRefreshToken(userNo, userId);
		 
		 RefreshTokenDTO newRefreshToken = RefreshTokenDTO.builder()
				 			.userNo(userNo)
				 			.refreshToken(reissueRefreshToken)
				 			.expiration(new Date(System.currentTimeMillis() + 3600000L * 24 * 7)
)
				 			.build();
		 
		 
		 tokenMapper.insertReissueRefreshToken(newRefreshToken);
		 
		 String accessToken = jwtUtil.getAccessToken(userId);
		 
		 ReissueResponseDTO reissueToken = new ReissueResponseDTO();
		 reissueToken.setAccessToken(accessToken);
		 reissueToken.setRefreshToken(reissueRefreshToken);
		
			return reissueToken;
	}

	
	
	
}

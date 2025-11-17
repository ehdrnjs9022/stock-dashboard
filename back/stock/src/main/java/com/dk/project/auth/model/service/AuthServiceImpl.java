package com.dk.project.auth.model.service;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import com.dk.project.auth.model.dao.LoginDTO;
import com.dk.project.auth.model.dao.LoginResponseDTO;
import com.dk.project.auth.model.vo.DkUserDetails;
import com.dk.project.exception.exceptions.LoginFailedException;
import com.dk.project.token.model.service.TokenService;

import lombok.Builder;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	
	private final AuthenticationManager authenticationManager;
	private final TokenService tokenService;

	@Override
	public LoginResponseDTO login(LoginDTO loginDTO) {
		
		
		Authentication authentication;
		
		try {
		 authentication = authenticationManager.authenticate(
			    new UsernamePasswordAuthenticationToken(loginDTO.getUserId(), loginDTO.getPassword())
			);	

		}catch (AuthenticationException e ){
				throw new LoginFailedException ("아아이디 또는 비밀번호가 틀립니다.");
			
		}
		
		DkUserDetails dkUserDetails = (DkUserDetails) authentication.getPrincipal();
		
		
		String accessToken = tokenService.getAccessToken(dkUserDetails.getUserNo());
		String refreshToekn = tokenService.getRefreshToken(dkUserDetails.getUserNo());
		
		
		return LoginResponseDTO.builder()
							   .acceccToken(accessToken)
							   .refreshToken(refreshToekn)
							   .userNo(dkUserDetails.getUserNo())
							   .userId(dkUserDetails.getUsername())
							   .realName(dkUserDetails.getRealName())
							   .nickName(dkUserDetails.getNickName())
							   .email(dkUserDetails.getEmail())
							   .build();
	}
	
	
}

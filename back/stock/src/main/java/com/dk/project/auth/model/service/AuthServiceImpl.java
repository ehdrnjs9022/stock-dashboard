package com.dk.project.auth.model.service;


import java.util.Random;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import com.dk.project.auth.model.dao.AuthMapper;
import com.dk.project.auth.model.dto.EmailDTO;
import com.dk.project.auth.model.dto.LoginDTO;
import com.dk.project.auth.model.dto.LoginResponseDTO;
import com.dk.project.auth.model.vo.DkUserDetails;
import com.dk.project.auth.util.EmailUtil;
import com.dk.project.exception.exceptions.EmailInfoNotFoundException;
import com.dk.project.exception.exceptions.LoginFailedException;
import com.dk.project.token.model.service.TokenService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	
	private final AuthenticationManager authenticationManager;
	private final TokenService tokenService;
	private final AuthMapper authMapper;
	private final EmailUtil emailUtil;

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

	@Override
	public void emailSend(EmailDTO emailDTO) {
		
		String code = String.format("%06d", new Random().nextInt(999999));
		
		
		EmailDTO emailInfo = new EmailDTO();
		emailInfo.setEmail(emailDTO.getEmail());
		emailInfo.setCode(code);
		
		
		
		authMapper.emailInfo(emailInfo);
		
		
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(emailDTO.getEmail());
		message.setSubject("이메일 인증번호 안내");
		message.setText("인증번호는 ["+ code +"] 입니다. ");
		
		
		emailUtil.sendMail(message);
		
	}

	
	@Override
	public void verifyCode(EmailDTO emailDTO) {
		
		EmailDTO emailInfoCheck = authMapper.verifyCode(emailDTO);
		
		if(emailInfoCheck == null) {
			throw new EmailInfoNotFoundException("인증번호가 일치하지 않습니다.");
		}
			
	}
	
	
	
	
}

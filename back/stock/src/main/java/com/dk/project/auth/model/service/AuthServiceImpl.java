package com.dk.project.auth.model.service;


import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.dk.project.auth.model.dao.AuthMapper;
import com.dk.project.auth.model.dto.ChangePasswordDTO;
import com.dk.project.auth.model.dto.EmailDTO;
import com.dk.project.auth.model.dto.FindDTO;
import com.dk.project.auth.model.dto.LoginDTO;
import com.dk.project.auth.model.dto.LoginResponseDTO;
import com.dk.project.auth.model.vo.DkUserDetails;
import com.dk.project.auth.util.EmailUtil;
import com.dk.project.exception.exceptions.EmailInfoNotFoundException;
import com.dk.project.exception.exceptions.FindIdCustomException;
import com.dk.project.exception.exceptions.FindPwCustomException;
import com.dk.project.exception.exceptions.InvalidPasswordException;
import com.dk.project.exception.exceptions.LoginFailedException;
import com.dk.project.token.model.dao.TokenMapper;
import com.dk.project.token.model.dto.RefreshTokenDTO;
import com.dk.project.token.model.service.TokenService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	
	private final AuthenticationManager authenticationManager;
	private final TokenService tokenService;
	private final AuthMapper authMapper;
	private final EmailUtil emailUtil;
	private final BCryptPasswordEncoder passwordEncoder;
	private final TokenMapper tokenMapper;

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
		String refreshToken = tokenService.getRefreshToken(dkUserDetails.getUserNo());
		
		tokenService.saveRefreshToken(dkUserDetails.getUserNo(),refreshToken);
		
		
		return LoginResponseDTO.builder()
							   .accessToken(accessToken)
							   .refreshToken(refreshToken)
							   .userNo(dkUserDetails.getUserNo())
							   .userId(dkUserDetails.getUsername())
							   .realName(dkUserDetails.getRealName())
							   .nickName(dkUserDetails.getNickName())
							   .email(dkUserDetails.getEmail())
							   .build();
	}
	

	@Override
	public void logout(RefreshTokenDTO refreshTokenDTO) {
	
		
		tokenMapper.deleteRefreshToken(refreshTokenDTO);		
	
	
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

	@Override
	public void findId(FindDTO findDTO) {
		
		FindDTO check = authMapper.findIdCheck(findDTO);
		
		if(check == null) {
			throw new FindIdCustomException("아이디찾기 정보가 일치하지 않습니다");
		}
		
		SimpleMailMessage messageId = new SimpleMailMessage();
		
		messageId.setTo(findDTO.getEmail());
		messageId.setSubject("아이디 찾기 안내");
		messageId.setText("회원님의 아이디는 ["+ check.getUserId()+"] 입니다");
		
		emailUtil.sendMailId(messageId);
	}

	@Override
	public void findPw(FindDTO findDTO) {
		
		FindDTO check = authMapper.findPwCheck(findDTO);
		
		if(check == null) {
			throw new FindPwCustomException("비밀번호찾기 정보가 일치하지 않습니다");
		}
		
		SecureRandom random = new SecureRandom();
		String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
		
		StringBuilder sb = new StringBuilder();
		
		for(int i = 0 ; i < 8 ; i++ ) {
			int idx = random.nextInt(chars.length());
			 sb.append(chars.charAt(idx));
		}
		
		String tempPassword = sb.toString();
		
		String encodedTempPassword = passwordEncoder.encode(tempPassword);
		
		Map<String, String> tempInfo = new HashMap();
		tempInfo.put("userId", check.getUserId());
		tempInfo.put("encodedTempPassword", encodedTempPassword);
		
		authMapper.tempPasswordInsert(tempInfo);
		
		
		SimpleMailMessage messagePw = new SimpleMailMessage();
		messagePw.setTo(findDTO.getEmail());
		messagePw.setSubject("임시 비밀번호 안내");
		messagePw.setText("임시 비밀번호는 ["+ tempPassword +"] 입니다");
		
		emailUtil.sendMailPw(messagePw);
		
	}

	@Override
	public void changePassword(ChangePasswordDTO changePasswordDTO, DkUserDetails user) {
		
		
		if(!passwordEncoder.matches(changePasswordDTO.getPassword(),user.getPassword())) {
			throw new InvalidPasswordException("현재 비밀번호가 일치하지 않습니다.");
		}
		
		String newPassword = passwordEncoder.encode(changePasswordDTO.getNewPassword());
		
		
		Map<String, Object> newPasswordInfo =  new HashMap();
		newPasswordInfo.put("newPassword", newPassword);
		newPasswordInfo.put("userNo", user.getUserNo());
		
		authMapper.changePassword(newPasswordInfo);
			
		
	}

	@Override
	public void deleteUser(ChangePasswordDTO changePasswordDTO, DkUserDetails user) {
		
		
		if(!passwordEncoder.matches(changePasswordDTO.getPassword(),user.getPassword())) {
			throw new InvalidPasswordException("현재 비밀번호가 일치하지 않습니다.");
		}
	
		authMapper.deleteUser(user);
	
	
	}








	
	
	
}

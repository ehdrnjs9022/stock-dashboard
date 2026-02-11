package com.dk.project.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dk.project.auth.model.dto.ChangePasswordDTO;
import com.dk.project.auth.model.dto.EmailDTO;
import com.dk.project.auth.model.dto.FindDTO;
import com.dk.project.auth.model.dto.LoginDTO;
import com.dk.project.auth.model.dto.LoginResponseDTO;
import com.dk.project.auth.model.service.AuthService;
import com.dk.project.auth.model.vo.DkUserDetails;
import com.dk.project.token.model.dto.RefreshTokenDTO;
import com.dk.project.token.model.dto.ReissueResponseDTO;
import com.dk.project.token.model.service.TokenService;
import com.dk.project.util.model.dto.ResponseData;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class AuthController {

		private final AuthService authService;
		private final TokenService tokenService;
	
	@PostMapping("/login")
	public ResponseEntity<ResponseData> login(@RequestBody LoginDTO loginDTO) {
		
		LoginResponseDTO result = authService.login(loginDTO);
		
		ResponseData responseData = ResponseData.builder()
											.code("A100")	
											.message("로그인에 성공하셨습니다")
											.items(result)
											.build();
	
		
		return ResponseEntity.ok(responseData);
	} 
	@PostMapping("/logout")
	public ResponseEntity<ResponseData> logout(@RequestBody RefreshTokenDTO refreshTokenDTO) {
		
		 tokenService.logout(refreshTokenDTO);
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")	
				.message("로그아웃에 성공하셨습니다")
				.build();
		
		
		return ResponseEntity.ok(responseData);
	} 
	
	
	@PostMapping("/email-send")
	public ResponseEntity<ResponseData> emailSend(@RequestBody EmailDTO emailDTO){
		
		 authService.emailSend(emailDTO);
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")	
				.message("인증번호를 전송하였습니다.")
				.build();
		
		return ResponseEntity.ok(responseData);
	}
	
	@PostMapping("/verifyCode")
	public ResponseEntity<ResponseData> verifyCode(@RequestBody EmailDTO emailDTO){
		
		authService.verifyCode(emailDTO);
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")	
				.message("인증에 성공하셨습니다.")
				.build();
		
		return ResponseEntity.ok(responseData);
	}
	
	@PostMapping("/find-id")
	public ResponseEntity<ResponseData> findId(@RequestBody FindDTO findDTO) {
		
		authService.findId(findDTO);
		ResponseData responseData = ResponseData.builder()
				.code("A100")	
				.message("이메일로 아이디를 전송하였습니다.")
				.build();
		
		return ResponseEntity.ok(responseData);
	}
	
	@PostMapping("/find-pw")
	public ResponseEntity<ResponseData> findPw(@RequestBody FindDTO findDTO) {
		
		authService.findPw(findDTO);
		ResponseData responseData = ResponseData.builder()
				.code("A100")	
				.message("이메일로 임시비밀번호를 전송하였습니다.")
				.build();
		
		return ResponseEntity.ok(responseData);
	}
	
	@PutMapping("/password")
	public ResponseEntity<ResponseData> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO,
													   @AuthenticationPrincipal DkUserDetails user) {
		
		authService.changePassword(changePasswordDTO, user);
		
		
		ResponseData responseData = ResponseData.builder()
												.code("A100")
												.message("비밀번호가 변경되었습니다")
												.build();
		
		
		return ResponseEntity.ok(responseData);
	}
	@PostMapping("/delete")
	public ResponseEntity<ResponseData> deleteUser(@RequestBody ChangePasswordDTO changePasswordDTO,
			@AuthenticationPrincipal DkUserDetails user) {
		
		authService.deleteUser(changePasswordDTO, user);
		
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")
				.message("회원 탈퇴되셨습니다.")
				.build();
		
		
		return ResponseEntity.ok(responseData);
	}
	
	
	@PostMapping("/reissue")
	public ResponseEntity<ResponseData> reissueToken(@RequestBody RefreshTokenDTO refreshTokenDTO){
		
		ReissueResponseDTO  result = tokenService.reissueToken(refreshTokenDTO);
		
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")
				.message("토큰 재발급")
				.items(result)
				.build();
		
		
		return ResponseEntity.ok(responseData);
		
	}
	
	
	
	
}

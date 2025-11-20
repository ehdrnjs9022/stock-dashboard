package com.dk.project.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dk.project.auth.model.dto.EmailDTO;
import com.dk.project.auth.model.dto.LoginDTO;
import com.dk.project.auth.model.dto.LoginResponseDTO;
import com.dk.project.auth.model.service.AuthService;
import com.dk.project.util.model.dto.ResponseData;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class AuthController {

		private final AuthService authService;
	
	@PostMapping("/login")
	public ResponseEntity<ResponseData> login(@RequestBody LoginDTO loginDTO) {
		
		LoginResponseDTO result = authService.login(loginDTO);
		
		ResponseData responeData = ResponseData.builder()
											.code("A100")	
											.message("로그인성공")
											.items(result)
											.build();
		
		
		return ResponseEntity.ok(responeData);
	} 
	
	
	@PostMapping("/email-send")
	public ResponseEntity<ResponseData> emailSend(@RequestBody EmailDTO emailDTO){
		
		 authService.emailSend(emailDTO);
		
		ResponseData responeData = ResponseData.builder()
				.code("A100")	
				.message("인증번호를 전송하였습니다.")
				.build();
		
		return ResponseEntity.ok(responeData);
	}
	
	@PostMapping("/verifyCode")
	public ResponseEntity<ResponseData> verifyCode(@RequestBody EmailDTO emailDTO){
		
		authService.verifyCode(emailDTO);
		
		ResponseData responeData = ResponseData.builder()
				.code("A100")	
				.message("인증에 성공하셨습니다.")
				.build();
		
		return ResponseEntity.ok(responeData);
	}
	
		
	
}

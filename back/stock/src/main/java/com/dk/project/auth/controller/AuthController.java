package com.dk.project.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dk.project.auth.model.dao.LoginDTO;
import com.dk.project.auth.model.service.AuthService;
import com.dk.project.util.model.dto.ResponseData;

import lombok.RequiredArgsConstructor;

@RequestMapping
@RequiredArgsConstructor
@RestController
public class AuthController {

		private final AuthService authService;
	
	public ResponseEntity<ResponseData> login(@RequestBody LoginDTO loginDTO) {
		
		
		authService.login(loginDTO);
		
		
		
		
		return ResponseEntity.ok(null);
	} 
	
}

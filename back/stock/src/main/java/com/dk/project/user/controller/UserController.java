package com.dk.project.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dk.project.user.model.dto.UserDTO;
import com.dk.project.user.model.service.UserService;
import com.dk.project.util.model.dto.ResponseData;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

		private final UserService userService;
	
	
	@PutMapping("/signup")	
	public ResponseEntity<ResponseData> signUp(@RequestBody UserDTO userDTO){
		
		
		userService.signUp(userDTO);
		
		
		
		return ResponseEntity.ok(null);
		
	}
}

package com.dk.project.user.model.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.dk.project.user.model.dao.UserMapper;
import com.dk.project.user.model.dto.UserDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserMapper userMapper;
	private final BCryptPasswordEncoder passwordEncoder;
	
	
	@Override
	public void signUp(UserDTO userDTO) {
		
		String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
		
		userDTO.setPassword(encodedPassword);
		
		userMapper.signUp(userDTO);
		
		
		
	}

	
	
}

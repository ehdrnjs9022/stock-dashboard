package com.dk.project.user.model.service;

import org.springframework.stereotype.Service;

import com.dk.project.user.model.dao.UserMapper;
import com.dk.project.user.model.dto.UserDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserMapper userMapper;

	@Override
	public void signUp(UserDTO userDTO) {
		
		userMapper.signUp(userDTO);
		
		
		
	}

	
	
}

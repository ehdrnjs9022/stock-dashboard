package com.dk.project.user.model.service;

import com.dk.project.user.model.dto.UserDTO;
import com.dk.project.user.model.dto.UserResponseDTO;

public interface UserService {

	
	void signUp(UserDTO userDTO);
	
	UserResponseDTO selectInfo(UserResponseDTO userResponseDTO);
	
}

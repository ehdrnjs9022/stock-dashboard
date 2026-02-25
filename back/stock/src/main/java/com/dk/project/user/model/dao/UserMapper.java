package com.dk.project.user.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.dk.project.user.model.dto.UserDTO;
import com.dk.project.user.model.dto.UserResponseDTO;

@Mapper
public interface UserMapper {

	void signUp(UserDTO userDTO);
	
	UserResponseDTO selectInfo(UserResponseDTO userResponseDTO);
}

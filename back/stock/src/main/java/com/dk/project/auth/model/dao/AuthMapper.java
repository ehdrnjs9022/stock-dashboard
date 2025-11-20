package com.dk.project.auth.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.dk.project.auth.model.dto.EmailDTO;
import com.dk.project.user.model.dto.UserDTO;

@Mapper
public interface AuthMapper {

	
	
	EmailDTO verifyCode(EmailDTO emailDTO);
	void emailInfo(EmailDTO eamilDTO);
	
	UserDTO loadUserByUserId(String userNo);
	
}

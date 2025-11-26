package com.dk.project.auth.model.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.dk.project.auth.model.dto.EmailDTO;
import com.dk.project.auth.model.dto.FindDTO;
import com.dk.project.auth.model.dto.RefreshTokenDTO;
import com.dk.project.auth.model.vo.DkUserDetails;
import com.dk.project.user.model.dto.UserDTO;

@Mapper
public interface AuthMapper {

	
	
	EmailDTO verifyCode(EmailDTO emailDTO);
	void emailInfo(EmailDTO eamilDTO);
	
	UserDTO loadUserByUserId(String userNo);
	
	FindDTO findIdCheck(FindDTO findDTO);
	FindDTO findPwCheck(FindDTO findDTO);
	
	
	void tempPasswordInsert(Map<String,String> tempInfo);
	
	void changePassword(Map<String,Object> newPaosswordInfo);
	
	void deleteUser(DkUserDetails user);
	
	
}

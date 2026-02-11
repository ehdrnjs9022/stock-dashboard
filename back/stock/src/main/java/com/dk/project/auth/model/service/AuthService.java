package com.dk.project.auth.model.service;

import com.dk.project.auth.model.dto.ChangePasswordDTO;
import com.dk.project.auth.model.dto.EmailDTO;
import com.dk.project.auth.model.dto.FindDTO;
import com.dk.project.auth.model.dto.LoginDTO;
import com.dk.project.auth.model.dto.LoginResponseDTO;
import com.dk.project.auth.model.vo.DkUserDetails;

public interface AuthService {

	
	LoginResponseDTO login(LoginDTO loginDTO);
	

	void emailSend(EmailDTO emailDTO);
	
	void verifyCode(EmailDTO emailDTO);

	void findId(FindDTO findDTO);
	void findPw(FindDTO findDTO);


	void changePassword(ChangePasswordDTO changePasswordDTO, DkUserDetails user);
	void deleteUser(ChangePasswordDTO changePasswordDTO, DkUserDetails user);

	
}

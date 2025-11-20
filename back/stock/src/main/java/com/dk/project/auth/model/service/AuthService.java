package com.dk.project.auth.model.service;

import com.dk.project.auth.model.dto.EmailDTO;
import com.dk.project.auth.model.dto.LoginDTO;
import com.dk.project.auth.model.dto.LoginResponseDTO;

public interface AuthService {

	
	LoginResponseDTO login(LoginDTO loginDTO);

	void emailSend(EmailDTO emailDTO);
	
	void verifyCode(EmailDTO emailDTO);





}

package com.dk.project.auth.model.service;

import com.dk.project.auth.model.dao.LoginDTO;
import com.dk.project.auth.model.dao.LoginResponseDTO;

public interface AuthService {

	
	public LoginResponseDTO login(LoginDTO loginDTO);
}

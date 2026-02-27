package com.dk.project.mypage.model.service;

import com.dk.project.mypage.model.dto.ProfileDTO;
import com.dk.project.mypage.model.dto.ProfileResponseDTO;

public interface MypageService  {

	
	
	ProfileResponseDTO uploadProfileImage(ProfileDTO profileDTO);
	
	ProfileResponseDTO getProfileImage(ProfileDTO profileDTO);
	
	
}

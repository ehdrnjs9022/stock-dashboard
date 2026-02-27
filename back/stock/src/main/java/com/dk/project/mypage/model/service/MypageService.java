package com.dk.project.mypage.model.service;

import java.util.List;

import com.dk.project.mypage.model.dto.BoardCommentDTO;
import com.dk.project.mypage.model.dto.ProfileDTO;
import com.dk.project.mypage.model.dto.ProfileResponseDTO;

public interface MypageService  {

	
	
	ProfileResponseDTO uploadProfileImage(ProfileDTO profileDTO);
	
	ProfileResponseDTO getProfileImage(ProfileDTO profileDTO);
	
	BoardCommentDTO getBoardComment(Long userNo);
	
	List<BoardCommentDTO>getCommnet(Long userNo);
}

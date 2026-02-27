package com.dk.project.mypage.model.service;

import java.io.File;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dk.project.mypage.model.dao.MypageMapper;
import com.dk.project.mypage.model.dto.BoardCommentDTO;
import com.dk.project.mypage.model.dto.ProfileDTO;
import com.dk.project.mypage.model.dto.ProfileResponseDTO;
import com.dk.project.token.model.service.TokenServiceImpl;
import com.dk.project.util.s3Util.S3Util;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MypageServiceImpl implements MypageService {

    private final TokenServiceImpl tokenServiceImpl;
	
	private final MypageMapper mypageMapper;
	private final S3Util s3Util;

    

	@Override
	public ProfileResponseDTO uploadProfileImage(ProfileDTO profileDTO) {
		
		
		MultipartFile newFile = profileDTO.getFile();
		String uploadedUrl = s3Util.upLoadFiles(newFile);
		
		ProfileResponseDTO existing = mypageMapper.getProfileImage(profileDTO);
		
		
		if(existing != null && existing.getFileUrl() != null && !existing.getFileUrl().isEmpty()) {
		    s3Util.deleteFiles(existing.getFileUrl());
			/* mypageMapper.deleteProfileImage(profileDTO.getUserNo()); */
		    
		    
		    mypageMapper.updateProfileImage(profileDTO.getUserNo(), uploadedUrl);
		} else {
			
			mypageMapper.uploadProfileImage(profileDTO.getUserNo(), uploadedUrl);
		}

		ProfileResponseDTO responseDTO = new ProfileResponseDTO();
	    responseDTO.setFileUrl(uploadedUrl);
	    
	    return responseDTO;
		
	}

	@Override
	public ProfileResponseDTO getProfileImage(ProfileDTO profileDTO) {
		
		ProfileResponseDTO result = mypageMapper.getProfileImage(profileDTO);
		
		
		
		return result;
	}

	@Override
	public BoardCommentDTO getBoardComment(Long userNo) {
		
		BoardCommentDTO result = mypageMapper.getBoardComment(userNo);
		
		return result;
	}

	@Override
	public List<BoardCommentDTO> getCommnet(Long userNo) {
		
		List<BoardCommentDTO> result = mypageMapper.getCommnet(userNo);
		
		return result;
	}

	
	

	
	
	
	
	
}

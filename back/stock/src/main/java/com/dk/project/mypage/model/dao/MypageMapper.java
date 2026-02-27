package com.dk.project.mypage.model.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.multipart.MultipartFile;

import com.dk.project.mypage.model.dto.ProfileDTO;
import com.dk.project.mypage.model.dto.ProfileResponseDTO;

@Mapper
public interface MypageMapper {

	void uploadProfileImage(@Param("userNo") Long  userNo, @Param("uploadedUrl") String uploadedUrl);
	
	ProfileResponseDTO getProfileImage(ProfileDTO profileDTO);
	
	void updateProfileImage(@Param("userNo") Long  userNo, @Param("uploadedUrl") String uploadedUrl);
	
	/* void deleteProfileImage(Long userNo); */
	
	
}

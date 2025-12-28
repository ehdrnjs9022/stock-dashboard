package com.dk.project.token.model.dao;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.dk.project.token.model.dto.RefreshTokenDTO;



@Mapper
public interface TokenMapper {

	
	 void deleteRefreshToken(RefreshTokenDTO refreshTokenDTO);
	 void saveRefreshToken(@Param("userNo")Long userNo, @Param("refreshToken")String refreshToken);
	 
	 RefreshTokenDTO refreshTokenCheck(String refreshToken);

	 
	 void deleteReissueRefreshToken(Long userNo);


	 void insertReissueRefreshToken(RefreshTokenDTO newRefreshToken);
}

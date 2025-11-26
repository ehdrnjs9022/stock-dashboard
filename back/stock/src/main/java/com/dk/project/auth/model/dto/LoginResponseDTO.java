package com.dk.project.auth.model.dto;



import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginResponseDTO {

	
	private Long userNo;
	private String userId;
	private String accessToken;
	private String refreshToken;
	private String realName;
	private String nickName;
	private String email;
	
	
	
}

package com.dk.project.user.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserResponseDTO {

	
	private Long userNo;
	private String realName;
	private String nickName;
	private String email;
}

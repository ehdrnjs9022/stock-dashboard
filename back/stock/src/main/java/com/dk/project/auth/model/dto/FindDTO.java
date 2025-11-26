package com.dk.project.auth.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class FindDTO {

	
	private String email;
	private String realName;
	private String userId;
	private String password;
	
	
}

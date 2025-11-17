package com.dk.project.user.model.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

	
	private Long userNo;
	private String realName;
	private String nickName;
	private String userId;
	private String password;
	private String email;
	private Date createDate;	
	private String  role;
	
}

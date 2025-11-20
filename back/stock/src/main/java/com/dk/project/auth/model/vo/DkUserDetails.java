package com.dk.project.auth.model.vo;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class DkUserDetails implements UserDetails {

	private Long userNo;
	private String username;
	private String password;
	private String nickName;
	private String realName;
	private String email;
	private Collection<? extends GrantedAuthority> authorities;
}

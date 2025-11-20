package com.dk.project.auth.model.service;


import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dk.project.auth.model.dao.AuthMapper;
import com.dk.project.auth.model.vo.DkUserDetails;
import com.dk.project.user.model.dto.UserDTO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements  UserDetailsService {
	
	private final AuthMapper authMapper;

	@Override
	public UserDetails loadUserByUsername(String userNo) throws UsernameNotFoundException {
		
		UserDTO userDTO = authMapper.loadUserByUserId(userNo);
		
		if(userDTO.getUserNo() == null) {
			 throw new UsernameNotFoundException("해당 유저를 찾을 수 없습니다.");
			
		}
		
		
		return DkUserDetails.builder()
							.userNo(userDTO.getUserNo())
							.username(userDTO.getUserId())
							.password(userDTO.getPassword())
							.realName(userDTO.getRealName())
							.nickName(userDTO.getNickName())
							.email(userDTO.getEmail())
							.authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_"+ userDTO.getRole())))
							.build();
							
	}

	

	

}

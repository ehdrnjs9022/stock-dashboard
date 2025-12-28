package com.dk.project.token.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReissueResponseDTO {

	
	private String accessToken;
	private String refreshToken;
}	

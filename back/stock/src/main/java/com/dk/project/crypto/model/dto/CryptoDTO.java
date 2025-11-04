package com.dk.project.crypto.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CryptoDTO {

	
	private String market;
	private String korean_name;
	private String english_name;
	private MarketEventDTO market_event;
	
	
	
	
}

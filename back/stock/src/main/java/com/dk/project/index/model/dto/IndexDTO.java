package com.dk.project.index.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class IndexDTO {

	
	private String localTradedAt;
	private String closePrice;
	private String compareToPreviousClosePrice;
	private CompareToPreviousPrice compareToPreviousPrice;
	private String fluctuationsRatio;
	private String openPrice;
	private String highPrice;
	private String lowPrice;


	@Setter
	@Getter
	@NoArgsConstructor
	@AllArgsConstructor
	@ToString
	public static class CompareToPreviousPrice{
		
		
		private String code;
		private String text;	
		private String name;
		
	}





}

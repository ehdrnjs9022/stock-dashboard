package com.dk.project.main.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class GlobalQuoteResponseDTO {

	 	@JsonProperty("Global Quote")
	    private OverseasDTO globalQuote;
	
}

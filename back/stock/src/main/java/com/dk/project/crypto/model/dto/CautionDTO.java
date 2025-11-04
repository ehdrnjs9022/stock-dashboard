package com.dk.project.crypto.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CautionDTO {

	private boolean  PRICE_FLUCTUATIONS;
	private boolean  TRADING_VOLUME_SOARING;
	private boolean  DEPOSIT_AMOUNT_SOARING;
	private boolean  GLOBAL_PRICE_DIFFERENCES;
	private boolean  CONCENTRATION_OF_SMALL_ACCOUNTS;



}



package com.dk.project.crypto.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CryptoMonthDTO {

	
	private String market;
	private String candle_date_time_utc;
	private String candle_date_time_kst;
	private double opening_price;
	private double high_price;
	private double low_price;
	private double trade_price;
	private Long timestamp;
	private double candle_acc_trade_price;
	private double candle_acc_trade_volume;
	private double prev_closing_price;
	private double change_price;
	private double change_rate;
	
	
	
}

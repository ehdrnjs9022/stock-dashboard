package com.dk.project.crypto.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CoinDTO {

	 	private String market;
		private String korean_name;
		
		private Double trade_price;  
		private Double change_rate;
		private Double change_price; 
		private Double acc_trade_price_24h;    // 24시간 누적 거래대금
		private Double acc_trade_volume;       // 누적 거래량
		private Double acc_trade_volume_24h;   // 24시간 누적 거래량
		
}
	
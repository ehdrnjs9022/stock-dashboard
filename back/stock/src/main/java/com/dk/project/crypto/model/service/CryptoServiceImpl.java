package com.dk.project.crypto.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.dk.project.crypto.model.dto.CoinDTO;
import com.dk.project.crypto.model.dto.CryptoDTO;
import com.dk.project.crypto.model.dto.CryptoMonthDTO;
import com.dk.project.crypto.model.dto.TickerDTO;

@Service
public class CryptoServiceImpl implements CryptoService{

	private final RestTemplate restTemplate = new RestTemplate();

	@Override
	public List<CoinDTO> getCryptoList() {
		
		// 1. /market/all 데이터 불러오기
		String apiUrl = "https://api.upbit.com/v1/market/all";
		
		ResponseEntity<List<CryptoDTO>> marketResponse  =
			    restTemplate.exchange(
			        apiUrl,
			        HttpMethod.GET,
			        null,
			        new ParameterizedTypeReference<List<CryptoDTO>>() {}
			    );
		
		
		List<String> marketList = new ArrayList();

		// 2. market 리스트 추출
		for(CryptoDTO dto : marketResponse.getBody()) {
			marketList.add(dto.getMarket());
		}
		// 3. /ticker 데이터 불러오기
		String url = "https://api.upbit.com/v1/ticker?markets="+ String.join(",", marketList);;
		
		
		ResponseEntity<List<TickerDTO>> tickerResponse =
			    restTemplate.exchange(
			        url,
			        HttpMethod.GET,
			        null,
			        new ParameterizedTypeReference<List<TickerDTO>>() {}
			    );
		
		
		List<TickerDTO> tickerList = tickerResponse.getBody();
		
		// 4. 두 데이터를 병합해서 CoinDTO 생성
		List<CoinDTO> coinList = new ArrayList();
		
		for(CryptoDTO crypto : marketResponse.getBody()) {
			for(TickerDTO ticker : tickerList ) {
				if(ticker.getMarket().equals(crypto.getMarket())){
					CoinDTO coin = new CoinDTO();
					coin.setMarket(crypto.getMarket());
					coin.setKorean_name(crypto.getKorean_name());
					coin.setAcc_trade_price_24h(ticker.getAcc_trade_price_24h());
					coin.setAcc_trade_volume(ticker.getAcc_trade_volume());
					coin.setAcc_trade_volume_24h(ticker.getAcc_trade_volume_24h());
					coin.setChange_rate(ticker.getChange_rate());
					coin.setTrade_price(ticker.getTrade_price());
					coin.setChange_price(ticker.getChange_price());
					
					
					coinList.add(coin);
					break;
				}
			}
		}
		
		return coinList;
	}

	@Override
	public List<CryptoMonthDTO> getCryptoMonth() {
		
		String apiUrl = "https://api.upbit.com/v1/candles/days?market=KRW-BTC&count=30";
		
			ResponseEntity<List<CryptoMonthDTO>> response  =
				    restTemplate.exchange(
				        apiUrl,
				        HttpMethod.GET,
				        null,
				        new ParameterizedTypeReference<List<CryptoMonthDTO>>() {}
				    );
		
		 List<CryptoMonthDTO> monthData = response.getBody();
		
		
		return monthData;
	}
	@Override
	public List<CryptoMonthDTO> getCryptoETHMonth() {
		
		String apiUrl = "https://api.upbit.com/v1/candles/days?market=KRW-ETH&count=30";
		
		ResponseEntity<List<CryptoMonthDTO>> response  =
				restTemplate.exchange(
						apiUrl,
						HttpMethod.GET,
						null,
						new ParameterizedTypeReference<List<CryptoMonthDTO>>() {}
						);
		
		List<CryptoMonthDTO> monthData = response.getBody();
		
		
		return monthData;
	}
	
	
	
}

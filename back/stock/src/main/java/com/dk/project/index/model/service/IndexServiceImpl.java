package com.dk.project.index.model.service;

import java.util.List;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.dk.project.index.model.dto.IndexDTO;
import com.dk.project.index.model.dto.IndexMonthDTO;

@Service
public class IndexServiceImpl implements indexService{
	
	
	private final RestTemplate restTemplate = new RestTemplate();

	@Override
	public List<IndexDTO> kospi() {
		
		
		String apiUrl = "https://m.stock.naver.com/api/index/KOSPI/price";
		
		ResponseEntity<List<IndexDTO>> response =restTemplate.exchange(
				apiUrl, 
				HttpMethod.GET,
				null,
				new ParameterizedTypeReference<List<IndexDTO>>() {});
				
		
		List<IndexDTO> result = response.getBody();
		
		return result;
	}

	@Override
	public List<IndexDTO> kosdaq() {
		
		String apiUrl = "https://m.stock.naver.com/api/index/KOSDAQ/price";
		
		ResponseEntity<List<IndexDTO>> response = restTemplate.exchange(
				apiUrl,
				HttpMethod.GET,
				null, 
				new ParameterizedTypeReference<List<IndexDTO>>(){});
		
		List<IndexDTO> result = response.getBody();
		
		return result;
	}

	@Override
    @Cacheable("kospiCache") // ✅ 1. 캐싱: 이미 호출된 결과는 일정 시간 동안 재사용
	public IndexMonthDTO kospiMonth() {
	
		String apiUrl = "https://query1.finance.yahoo.com/v8/finance/chart/^KS11?range=1mo&interval=1d";
		//String apiUrl = "https://query1.finance.yahoo.com/v8/finance/chart/^KS11?period1=1761116400&period2=1761634800&interval=1m&includePrePost=true&events=div%7Csplit%7Cearn&lang=en-US&region=US&source=cosaic";
		
		HttpHeaders headers = new HttpHeaders();
		headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
		headers.set("Accept", "application/json");
		
		HttpEntity<String> entity = new HttpEntity<>(headers);
		
		ResponseEntity<IndexMonthDTO> response = restTemplate.exchange(
				apiUrl,
				HttpMethod.GET,
				entity,
				IndexMonthDTO.class
				);
		
		return response.getBody();
	}
	// ✅ 2. 스케줄러: 1시간마다 캐시 갱신
	@Scheduled(fixedRate = 60 * 60 * 1000)
	@CacheEvict(value = "kospiCache", allEntries = true)
	public void refreshKospiData() {
		kospiMonth(); // 호출 시 자동으로 캐시에 저장
		
	}
	@Override
	@Cacheable("kosdaqCache") // ✅ 1. 캐싱: 이미 호출된 결과는 일정 시간 동안 재사용
	public IndexMonthDTO kosdaqMonth() {
		
		String apiUrl = "https://query1.finance.yahoo.com/v8/finance/chart/^KQ11?range=1mo&interval=1d";
				
		HttpHeaders headers = new HttpHeaders();
		headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
		headers.set("Accept", "application/json");
		
		HttpEntity<String> entity = new HttpEntity<>(headers);
		
		ResponseEntity<IndexMonthDTO> response = restTemplate.exchange(
				apiUrl,
				HttpMethod.GET,
				entity,
				IndexMonthDTO.class
				);
		
		return response.getBody();
	}
	
    // ✅ 2. 스케줄러: 1시간마다 캐시 갱신
    @Scheduled(fixedRate = 60 * 60 * 1000)
    @CacheEvict(value = "kosdaqCache", allEntries = true)
    public void refreshKosdaqData() {
    	kosdaqMonth(); // 호출 시 자동으로 캐시에 저장
    	
    }

	@Override
	public IndexMonthDTO nasdaqMonth() {
		
		String apiUrl = "https://query1.finance.yahoo.com/v8/finance/chart/^IXIC?range=1mo&interval=1d";
		
		
		HttpHeaders headers = new HttpHeaders();
		headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
		headers.set("Accept", "application/json");
		
		HttpEntity<String> entity = new HttpEntity<>(headers);
		
		ResponseEntity<IndexMonthDTO> response = restTemplate.exchange(
				apiUrl,
				HttpMethod.GET,
				entity,
				IndexMonthDTO.class
				);
		
		return response.getBody();
		
		
	}
	
	
	@Override
	public IndexMonthDTO sp500Month() {
		
		String apiUrl = "https://query2.finance.yahoo.com/v8/finance/chart/^GSPC?range=1mo&interval=1d";
		
		
		HttpHeaders headers = new HttpHeaders();
		headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
		headers.set("Accept", "application/json");
		
		HttpEntity<String> entity = new HttpEntity<>(headers);
		
		ResponseEntity<IndexMonthDTO> response = restTemplate.exchange(
				apiUrl,
				HttpMethod.GET,
				entity,
				IndexMonthDTO.class
				);
		
		return response.getBody();
		
		
		
	}
	@Override
	public IndexMonthDTO dowjonesMonth() {
		
		String apiUrl = "https://query2.finance.yahoo.com/v8/finance/chart/^DJI?range=1mo&interval=1d";
		
		
		HttpHeaders headers = new HttpHeaders();
		headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
		headers.set("Accept", "application/json");
		
		HttpEntity<String> entity = new HttpEntity<>(headers);
		
		ResponseEntity<IndexMonthDTO> response = restTemplate.exchange(
				apiUrl,
				HttpMethod.GET,
				entity,
				IndexMonthDTO.class
				);
		
		return response.getBody();
		
		
		
	}
   
    
    
    
    
    
    
    
    
}


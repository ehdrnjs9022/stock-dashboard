package com.dk.project.main.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.dk.project.main.model.dto.GlobalQuoteResponseDTO;
import com.dk.project.main.model.dto.MainDTO;
import com.dk.project.main.model.dto.MainResponseDTO;
import com.dk.project.main.model.dto.OverseasDTO;
import com.dk.project.main.model.dto.StockDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MainServiceImpl implements MainService{
	
	
	private final RestTemplate restTemplate = new RestTemplate();
	
	   @Value("${naver.client-id}")
	    private String clientId;

	    @Value("${naver.client-secret}")
	    private String clientSecret;
	
	@Override
	public List<MainDTO> getMainNew() {
		
		
		 // 1. 헤더 세팅
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", clientId);
        headers.set("X-Naver-Client-Secret", clientSecret);

        // 2. HttpEntity 생성 (헤더 포함)
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        String apiUrl = "https://openapi.naver.com/v1/search/news.json?query=주식&display=5&sort=date";

        // 3. API 요청 보내기
        ResponseEntity<MainResponseDTO> response = restTemplate.exchange(
                apiUrl,           // 요청 URL
                HttpMethod.GET,   // GET 방식
                entity,           // 헤더 포함 엔티티
                MainResponseDTO.class      // 응답 형식
        );
        // 4. 결과 반환 (JSON 문자열 그대로)
        
        return response.getBody().getItems();
    }

	@Override
	public ResponseEntity<JsonNode> getMainSearch(String query, int display, int start) {
		
		
		HttpHeaders headers = new HttpHeaders();
		headers.set("X-Naver-Client-Id", clientId);
        headers.set("X-Naver-Client-Secret", clientSecret);
		
		
		HttpEntity<String> entity = new HttpEntity<>(headers);
		
		String apiUrl = String.format(
										"https://openapi.naver.com/v1/search/news.json?query=%s&display=%d&start=%d",
										query, display, start +1
			);
		

		ResponseEntity<JsonNode> response =	 restTemplate.exchange(
	                apiUrl,           // 요청 URL
	                HttpMethod.GET,   // GET 방식
	                entity,           // 헤더 포함 엔티티
	                JsonNode.class 	     // 이 타입으로 변환해라
		);
		
		JsonNode body = response.getBody();
		
		// total 제한 (예: 100개까지만)
		if (body != null) {
		    int total = body.get("total").asInt();
		    if (total > 100) {
		        ((ObjectNode) body).put("total", 100); // total 값 수정
		    }
		}
		 return new ResponseEntity<>(body, response.getStatusCode());
		
	}

	@Override
	public ResponseEntity<List<StockDTO>> getMainDomestic(List<StockDTO> codes) {
		
		
		List<StockDTO> result = new ArrayList<>();
		//response body DTO값이 다있음
		for(StockDTO req : codes) {
		ResponseEntity<StockDTO> response = restTemplate.exchange(
				"https://m.stock.naver.com/api/stock/{code}/integration",
				   HttpMethod.GET,   
	               null,           
	               StockDTO.class,
	               req.getItemCode() //반복돌린값을 바인딩해서찾기위함
	               
		);
		
		result.add(response.getBody());
		}
			
	
		return ResponseEntity.ok(result);
	}

	@Override
	public List<OverseasDTO> getMainOverseas(List<String> symbols) {
		
		
		List<OverseasDTO> result = new ArrayList();
		
		for (String symbol : symbols) {
		        String apiUrl = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="
		                     + symbol + "&apikey=" + "C36863QJS6MPADT7";
	        
	        ResponseEntity<GlobalQuoteResponseDTO> response = restTemplate.exchange(
	        	    apiUrl,                                // 완성된 요청 URL
	        	    HttpMethod.GET,                        // GET 방식 호출
	        	    null,                                  // GET은 body 필요 없음
	        	    GlobalQuoteResponseDTO.class           // 응답 매핑할 클래스
	        	);
	        
	        OverseasDTO dto = response.getBody().getGlobalQuote();
	        result.add(dto);
	        
		}
		
		
		return result;
		
	}
	

	
	
	@Override
	public ResponseEntity<List<StockDTO>> getMainDomesticDetails(List<StockDTO> codes) {
		List<StockDTO> result = new ArrayList<>();
		for(StockDTO req : codes) {
		ResponseEntity<StockDTO> response = restTemplate.exchange(
				"https://m.stock.naver.com/api/stock/{code}/integration",
				   HttpMethod.GET,   
	               null,           
	               StockDTO.class,
	               req.getItemCode() 
	               
		);
		
		result.add(response.getBody());
		}
		
		
		return ResponseEntity.ok(result);
	}

	
	
	
}

package com.dk.project.main.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dk.project.main.model.dto.MainDTO;
import com.dk.project.main.model.dto.OverseasDTO;
import com.dk.project.main.model.dto.StockDTO;
import com.dk.project.main.model.service.MainService;
import com.dk.project.util.model.dto.ResponseData;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class MainController {

	
	private final MainService mainService;
	
	@GetMapping("/news")
	public ResponseEntity<ResponseData> getMainNews(){
			
		List<MainDTO> result = mainService.getMainNew();
		
		ResponseData responseData = ResponseData.builder()
											   .code("A100")
											   .items(result)
											   .message("메인뉴스조회성공")
											   .build();
		
		return ResponseEntity.ok(responseData);
		
		
	}
	@PostMapping("/domestic")
	public ResponseEntity<ResponseData> getMainDomestic(@RequestBody List<StockDTO> codes){
		
		ResponseEntity<List<StockDTO>> result = mainService.getMainDomestic(codes);
		
		
		ResponseData responseData = ResponseData.builder()
												.code("A100")
												.items(result)
												.message("국내증시조회성공")
												.build();
		
		return ResponseEntity.ok(responseData) ;
		
	}
	@GetMapping("/overseas")
	public ResponseEntity<ResponseData> getMainOverseas(@RequestParam("symbol") List<String> symbol){
			
		List<OverseasDTO> result = mainService.getMainOverseas(symbol);
		
		ResponseData responseData = ResponseData.builder()
												.code("A100")
												.items(result)
												.message("해외증시조회성공")
												.build();
				
		
		return ResponseEntity.ok(responseData);
		
		
		
	}
	
	
	
	@GetMapping("/search")
	public ResponseEntity<ResponseData> getSearch(@RequestParam("query") String query,
												  @RequestParam(value="display",  defaultValue = "5" ) int display,
												  @RequestParam(value="start",defaultValue = "1" ) int start) {
		
		
		ResponseEntity<JsonNode> result = mainService.getMainSearch(query,display,start);
		
		ResponseData responseData = ResponseData.builder()
												.code("A100")
												.items(result)
												.message("검색성공")
												.build();

		return ResponseEntity.ok(responseData);
	}
	
	
	@PostMapping("/domesticDetails")
	public ResponseEntity<ResponseData> getMainDomesticDetail(@RequestBody List<StockDTO> codes){
		
		ResponseEntity<List<StockDTO>> result = mainService.getMainDomestic(codes);
		
		
		ResponseData responseData = ResponseData.builder()
												.code("A100")
												.items(result)
												.message("국내디테일조회성공")
												.build();
		
		return ResponseEntity.ok(responseData) ;
		
	
	
	
	}
	
}

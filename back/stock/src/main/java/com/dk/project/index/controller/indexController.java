package com.dk.project.index.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dk.project.index.model.dto.IndexDTO;
import com.dk.project.index.model.dto.IndexMonthDTO;
import com.dk.project.index.model.service.IndexServiceImpl;
import com.dk.project.util.model.dto.ResponseData;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class indexController {
	
	
	private final IndexServiceImpl indexSerivce;
	
	@GetMapping("/kospi")
	public ResponseEntity<ResponseData> kospi(){
		
		List<IndexDTO> result = indexSerivce.kospi();
		
		ResponseData responseData = ResponseData.builder()
												.code("A100")
												.message("코스피조회")
												.items(result)
												.build();
		
		
		return ResponseEntity.ok(responseData);
	}
	@GetMapping("/kosdaq")
	public ResponseEntity<ResponseData> kosdaq(){
		
		List<IndexDTO> result = indexSerivce.kosdaq();
		
		ResponseData responseData = ResponseData.builder()
												.code("A100")
												.message("코스피조회")
												.items(result)
												.build();
		
		return ResponseEntity.ok(responseData);
	}
	
	@GetMapping("/kospi/month")
	public ResponseEntity<ResponseData> kospiMonth(){
		
		IndexMonthDTO result = indexSerivce.kospiMonth();
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")
				.message("코스피한달조회")
				.items(result)
				.build();
		//System.out.println("응답데이터 확인 : "+ result);
		
		return ResponseEntity.ok(responseData);
	}
	@GetMapping("/kosdaq/month")
	public ResponseEntity<ResponseData> kosdaqMonth(){
		
		IndexMonthDTO result = indexSerivce.kosdaqMonth();
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")
				.message("코스닥한달조회")
				.items(result)
				.build();
		//System.out.println("응답데이터 확인 : "+ result);
		return ResponseEntity.ok(responseData);
	}
	@GetMapping("/nasdaq/month")
	public ResponseEntity<ResponseData> nasdaqMonth(){
		
		IndexMonthDTO result = indexSerivce.nasdaqMonth();
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")
				.message("나스닥한달조회")
				.items(result)
				.build();
		
		return ResponseEntity.ok(responseData);
	}
	@GetMapping("/sp500/month")
	public ResponseEntity<ResponseData> sp500Month(){
		
		IndexMonthDTO result = indexSerivce.sp500Month();
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")
				.message("sp500한달조회")
				.items(result)
				.build();
		
		return ResponseEntity.ok(responseData);
	}
	@GetMapping("/dowjones/month")
	public ResponseEntity<ResponseData> dowjonesMonth(){
		
		IndexMonthDTO result = indexSerivce.dowjonesMonth();
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")
				.message("다우존스한달조회")
				.items(result)
				.build();
		
		return ResponseEntity.ok(responseData);
	}
	
	
	
}

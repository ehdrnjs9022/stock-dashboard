package com.dk.project.crypto.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dk.project.crypto.model.dto.CoinDTO;
import com.dk.project.crypto.model.dto.CryptoMonthDTO;
import com.dk.project.crypto.model.service.CryptoService;
import com.dk.project.util.model.dto.ResponseData;


import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class CryptoController {

	private final CryptoService cryptoService;
	
	@GetMapping("/crypto")
	public ResponseEntity<ResponseData> getCryptoList(){
		
		List<CoinDTO> result = cryptoService.getCryptoList();
		
		ResponseData responeData = ResponseData.builder()
												.code("A100")
												.message("crypto목록 조회성공")
												.items(result)
												.build();
		
		return ResponseEntity.ok(responeData);
	}

	
	@GetMapping("/crypto/month")
	public ResponseEntity<ResponseData> getCryptoMonth(){
		
		
		List<CryptoMonthDTO> result = cryptoService.getCryptoMonth();
		
		
		ResponseData responseData = ResponseData.builder()
												.code("A100")
												.message("crypto한달 조회")
												.items(result)
												.build();
								
		return ResponseEntity.ok(responseData);										
		
				
	}
	@GetMapping("/cryptoETH/month")
	public ResponseEntity<ResponseData> getCryptoETHMonth(){
		
		
		List<CryptoMonthDTO> result = cryptoService.getCryptoETHMonth();
		
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")
				.message("이더리움한달 조회")
				.items(result)
				.build();
		
		return ResponseEntity.ok(responseData);										
		
		
	}
	
	
	
	
}

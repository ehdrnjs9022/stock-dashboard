package com.dk.project.main.model.service;


import java.util.List;

import org.springframework.http.ResponseEntity;

import com.dk.project.main.model.dto.MainDTO;
import com.dk.project.main.model.dto.OverseasDTO;
import com.dk.project.main.model.dto.StockDTO;
import com.fasterxml.jackson.databind.JsonNode;

public interface MainService {

	List<MainDTO> getMainNew();
	
	ResponseEntity<JsonNode> getMainSearch(String query, int display, int start);
	
	ResponseEntity<List<StockDTO>> getMainDomestic(List<StockDTO> codes);
	
	List<OverseasDTO>getMainOverseas(List<String> symbols);
	
	ResponseEntity<List<StockDTO>> getMainDomesticDetails(List<StockDTO> codes);
}

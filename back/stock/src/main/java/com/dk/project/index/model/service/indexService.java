package com.dk.project.index.model.service;

import java.util.List;

import com.dk.project.index.model.dto.IndexDTO;
import com.dk.project.index.model.dto.IndexMonthDTO;

public interface indexService {

	
	List<IndexDTO> kospi();
	List<IndexDTO> kosdaq();
	
	IndexMonthDTO kospiMonth();
	IndexMonthDTO kosdaqMonth();
	IndexMonthDTO nasdaqMonth();
	
	IndexMonthDTO sp500Month();
	IndexMonthDTO dowjonesMonth();
	
	
	
}

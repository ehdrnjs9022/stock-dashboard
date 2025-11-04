package com.dk.project.crypto.model.service;

import java.util.List;

import com.dk.project.crypto.model.dto.CoinDTO;
import com.dk.project.crypto.model.dto.CryptoMonthDTO;

public interface CryptoService {

	List<CoinDTO> getCryptoList();
	
	List<CryptoMonthDTO> getCryptoMonth();

List<CryptoMonthDTO> getCryptoETHMonth();
}

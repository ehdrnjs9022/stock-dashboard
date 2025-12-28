package com.dk.project.board.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BoardWriteDTO {
	
	    private Long userNo;
	    private String category;
	    private String title;
	    private String content;

}

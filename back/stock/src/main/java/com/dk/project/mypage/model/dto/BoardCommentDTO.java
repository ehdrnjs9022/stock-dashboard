package com.dk.project.mypage.model.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BoardCommentDTO {

	
	private Long userNo;
	private Long boardNo;
	private Long commentNo;
	private Long boardCount;
	private Long commentCount;
	private String content;
	private Date createDate;

	
	
}

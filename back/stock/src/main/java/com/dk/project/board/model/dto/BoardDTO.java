package com.dk.project.board.model.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardDTO {

	
	private Long userNo;
	private Long boardNo;
	private String title;
	private String content;
	private Date createDate;
	private Long  viewCount;
	private Long  likeCount;
	private String nickName;
	private String category;
	private boolean liked;
	
}



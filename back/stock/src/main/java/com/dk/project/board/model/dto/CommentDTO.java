package com.dk.project.board.model.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@AllArgsConstructor
@Getter
@NoArgsConstructor
public class CommentDTO {

	private Long commentNo;
	private Long userNo;
	private Long boardNo;
	private String nickName;
	private String content;
	private Long parentCommentNo;
	private Date createDate;
}

package com.dk.project.board.model.dao;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.dk.project.board.model.dto.BoardDTO;
import com.dk.project.board.model.dto.BoardWriteDTO;
import com.dk.project.board.model.dto.CommentDTO;
import com.dk.project.board.model.dto.LikeResponseDTO;

@Mapper
public interface BoardMapper {

	List<BoardDTO> selectBoard(String category);
	
	void insertWrite(BoardWriteDTO form); 
	
	BoardDTO selectDetails(Long boardNo);
	void increaseViewCount(Long boardNo);	
	
	void decreaseLikeCount(Long boardNo);
	void increaseLikeCount(Long boardNo);
	LikeResponseDTO seletLikeCount(@Param("userNo") Long userNo,@Param("boardNo") Long boardNo );
	
	void toggleLike(Long boardNo, Long userNo);
	
	void updateDetails(BoardDTO boardDTO);
	void deleteDetails(Long boardNo);
	
	void insertCommnet(CommentDTO commentDTO);
	List<CommentDTO> selectComment(@Param("userNo") Long userNo, @Param("boardNo") Long boardNo);
	
	
}

package com.dk.project.board.model.service;



import java.util.List;


import com.dk.project.board.model.dto.BoardDTO;
import com.dk.project.board.model.dto.BoardWriteDTO;
import com.dk.project.board.model.dto.CommentDTO;
import com.dk.project.board.model.dto.LikeResponseDTO;

public interface BoardService {

	List<BoardDTO> selectBoard(String category);
	
	void insertWrite(BoardWriteDTO form);
	
	BoardDTO selectDetails(Long boardNo);
	void increaseViewCount(Long boardNo);
	
	LikeResponseDTO toggleLike(Long boardNo, Long userNo);
	
	
	
	void updateDetails(BoardDTO boardDTO);
	void deleteDetails(Long boardNo, Long userNo);
	
	void insertComment(CommentDTO commentDTO);
	
	List<CommentDTO> selectComment(Long boardNo);
	
	
	void updateComment(CommentDTO commentDTO);
	
	void deleteComment(Long commentNo, Long userNo);
	
	
	
}

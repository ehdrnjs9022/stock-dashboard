package com.dk.project.board.model.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.dk.project.board.model.dao.BoardMapper;
import com.dk.project.board.model.dao.LikeMapper;
import com.dk.project.board.model.dto.BoardDTO;
import com.dk.project.board.model.dto.BoardWriteDTO;
import com.dk.project.board.model.dto.CommentDTO;
import com.dk.project.board.model.dto.LikeResponseDTO;
import com.dk.project.exception.exceptions.AccessDeniedException;
import com.dk.project.exception.exceptions.CommentAccessDeniedException;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BoardServceImpl implements BoardService {
	
	private final BoardMapper boardMapper;
	private final LikeMapper likeMapper;

	@Override
	public List<BoardDTO> selectBoard(String category) {
		
		List<BoardDTO> reuslt = boardMapper.selectBoard(category);
		
		return reuslt;
	}

	@Override
	public void insertWrite(BoardWriteDTO form) {

		boardMapper.insertWrite(form);
		
		
	}

	@Override
	public BoardDTO selectDetails(Long boardNo) {
		
		
		BoardDTO result = boardMapper.selectDetails(boardNo);
		
		return result;
	}
	
	@Override
	public void increaseViewCount(Long boardNo) {
		
		boardMapper.increaseViewCount(boardNo);
		
	}

	@Override	
	public LikeResponseDTO toggleLike(Long boardNo, Long userNo) {
		
		
		 int exists = likeMapper.likeExists(userNo, boardNo);
		
		 
		 if(exists == 0) {
			 likeMapper.likeInsert(userNo, boardNo);
			 boardMapper.increaseLikeCount(boardNo);
		 } else {
			 likeMapper.likeDelete(userNo, boardNo);
			 boardMapper.decreaseLikeCount(boardNo);
		 }
		
		LikeResponseDTO result = boardMapper.seletLikeCount(userNo, boardNo);
		
		return result;
	}
	
	@Override
	public void updateDetails(BoardDTO boardDTO) {
		
		BoardDTO board = boardMapper.selectDetails(boardDTO.getBoardNo());
		
		if(!board.getUserNo().equals(boardDTO.getUserNo())){
			throw new AccessDeniedException("작성자만 수정할 수 있습니다.");
		}
		
		
		 boardMapper.updateDetails(boardDTO);
		
	}

	@Override
	public void deleteDetails(Long boardNo, Long userNo) {
		
		 BoardDTO board = boardMapper.selectDetails(boardNo);
		 
		 if(!board.getUserNo().equals(userNo)) {
			 throw new AccessDeniedException("작성잠나 삭제할 수 있습습니다.");
			 
		 }
		
		boardMapper.deleteDetails(boardNo);
		
	}

	@Override
	public void insertComment(CommentDTO commentDTO) {
		
		 
		boardMapper.insertComment(commentDTO);	
		
	}

	@Override
	public List<CommentDTO> selectComment(Long boardNo) {
		
		List<CommentDTO> result =boardMapper.selectComment(boardNo);
		
		return result;
	}

	@Override
	public void updateComment(CommentDTO commentDTO) {
		
		int result = boardMapper.updateComment(commentDTO);
		
		if(result == 0 ) {
			throw new CommentAccessDeniedException("수정 또는 삭제할 수 없는 댓글입니다.");
		}
		
	}

	@Override
	public void deleteComment(Long commentNo,Long userNo) {
		
		int result = boardMapper.deleteComment(commentNo, userNo);
		
		if(result == 0) {
			throw new CommentAccessDeniedException("수정 또는 삭제할 수 없는 댓글입니다.");
		}
		
	}

	

	
	
	
}

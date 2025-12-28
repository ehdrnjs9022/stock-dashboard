package com.dk.project.board.controller;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dk.project.auth.model.vo.DkUserDetails;
import com.dk.project.board.model.dto.BoardDTO;
import com.dk.project.board.model.dto.BoardWriteDTO;
import com.dk.project.board.model.dto.CommentDTO;
import com.dk.project.board.model.dto.LikeResponseDTO;
import com.dk.project.board.model.service.BoardService;
import com.dk.project.util.model.dto.ResponseData;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class BoardController {
	
	private final BoardService boardService;

	@GetMapping("/board")
	public ResponseEntity<ResponseData> selectBoard(@RequestParam("category") String category
													){
			
		List<BoardDTO> result = boardService.selectBoard(category);
		
		
			ResponseData responseData = ResponseData.builder()
													.code("A100")	
													.message("게시판 조회 성공")
													.items(result)
													.build();
	
	return ResponseEntity.ok(responseData);
			
	}
	
	@PostMapping("/board/write")
	public ResponseEntity<ResponseData> insertWrite(@AuthenticationPrincipal DkUserDetails user,
													@RequestBody BoardWriteDTO form
													){
			
			form.setUserNo(user.getUserNo());
		
			boardService.insertWrite(form);
		
			ResponseData responseData = ResponseData.builder()
													.code("A100")	
													.message("글쓰기 성공")
													.build();
	
	return ResponseEntity.ok(responseData);
	
	
	}
	@GetMapping("/board/details/{boardNo}")
	public ResponseEntity<ResponseData> selectDetails(@PathVariable("boardNo") Long boardNo){
		
		boardService.increaseViewCount(boardNo);
		
		BoardDTO  result = boardService.selectDetails(boardNo);
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")	
				.message("상세조회 성공")
				.items(result)
				.build();
		
		return ResponseEntity.ok(responseData);
		
		
	}
	@PostMapping("/board/like/{boardNo}")
	public ResponseEntity<ResponseData> toggleLike(@AuthenticationPrincipal DkUserDetails user,
													@PathVariable("boardNo") Long boardNo){
		Long userNo = user.getUserNo();
		
		LikeResponseDTO result = boardService.toggleLike(boardNo,userNo);
		
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")	
				.message("좋아요 성공")
				.items(result)
				.build();
		
		return ResponseEntity.ok(responseData);
		
		
	}

	@PutMapping("/board/update/{boardNo}")
	public ResponseEntity<ResponseData> updateDetails(@AuthenticationPrincipal DkUserDetails user,
													  @RequestBody BoardDTO boardDTO,
													  @PathVariable("boardNo") Long boardNo){
		
		boardDTO.setUserNo(user.getUserNo());
		boardDTO.setBoardNo(boardNo);
		boardService.updateDetails(boardDTO);
		
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")	
				.message("게시판수정 성공")
				.build();
		
		return ResponseEntity.ok(responseData);
		
		
	}
	@DeleteMapping("/board/delete/{boardNo}")
	public ResponseEntity<ResponseData> deleteDetails(@AuthenticationPrincipal DkUserDetails user,
													  @PathVariable("boardNo") Long boardNo){
		
	
		
		boardService.deleteDetails(boardNo, user.getUserNo());
		
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")	
				.message("삭제 성공")
				.build();
		
		return ResponseEntity.ok(responseData);
		
		
	}
	@PostMapping("/board/insertcomment/{boardNo}")
	public ResponseEntity<ResponseData> insertCommnet(@AuthenticationPrincipal DkUserDetails user,
													  @RequestBody CommentDTO commentDTO,
													  @PathVariable("boardNo") Long boardNo){
												
		boardService.insertCommnet(commentDTO);
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")	
				.message("댓글작성 성공")
				.build();
		
		return ResponseEntity.ok(responseData);
		
		
	}
	@GetMapping("/board/selectComment/{boardNo}")
	public ResponseEntity<ResponseData> selectComment(@AuthenticationPrincipal DkUserDetails user,
			@PathVariable("boardNo") Long boardNo){
		
		Long userNo = user.getUserNo();
		
		List<CommentDTO> result  = boardService.selectComment(userNo,boardNo);
		
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")	
				.message("댓글조회 성공")
				.items(result)
				.build();
		
		return ResponseEntity.ok(responseData);
		
		
	}
	
	
	
	
	
	
	
	
}

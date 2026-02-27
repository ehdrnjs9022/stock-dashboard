package com.dk.project.mypage.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dk.project.auth.model.vo.DkUserDetails;
import com.dk.project.mypage.model.dto.BoardCommentDTO;
import com.dk.project.mypage.model.dto.ProfileDTO;
import com.dk.project.mypage.model.dto.ProfileResponseDTO;
import com.dk.project.mypage.model.service.MypageService;
import com.dk.project.token.model.service.TokenServiceImpl;
import com.dk.project.util.model.dto.ResponseData;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class MypageController {

    private final TokenServiceImpl tokenServiceImpl;
	
	private final MypageService mypageService;


    

	
	@PostMapping("/profile/upload")
	public ResponseEntity<ResponseData> uploadProfileImage(@AuthenticationPrincipal DkUserDetails user,
											    @RequestParam("file") MultipartFile file){
		
		
		ProfileDTO profileDTO = new ProfileDTO();
		profileDTO.setUserNo(user.getUserNo());
		profileDTO.setFile(file);
		
		
		ProfileResponseDTO result =  mypageService.uploadProfileImage(profileDTO);
		
		ResponseData responseData = ResponseData.builder()
												.code("A100")
												.items(result)
												.message("프로필업로드성공")
												.build();
		
		return ResponseEntity.ok(responseData);
		
	}
	@GetMapping("/profile/select")
	public ResponseEntity<ResponseData> getProfileImage(@AuthenticationPrincipal DkUserDetails user){
		
		ProfileDTO profileDTO = new ProfileDTO();
		profileDTO.setUserNo(user.getUserNo());
		
		ProfileResponseDTO result = mypageService.getProfileImage(profileDTO);
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")
				.items(result)
				.message("프로필업조회성공")
				.build();

		return ResponseEntity.ok(responseData);
		
	}
	
	@GetMapping("/activity/select")
	public ResponseEntity<ResponseData> getBoardComment(@AuthenticationPrincipal DkUserDetails user){
		
		
		BoardCommentDTO result = mypageService.getBoardComment(user.getUserNo());
		
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")
				.items(result)
				.message("게시판,댓글개수조회")
				.build();
		
		return ResponseEntity.ok(responseData);
		
	}
	@GetMapping("/comment/select")
	public ResponseEntity<ResponseData> getCommnet(@AuthenticationPrincipal DkUserDetails user){
		
		
		List<BoardCommentDTO> result  = mypageService.getCommnet(user.getUserNo());
		
		ResponseData responseData = ResponseData.builder()
				.code("A100")
				.items(result)
				.message("프로필업조회성공")
				.build();
		
		return ResponseEntity.ok(responseData);
		
	}
	

	
	
		
	
}

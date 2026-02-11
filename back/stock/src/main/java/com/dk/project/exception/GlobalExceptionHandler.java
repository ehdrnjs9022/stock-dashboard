package com.dk.project.exception;

import java.nio.file.AccessDeniedException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.dk.project.exception.exceptions.CommentAccessDeniedException;
import com.dk.project.exception.exceptions.EmailInfoNotFoundException;
import com.dk.project.exception.exceptions.FindIdCustomException;
import com.dk.project.exception.exceptions.FindPwCustomException;
import com.dk.project.exception.exceptions.InvalidPasswordException;
import com.dk.project.exception.exceptions.LoginFailedException;

@RestControllerAdvice
public class GlobalExceptionHandler  {

	
	@ExceptionHandler
	public ResponseEntity<?> handlerLoginFailedException(LoginFailedException e){
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
	@ExceptionHandler
	public ResponseEntity<?> handlerEmailInfoNotFoundException(EmailInfoNotFoundException e){
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
	@ExceptionHandler
	public ResponseEntity<?> handlerFindIdCustomException(FindIdCustomException e){
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
	@ExceptionHandler
	public ResponseEntity<?> handlerFindPwCustomException(FindPwCustomException e){
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
	@ExceptionHandler
	public ResponseEntity<?> handleInvalidPasswordException(InvalidPasswordException e){
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
	@ExceptionHandler
	public ResponseEntity<?> handleAccessDeniedException(AccessDeniedException e){
		
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
	}
	
	@ExceptionHandler
	public ResponseEntity<?> handleCommentAccessDeniedException(CommentAccessDeniedException e){
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
	
	
	
}

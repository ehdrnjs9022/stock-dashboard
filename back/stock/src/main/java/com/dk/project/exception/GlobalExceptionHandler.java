package com.dk.project.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.dk.project.exception.exceptions.EmailInfoNotFoundException;
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
	
	
}

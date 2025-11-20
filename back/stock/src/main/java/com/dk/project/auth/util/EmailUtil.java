package com.dk.project.auth.util;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EmailUtil {

	
	 private final JavaMailSender mailSender;
	 
	 
	 public void sendMail(SimpleMailMessage message) {
	        
	        mailSender.send(message);
	    }
	 
	 
	 
}

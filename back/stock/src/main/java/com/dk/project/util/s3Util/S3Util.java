package com.dk.project.util.s3Util;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.Delete;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.DeleteObjectsRequest;
import software.amazon.awssdk.services.s3.model.ObjectIdentifier;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@RequiredArgsConstructor
@Component

public class S3Util {


	private final S3Client s3Client;
	
	@Value("${cloud.aws.s3.bucket}")
	private String bucketName;
	
	public String upLoadFiles(MultipartFile file) {
		
		String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
		
		PutObjectRequest request = PutObjectRequest.builder()
													.bucket(bucketName)
													.key(fileName)
													.contentType(file.getContentType())
													.build();
		try {
			s3Client.putObject(request, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return "https://" + bucketName + ".s3.ap-northeast-2.amazonaws.com/" + fileName;
	}
	
	public List<String> upLoadFiles(List<MultipartFile> files) {
		
        return files.stream()
                .map(this::upLoadFiles)
                .collect(Collectors.toList());
	}
	
	
	public void deleteFiles(String fileUrl) {
		
		try {
			java.net.URL url = new java.net.URL(fileUrl);
			String path = url.getPath().substring(1);
			
			DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
																	.bucket(bucketName)
																	.key(path)
																	.build();
			s3Client.deleteObject(deleteRequest);
			
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		
	}
	
	public void deleteFiles(List<String> fileUrls) {
	    List<ObjectIdentifier> objectsToDelete = fileUrls.stream()
	        .map(url -> {
	            try {
	                String key = new java.net.URL(url).getPath().substring(1);
	                return ObjectIdentifier.builder().key(key).build();
	            } catch (Exception e) {
	                e.printStackTrace();
	                return null;
	            }
	        })
	        .filter(Objects::nonNull)
	        .toList();

	    DeleteObjectsRequest deleteRequest = DeleteObjectsRequest.builder()
	        .bucket(bucketName)
	        .delete(Delete.builder().objects(objectsToDelete).build())
	        .build();

	    s3Client.deleteObjects(deleteRequest);
	}
}

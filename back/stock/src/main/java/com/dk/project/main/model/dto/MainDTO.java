	package com.dk.project.main.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MainDTO {
	
	
    private String title;
    private String originallink;
    private String link;
    private String description;
    private String pubDate;
}


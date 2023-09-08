package com.project.backend.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
@Getter
@Setter
public class Message {
	private Long id;
    private String content;
    private String sender;
    private LocalDateTime timestamp;
}

package com.project.backend.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageDto {
	private Long empNum;
	 private String roomId; // 채팅방 ID

	    private String sender; // 메시지 보낸 사람 sender하고 empname이 같으면됨

	    private String message; // 메시지 내용

	    private Date timestamp; // 메시지 발송 시간
}

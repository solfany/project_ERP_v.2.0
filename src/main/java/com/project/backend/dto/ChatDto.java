package com.project.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatDto {
	//테스트용 채팅 메시지를 주고 받기 위한 dto 

	public enum MessageType{
		ENTER, TALK, JOIN
	}
	private MessageType type;//메시지 타입
	private String roomId;	//방번호
	private String sender;	//매시지 보낸사람 
	private String message;	//메시지
	
}

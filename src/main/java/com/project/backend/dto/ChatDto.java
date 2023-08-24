package com.project.backend.dto;


import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatDto {
//	//채팅 기능에 필요한 최소한의 정보
//	
//	private Long empNum;		//사원번호
//	private String empName;	//이름
//	private Date sendTime;	//보낸 시간
//	private String sender;	//보내는 사람
//	private Date receiveTime;	//받는 시간
//	private String receiver;	//받는 사람
//	
//	//만약 사용할 수 있다면 
//	private String chatRoomType; //채팅방에 대한 TYPE 갠톡 혹은 단톡이곘지
//	
//	//그럼 ENTITY도 늘어나는거야 1:N 관계로
	
	private String chatRoomId;	//채팅방 자체 고유 번호
    private String sender;		//보내는 사람
    private String receiver;	//받는 사람
    private String messageContext;	//채팅 내용
    private LocalDateTime sendDateTime;	//보낸 시간

    // 생성자, 게터, 세터 등 필요한 메서드 추가
	
    public ChatDto() {
    }

    public ChatDto(String chatRoomId, String sender, String receiver, String messageContext, LocalDateTime sendDateTime) {
        this.chatRoomId = chatRoomId;
        this.sender = sender;
        this.receiver = receiver;
        this.messageContext = messageContext;
        this.sendDateTime = sendDateTime;
    }
}

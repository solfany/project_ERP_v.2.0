package com.project.backend.entity;

import java.time.LocalDateTime;

import com.project.backend.dto.ChatDto;
import com.project.backend.dto.VacationDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "chat")
@Getter
@Setter
public class Chat {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false)
//    private String empName;
//
//    @Column(nullable = false)
//    private String empEmil;	//
//    
//    @Column(nullable = false)
//    private String context;	//채팅 내용

	


	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;	//채팅방 데이터에 들어가는 pk값
	
	@Column
	private String chatRoomId;	//채팅방 자체 고유 번호
	
//	private String empNum;		//사원 번호를 이용한 데이터 호출
	
	@Column
    private String sender;		//보내는 사람->이게 로그인한 값과 아이디 값이 sender와 동일
	
	@Column
    private String receiver;	//받는 사람	 ->로그인한 사람이 아닌 아이디 값을 receiver
	
	@Column
    private String messageContext;	//채팅 내용
	
	@Column
    private LocalDateTime sendDateTime;	//보낸 시간
	
	
	  public Chat() {
	    }

	    public Chat(ChatDto chatDto) {
	        this.chatRoomId = chatDto.getChatRoomId();
	        this.sender = chatDto.getSender();
	        this.receiver = chatDto.getReceiver();
	        this.messageContext = chatDto.getMessageContext();
	        this.sendDateTime = chatDto.getSendDateTime();
	    }
}
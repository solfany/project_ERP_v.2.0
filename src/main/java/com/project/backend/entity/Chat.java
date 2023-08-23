package com.project.backend.entity;

import java.time.LocalDateTime;

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

	private String chatRoomId;	//채팅방 자체 고유 번호
    private String sender;		//보내는 사람
    private String receiver;	//받는 사람
    private String messageContext;	//채팅 내용
    private LocalDateTime sendDateTime;	//보낸 시간
    
	
}
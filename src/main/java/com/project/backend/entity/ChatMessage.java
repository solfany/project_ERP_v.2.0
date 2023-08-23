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
@Table(name = "chatMessage")
@Getter
@Setter
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 기본 키

    private String chatRoomId;	//채팅방 자체 고유 번호
    private String sender;		//보내는 사람
    private String receiver;	//받는 사람
    private String messageContext;	//채팅 내용
    private LocalDateTime sendDateTime;	//보낸 시간

//    @ManyToOne
//    @JoinColumn(name = "user_id") // 외래 키의 컬럼명
//    private UserEntity user; // UserEntity와 관계 설정
}
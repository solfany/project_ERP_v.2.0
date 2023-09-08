package com.project.backend.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "chat_message")
@Getter
@Setter
public class ChatMessage {

    @Id
    @Column(name = "chat_message_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    private String roomId; // 채팅방 ID

    private String sender; // 메시지 보낸 사람

    private String message; // 메시지 내용

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp; // 메시지 발송 시간

	// getter and setter ...
}
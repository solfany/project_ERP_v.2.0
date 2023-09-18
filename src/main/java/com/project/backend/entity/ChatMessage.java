package com.project.backend.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "emp_num") 
    private Staff staff;

    @Column(nullable = false)
    private String roomId; // 채팅방 ID

    @Column(nullable = false)
    private String sender; // 메시지 보낸 사람 sender하고 empname이 같으면됨

    @Column(nullable = false)
    private String message; // 메시지 내용

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp; // 메시지 발송 시간

    
//    SELECT
//    *
//FROM
//    Staff s
//INNER JOIN
//    chat_message cm ON s.emp_num = cm.emp_num;
}
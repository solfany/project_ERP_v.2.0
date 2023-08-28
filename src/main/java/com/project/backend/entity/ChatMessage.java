//package com.project.backend.entity;
//
//import java.time.LocalDateTime;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//import lombok.Getter;
//import lombok.Setter;
//@Entity
//@Table(name = "chatMessage")
//@Getter
//@Setter
//public class ChatMessage {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id; // 기본 키
//
//    private String chatRoomId;	//채팅방 자체 고유 번호
////	private String empNum;		//사원 번호를 이용한 데이터 호출
//    private String sender;		//보내는 사람->이게 로그인한 값과 아이디 값이 sender와 동일  
//    private String receiver;	//받는 사람	 ->로그인한 사람이 아닌 아이디 값을 receiver 
//    private String messageContext;	//채팅 내용
//    private LocalDateTime sendDateTime;	//보낸 시간
//
////    @ManyToOne
////    @JoinColumn(name = "user_id") // 외래 키의 컬럼명
////    private UserEntity user; // UserEntity와 관계 설정
//}
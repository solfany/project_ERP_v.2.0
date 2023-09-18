


package com.project.backend.controller;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.backend.config.websocket.RedisPublisher;
import com.project.backend.dto.ChatDto;
import com.project.backend.dto.ChatMessageDto;
import com.project.backend.dto.StaffDto;
import com.project.backend.entity.ChatMessage;
import com.project.backend.entity.Staff;
import com.project.backend.repository.ChatMessageRepository;
import com.project.backend.repository.ChatRoomRepository;
import com.project.backend.repository.StaffRepository;
import com.project.backend.repository.VacationRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class ChatController {
		//찐퉁용
//    private final SimpMessageSendingOperations messagingTemplate;

//    @MessageMapping("/chat/message")
//    public void message(ChatDto chatDto) {
//        if (ChatDto.MessageType.ENTER.equals(chatDto.getType()))
//        	chatDto.setMessage(chatDto.getSender() + "님이 입장하셨습니다.");
//        messagingTemplate.convertAndSend("/sub/chat/room/" + chatDto.getRoomId(), chatDto);
//    }
    


	//redis에서 입장했을때 나오는 채팅 관련 내용
     private final RedisPublisher redisPublisher;
     private final ChatRoomRepository chatRoomRepository;
     private final ChatMessageRepository chatMessageRepository;
     private final StaffRepository staffRepository;

   
     @MessageMapping("/chat/message")
     public void message(@Payload ChatDto chatDto) {
         if (ChatDto.MessageType.ENTER.equals(chatDto.getType())) {
             chatRoomRepository.enterChatRoom(chatDto.getRoomId());
             chatRoomRepository.enterChatRoom(chatDto.getSender());
             chatDto.setMessage(chatDto.getSender() + "님이 입장하셨습니다.");
         }
         if (ChatDto.MessageType.QUIT.equals(chatDto.getType())) { 
             chatRoomRepository.leaveChatRoom(chatDto.getSender(), chatDto.getRoomId() );
             chatDto.setMessage(chatDto.getSender() + "님이 퇴장하셨습니다.");
         }
         //Redis로 해당 방의 주제(topic)에 대해 메시지를 발행(publish)
         redisPublisher.publish(chatRoomRepository.getTopic(chatDto.getRoomId()), chatDto);
         
         //mysql과 연결된 레퍼지토리에 저장한다 
         ChatMessage chatEntity = new ChatMessage();
         //staff의 정보를 empname을 이용해 정보를 받아옴
         Staff staff = staffRepository.findByEmpName(chatDto.getSender());

         if (staff == null) {
             throw new IllegalArgumentException("회원정보 이름이 : " + chatDto.getSender()+"은 없습니다");
         }
         
         chatEntity.setStaff(staff); // Staff 엔티티를 설정
         chatEntity.setRoomId(chatDto.getRoomId());
         chatEntity.setSender(chatDto.getSender());
         chatEntity.setMessage(chatDto.getMessage());
         chatEntity.setTimestamp(new Date()); 

         chatMessageRepository.save(chatEntity);
     }
     
     @DeleteMapping("/chat/message/{messageId}")
     public ResponseEntity<Void> deleteMessage(@PathVariable Long messageId, @RequestParam String userId) {
         ChatMessage message = chatMessageRepository.findById(messageId).orElse(null);

         if (message == null) {
             return ResponseEntity.notFound().build();
         }

         if (!message.getSender().equals(userId)) {
             return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
         }

         chatMessageRepository.delete(message);
         return ResponseEntity.noContent().build();
     }
     
 }


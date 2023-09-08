


package com.project.backend.controller;

import java.util.Date;

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
import com.project.backend.entity.ChatMessage;
import com.project.backend.repository.ChatMessageRepository;
import com.project.backend.repository.ChatRoomRepository;

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
   
     @MessageMapping("/chat/message")
     public void message(@Payload ChatDto chatDto) {
         if (ChatDto.MessageType.ENTER.equals(chatDto.getType())) {
             chatRoomRepository.enterChatRoom(chatDto.getRoomId());
             chatRoomRepository.enterChatRoom(chatDto.getSender());
             chatDto.setMessage(chatDto.getSender() + "님이 입장하셨습니다.");
         }else if (ChatDto.MessageType.QUIT.equals(chatDto.getType())) { // 추가: 나가기 메시지 처리
             chatRoomRepository.leaveChatRoom(chatDto.getSender(), chatDto.getRoomId() );
             chatDto.setMessage(chatDto.getSender() + "님이 퇴장하셨습니다.");
         }
         // Websocket에 발행된 메시지를 redis로 발행한다(publish)
         redisPublisher.publish(chatRoomRepository.getTopic(chatDto.getRoomId()), chatDto);
         
         
         ChatMessage chatEntity = new ChatMessage();
         chatEntity.setRoomId(chatDto.getRoomId());
         chatEntity.setSender(chatDto.getSender());
         chatEntity.setMessage(chatDto.getMessage());
         
         // timestamp 설정은 현재 시간으로 할 수도 있고,
         // 만약 클라이언트에서 시간 정보가 오면 그것을 사용할 수도 있습니다.
         chatEntity.setTimestamp(new Date()); 

         // 수정된 부분: 올바른 Repository 인스턴스 사용
         chatMessageRepository.save(chatEntity);
     }
     
     @DeleteMapping("/message/{messageId}")
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
     
     //그러면 service 기능이나 controller 관련해서도 알려줘
    
     
     
 }


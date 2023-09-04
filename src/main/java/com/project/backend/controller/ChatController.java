//package com.project.backend.controller;
//
//import java.util.List;
//
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.project.backend.dto.ChatRoom;
//import com.project.backend.service.ChatService;
//
//import lombok.RequiredArgsConstructor;
//
//// 테스트용 채팅 구현
////->메시지 관련 controller
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/chat")
//public class ChatController {
//
//    private final ChatService chatService;
//
//    @PostMapping
//    public ChatRoom createRoom(@RequestParam String name) {
//        return chatService.createRoom(name);
//    }
//
//    @GetMapping
//    public List<ChatRoom> findAllRoom() {
//        return chatService.findAllRoom();
//    }
//}


package com.project.backend.controller;



import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

//import com.project.backend.config.websocket.RedisMessageService;
import com.project.backend.config.websocket.RedisPublisher;
import com.project.backend.dto.ChatDto;
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
    
    
    
//    //찐퉁
//    @MessageMapping("/chat/message")
//    public void message(@Payload ChatDto chatDto, @Headers Map<String, Object> headers) {
//        String sender = (String) headers.get("wschat.sender");
//        sender = "sdsd";
//        if (ChatDto.MessageType.ENTER.equals(chatDto.getType())) {
//            chatDto.setMessage(sender + "님이 입장하셨습니다.");
//        }
//        
//        messagingTemplate.convertAndSend("/sub/chat/room/" + chatDto.getRoomId(), chatDto);
//    }
//    
    


	//redis 전용
     private final RedisPublisher redisPublisher;
     private final ChatRoomRepository chatRoomRepository;
//     private final RedisMessageService redisMessageService;
   
     @MessageMapping("/chat/message")
     public void message(@Payload ChatDto chatDto) {
         if (ChatDto.MessageType.ENTER.equals(chatDto.getType())) {
             chatRoomRepository.enterChatRoom(chatDto.getRoomId());
             chatRoomRepository.enterChatRoom(chatDto.getSender());
             chatDto.setMessage(chatDto.getSender() + "님이 입장하셨습니다.");
         }
         // Websocket에 발행된 메시지를 redis로 발행한다(publish)
         redisPublisher.publish(chatRoomRepository.getTopic(chatDto.getRoomId()), chatDto);
//         redisMessageService.saveMessage(chatDto.getRoomId(), chatDto.getMessage());
     }
     
	
     
     
 }


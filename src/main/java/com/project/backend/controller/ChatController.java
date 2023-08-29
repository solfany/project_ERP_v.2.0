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
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.project.backend.dto.ChatDto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
//@CrossOrigin(origins = "http://localhost:3000") // 허용할 오리진을 지정
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/chat/message")
    public void message(ChatDto chatDto) {
        if (ChatDto.MessageType.JOIN.equals(chatDto.getType()))
        	chatDto.setMessage(chatDto.getSender() + "님이 입장하셨습니다.");
        messagingTemplate.convertAndSend("/sub/chat/room/" + chatDto.getRoomId(), chatDto);
    }
}
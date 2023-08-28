package com.project.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.dto.ChatDto;
import com.project.backend.service.ChatService;

//@RestController
//@RequestMapping("/api/chat")
//public class ChatController {
//    private final ChatService chatService;
//
//    @Autowired
//    public ChatController(ChatService chatService) {
//        this.chatService = chatService;
//    }
//
//    @MessageMapping("/send")
//    public void sendMessage(@Payload ChatDto chatDto) {
//        // 받은 메시지를 처리하는 로직 (예: 채팅방에 브로드캐스트)
//        chatService.saveChatMessage(chatDto);
//    }
//}
@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @MessageMapping("/send")
    public void sendMessage(@Payload ChatDto chatDto) {
        // 받은 메시지를 처리하는 로직 (예: 채팅방에 브로드캐스트)
        chatService.saveChatMessage(chatDto);
    }
    
    @GetMapping("/messages")
    public List<ChatDto> getChatMessages() {
        // 채팅 메시지 가져오는 로직 추가
        List<ChatDto> chatMessages = chatService.getChatMessages();
        return chatMessages;
    }
}

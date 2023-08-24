//package com.project.backend.service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.project.backend.dto.ChatDto;
//import com.project.backend.entity.Chat;
//import com.project.backend.repository.ChatRepository;
//
//@Service
//public class ChatService {
//    private final ChatRepository chatRepository;
//
//    @Autowired
//    public ChatService(ChatRepository chatRepository) {
//        this.chatRepository = chatRepository;
//    }
//
//    public List<ChatDto> getChatMessages() {
//        List<Chat> chatEntities = chatRepository.findAll(); // 데이터베이스에서 모든 채팅 가져오기
//        
//        List<ChatDto> chatMessages = chatEntities.stream()
//            .map(this::convertToDto) // Entity를 DTO로 변환
//            .collect(Collectors.toList());
//        
//        return chatMessages;
//    }
//
//    private ChatDto convertToDto(Chat chatEntity) {
//        ChatDto chatDto = new ChatDto();
//        chatDto.setChatRoomId(chatEntity.getChatRoomId());
//        chatDto.setSender(chatEntity.getSender());
//        chatDto.setReceiver(chatEntity.getReceiver());
//        chatDto.setMessageContext(chatEntity.getMessageContext());
//        chatDto.setSendDateTime(chatEntity.getSendDateTime());
//        return chatDto;
//    }
//    public void saveChatMessage(ChatDto chatDto) {
//        // ChatDto를 Chat 엔티티로 변환
//        Chat chat = new Chat();
//        chat.setChatRoomId(chatDto.getChatRoomId());
//        chat.setSender(chatDto.getSender());
//        chat.setReceiver(chatDto.getReceiver());
//        chat.setMessageContext(chatDto.getMessageContext());
//        chat.setSendDateTime(chatDto.getSendDateTime());
//
//        // Chat 엔티티 저장
//        chatRepository.save(chat);
//    }
//    
//}
//
//
//

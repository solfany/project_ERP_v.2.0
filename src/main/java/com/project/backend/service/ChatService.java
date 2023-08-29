//package com.project.backend.service;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.LinkedHashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.UUID;
//
//import org.springframework.stereotype.Service;
//import org.springframework.web.socket.TextMessage;
//import org.springframework.web.socket.WebSocketSession;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.project.backend.dto.ChatRoom;
//
//import jakarta.annotation.PostConstruct;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//
////
////import java.util.List;
////import java.util.stream.Collectors;
////
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.stereotype.Service;
////
////import com.project.backend.dto.ChatDto;
////import com.project.backend.repository.ChatRepository;
////
////@Service
////public class ChatService {
////    private final ChatRepository chatRepository;
////
////    @Autowired
////    public ChatService(ChatRepository chatRepository) {
////        this.chatRepository = chatRepository;
////    }
////
////    public List<ChatDto> getChatMessages() {
////        List<Chat> chatEntities = chatRepository.findAll(); // 데이터베이스에서 모든 채팅 가져오기
////        
////        List<ChatDto> chatMessages = chatEntities.stream()
////            .map(this::convertToDto) // Entity를 DTO로 변환
////            .collect(Collectors.toList());
////        
////        return chatMessages;
////    }
////
////    private ChatDto convertToDto(Chat chatEntity) {
////        ChatDto chatDto = new ChatDto();
////        chatDto.setChatRoomId(chatEntity.getChatRoomId());
////        chatDto.setSender(chatEntity.getSender());
////        chatDto.setReceiver(chatEntity.getReceiver());
////        chatDto.setMessageContext(chatEntity.getMessageContext());
////        chatDto.setSendDateTime(chatEntity.getSendDateTime());
////        return chatDto;
////    }
////    public void saveChatMessage(ChatDto chatDto) {
////        // ChatDto를 Chat 엔티티로 변환
////        Chat chat = new Chat();
////        chat.setChatRoomId(chatDto.getChatRoomId());
////        chat.setSender(chatDto.getSender());
////        chat.setReceiver(chatDto.getReceiver());
////        chat.setMessageContext(chatDto.getMessageContext());
////        chat.setSendDateTime(chatDto.getSendDateTime());
////
////        // Chat 엔티티 저장
////        chatRepository.save(chat);
////    }
////    
////}
////
////
////
//@Slf4j
//@RequiredArgsConstructor
//@Service
//public class ChatService {
//
//    private final ObjectMapper objectMapper;
//    private Map<String, ChatRoom> chatRooms;
//
//    @PostConstruct
//    private void init() {
//        chatRooms = new LinkedHashMap<>();
//    }
//
//    public List<ChatRoom> findAllRoom() {
//        return new ArrayList<>(chatRooms.values());
//    }
//
//    public ChatRoom findRoomById(String roomId) {
//        return chatRooms.get(roomId);
//    }
//
//    public ChatRoom createRoom(String name) {
//        String randomId = UUID.randomUUID().toString();
//        ChatRoom chatRoom = ChatRoom.builder()
//                .roomId(randomId)
//                .name(name)
//                .build();
//        chatRooms.put(randomId, chatRoom);
//        return chatRoom;
//    }
//
//    public <T> void sendMessage(WebSocketSession session, T message) {
//        try {
//            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
//        } catch (IOException e) {
//            log.error(e.getMessage(), e);
//        }
//    }
//}
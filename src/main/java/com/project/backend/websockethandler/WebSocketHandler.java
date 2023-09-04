//package com.project.backend.websockethandler;
//
////import java.util.Map;
////import java.util.concurrent.ConcurrentHashMap;
//
//import org.springframework.stereotype.Component;
////import org.springframework.web.socket.CloseStatus;
//import org.springframework.web.socket.TextMessage;
//import org.springframework.web.socket.WebSocketSession;
//import org.springframework.web.socket.handler.TextWebSocketHandler;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.project.backend.dto.ChatDto;
//import com.project.backend.dto.ChatRoom;
//import com.project.backend.service.ChatService;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//
////테스트용 websocket handler
//// -> controller로 publisher 구현으로 대체
//
//@Slf4j
//@RequiredArgsConstructor
//@Component
//public class WebSocketHandler extends TextWebSocketHandler {
//    private final ObjectMapper objectMapper;
//    private final ChatService chatService;
//
//    @Override
//    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//        String payload = message.getPayload();
//        log.info("payload {}", payload);
//// 삭제        TextMessage textMessage = new TextMessage("Welcome chatting sever~^^ ");
//// 삭제       session.sendMessage(textMessage);
//        ChatDto chatDto = objectMapper.readValue(payload, ChatDto.class);
//        ChatRoom room = chatService.findRoomById(chatDto.getRoomId());
//        room.handleActions(session, chatDto, chatService);
//    }
//}
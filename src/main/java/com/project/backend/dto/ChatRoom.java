package com.project.backend.dto;



import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

//@Getter
//public class ChatRoom {
	//테스트용 채팅방 구현
//    private String roomId;
//    private String name;
//    private Set<WebSocketSession> sessions = new HashSet<>();
//
//    @Builder
//    public ChatRoom(String roomId, String name) {
//        this.roomId = roomId;
//        this.name = name;
//    }
//
//    public void handleActions(WebSocketSession session, ChatDto chatDto, ChatService chatService) {
//        if (chatDto.getType().equals(ChatDto.MessageType.ENTER)) {
//            sessions.add(session);
//            chatDto.setMessage(chatDto.getSender() + "님이 입장했습니다.");
//        }
//        sendMessage(chatDto, chatService);
//    }
//
//    public <T> void sendMessage(T message, ChatService chatService) {
//        sessions.parallelStream().forEach(session -> chatService.sendMessage(session, message));
//    }
//}
@Getter
@Setter
public class ChatRoom {
    private String roomId;
    private String name;

    public static ChatRoom create(String name) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.name = name;
        return chatRoom;
    }
}
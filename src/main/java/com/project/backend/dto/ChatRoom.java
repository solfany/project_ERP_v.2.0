package com.project.backend.dto;



import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
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

//------------------------------------------------------------------------------------------------------

@Getter
@Setter
public class ChatRoom implements Serializable {

    private static final long serialVersionUID = 6494678977089006639L;

    private String roomId;
    private String name;
//    private List<String> senders; // 발신자 목록
//    private List<String> messages; // 메시지 목록

    //private String sender;//저장된 sender의 목록을 뽑아 내야됨
    //private String massage;//저장된 message의 목록을 뽑아 내야됨

    public static ChatRoom create(String name) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.name = name;	//채팅방의 제목임

        return chatRoom;
    }

}



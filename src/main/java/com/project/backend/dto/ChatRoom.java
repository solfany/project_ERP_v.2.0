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
//상태를 byte stream으로 변환하여 파일에 저장하거나 네트워크로 전송할 수 있게 해주는 기능
public class ChatRoom implements Serializable {
	
//	이전 버전과 호환성을 유지하기 위해 사용
    private static final long serialVersionUID = 6494678977089006639L;

    private String roomId;	//채팅방 고유 id값
    private String name;	//채팅방 제목(이름) 

    public static ChatRoom create(String name) {
        ChatRoom chatRoom = new ChatRoom();
        //UUID 값은 roomId의 값을 유일하게 보장되므로 충돌 없이 고유한 값으로 생성
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.name = name;	//채팅방의 제목(이름)임

        return chatRoom;
    }

}



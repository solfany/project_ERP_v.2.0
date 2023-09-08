package com.project.backend.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.backend.config.websocket.RedisSubscriber;
import com.project.backend.dto.Message;
import com.project.backend.dto.ChatRoom;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Repository
public class ChatRoomRepository {
    // 채팅방(topic)에 발행되는 메시지를 처리할 Listner
    private final RedisMessageListenerContainer redisMessageListener;
    // 구독 처리 서비스
    private final RedisSubscriber redisSubscriber;
    // Redis
    private static final String CHAT_ROOMS = "CHAT_ROOM";
    

    
    private final RedisTemplate<String, Object> redisObjectTemplate;
    
    //문자열 데이터를 다루기 위한 RedisTemplate
	private final RedisTemplate<String, String> redisStringTemplate;

    
    private HashOperations<String, String, ChatRoom> opsHashChatRoom;
    // 채팅방의 대화 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 roomId로 찾을수 있도록 한다.
    private Map<String, ChannelTopic> topics;

//    @PostConstruct
//    private void init() {
//        opsHashChatRoom = redisTemplate.opsForHash();
////        opsHashChatMessages = redisTemplateme.opsForHash(); // HashOperations 초기화
//        topics = new HashMap<>();
//    }
    @PostConstruct
	private void init() {
	    opsHashChatRoom = redisObjectTemplate.opsForHash();
	    topics = new HashMap<>();
	}
    

    //채팅방에 대한 정보를 모두 list 형식으로 가져오는 비즈니스 로직
    public List<ChatRoom> findAllRoom() {
        return opsHashChatRoom.values(CHAT_ROOMS);
    }

    //채팅방에 대한 id값으로 찾는 로직
    public ChatRoom findRoomById(String id) {
        return opsHashChatRoom.get(CHAT_ROOMS, id);
    }

   
    //채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
    public ChatRoom createChatRoom(String name) {
        ChatRoom chatRoom = ChatRoom.create(name);
        opsHashChatRoom.put(CHAT_ROOMS, chatRoom.getRoomId(), chatRoom);
        return chatRoom;
    }
    public void deleteChatRoom(String roomId) {
        opsHashChatRoom.delete(CHAT_ROOMS, roomId);
    }

   
    //채팅방 입장하는 로직 redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정하는 로직 
    public void enterChatRoom(String roomId) {
        ChannelTopic topic = topics.get(roomId);
        if (topic == null) {
            topic = new ChannelTopic(roomId);
            //여기에 저장된 메신저 저장
            
            //여기에 메시지 리스너를 이용해 불러오는거
            redisMessageListener.addMessageListener(redisSubscriber, topic);
   
            topics.put(roomId, topic);
        }
    }
    
    //채팅방에서 나가기 
    //roomId값을 찾아 나가는 기능 
    public void leaveChatRoom(String roomId, String userId) {
        redisStringTemplate.opsForSet().remove(CHAT_ROOMS + "_participants_" + roomId, userId);
    }

    public ChannelTopic getTopic(String roomId) {
        return topics.get(roomId);
    }
}

//    public List<Message> getMessages(String roomId) {
//        List<String> rawMessages = redisStringTemplate.opsForList().range("chatroom:" + roomId + ":messages", 0, -1);
//        ObjectMapper mapper = new ObjectMapper();
//        return rawMessages.stream()
//            .map(raw -> {
//                try {
//                    return mapper.readValue(raw, Message.class);
//                } catch (Exception e) {
//                    throw new RuntimeException("Failed to convert message to ChatMessage object.", e);
//                }
//            })
//            .collect(Collectors.toList());
//    }
//    
//    //메시지 저장하기
//	public void saveMessage(String roomId, String message) {
//	    redisStringTemplate.opsForList().rightPush("chatroom:" + roomId + ":messages", message);
//	}
//    

//    public List<String> getMessages(String roomId) {
//        return redisTemplate.opsForList().range("chatroom:" + roomId + ":messages", 0, -1);
//    } 

//    public void saveMessage(String roomId, String message) {
//        redisTemplate.opsForList().rightPush("chatroom:" + roomId + ":messages", message);
//    }
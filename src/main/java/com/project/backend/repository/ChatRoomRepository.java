package com.project.backend.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import com.project.backend.config.websocket.RedisSubscriber;
import com.project.backend.dto.ChatRoom;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

//@Repository
//public class ChatRoomRepository {
//
//	//이건 원래 service기능
// private Map<String, ChatRoom> chatRoomMap;
//
// @PostConstruct
// private void init() {
//     chatRoomMap = new LinkedHashMap<>();
// }
//
// public List<ChatRoom> findAllRoom() {
//     // 채팅방 생성순서 최근 순으로 반환
//     List chatRooms = new ArrayList<>(chatRoomMap.values());
//     Collections.reverse(chatRooms);
//     return chatRooms;
// }
//
// public ChatRoom findRoomById(String id) {
//     return chatRoomMap.get(id);
// }
//
// public ChatRoom createChatRoom(String name) {
//     ChatRoom chatRoom = ChatRoom.create(name);
//     chatRoomMap.put(chatRoom.getRoomId(), chatRoom);
//     return chatRoom;
// }
//// private final ChatRepository chatRepository;
//// @Autowired
//// public ChatRoomRepository(ChatRepository chatRepository) {
////     this.chatRepository = chatRepository;
//// }
////
//// public List<Chat> getAllChatMessages() {
////     return chatRepository.findAll();
//// }
////
//// public Chat saveChatMessage( Chat chat) {
////     return chatRepository.save(chat);
//// }

@RequiredArgsConstructor
@Repository
public class ChatRoomRepository {
    // 채팅방(topic)에 발행되는 메시지를 처리할 Listner
    private final RedisMessageListenerContainer redisMessageListener;
    // 구독 처리 서비스
    private final RedisSubscriber redisSubscriber;
    // Redis
    private static final String CHAT_ROOMS = "CHAT_ROOM";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, ChatRoom> opsHashChatRoom;
    // 채팅방의 대화 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 roomId로 찾을수 있도록 한다.
    private Map<String, ChannelTopic> topics;

    @PostConstruct
    private void init() {
        opsHashChatRoom = redisTemplate.opsForHash();
        topics = new HashMap<>();
    }

    public List<ChatRoom> findAllRoom() {
        return opsHashChatRoom.values(CHAT_ROOMS);
    }

    public ChatRoom findRoomById(String id) {
        return opsHashChatRoom.get(CHAT_ROOMS, id);
    }

    /**
     * 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
     */
    public ChatRoom createChatRoom(String name) {
        ChatRoom chatRoom = ChatRoom.create(name);
        opsHashChatRoom.put(CHAT_ROOMS, chatRoom.getRoomId(), chatRoom);
        return chatRoom;
    }

    /**
     * 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
     */
    public void enterChatRoom(String roomId) {
        ChannelTopic topic = topics.get(roomId);
        if (topic == null) {
            topic = new ChannelTopic(roomId);
            redisMessageListener.addMessageListener(redisSubscriber, topic);
            topics.put(roomId, topic);
        }
    }

    public ChannelTopic getTopic(String roomId) {
        return topics.get(roomId);
    }
    
    
    
}

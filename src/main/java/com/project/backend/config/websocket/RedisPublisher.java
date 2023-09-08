package com.project.backend.config.websocket;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import com.project.backend.dto.ChatDto;


import lombok.RequiredArgsConstructor;
	
//이 코드는 Redis에서 발행/구독(pub/sub) 모델을 이용해 메시지를 발행하는 클래스

//import 생략...
@RequiredArgsConstructor
@Service
public class RedisPublisher {
	
	//이 코드는 Redis에서 발행/구독(pub/sub) 모델을 이용해 메시지를 발행하는 클래스
 private final RedisTemplate<String, Object> redisTemplate;

 public void publish(ChannelTopic topic, ChatDto message) {
     redisTemplate.convertAndSend(topic.getTopic(), message);
 }
}
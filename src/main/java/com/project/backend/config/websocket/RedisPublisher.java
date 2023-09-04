package com.project.backend.config.websocket;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import com.project.backend.dto.ChatDto;


import lombok.RequiredArgsConstructor;

//import 생략...
@RequiredArgsConstructor
@Service
public class RedisPublisher {
 private final RedisTemplate<String, Object> redisTemplate;

 public void publish(ChannelTopic topic, ChatDto message) {
     redisTemplate.convertAndSend(topic.getTopic(), message);
 }
}
package com.project.backend.config.websocket;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import redis.embedded.RedisServer;

//import 생략...

/**
* 로컬 환경일경우 내장 레디스가 실행됩니다.
*/

//이 코드는 Spring Boot에서 로컬 환경에서 Redis를 사용하기 위한 설정을 하는 클래스
//@Profile("local") 어노테이션은 이 설정이 "local" 에서만 적용

@Profile("local")
@Configuration
public class EmbeddedRedisConfig {
	
	
 @Value("${spring.redis.port}")
 private int redisPort;

 private RedisServer redisServer;

 @PostConstruct
 public void redisServer() {
     redisServer = new RedisServer(redisPort);
     redisServer.start();
 }

 @PreDestroy
 public void stopRedis() {
     if (redisServer != null) {
         redisServer.stop();
     }
 }

//@Profile("local")
//@Configuration
//@EnableRedisRepositories
//public class EmbeddedRedisConfig {
//
//    @Value("${spring.redis.port}")
//    private int redisPort;
//
//    @Bean(initMethod = "start", destroyMethod = "stop")
//    public RedisServer redisServer() {
//        return new RedisServer(redisPort);
//    }
//
//    @Bean
//    public RedisTemplate<String, String> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
//        RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
//        redisTemplate.setConnectionFactory(redisConnectionFactory);
//        redisTemplate.setKeySerializer(new StringRedisSerializer());
//        redisTemplate.setValueSerializer(new StringRedisSerializer());
//        return redisTemplate;
//    }
}
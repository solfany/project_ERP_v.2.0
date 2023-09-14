package com.project.backend.config.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

//테스트용 websocket config
//@RequiredArgsConstructor
//@Configuration
//@EnableWebSocket
//public class WebSocketConfig implements WebSocketConfigurer {
//    private final WebSocketHandler webSocketHandler;
//	
//	@Override
//    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//        registry.addHandler(webSocketHandler, "/ws/chat").setAllowedOrigins("*");
//    }
//}

//이 코드는 Spring에서 WebSocket과 STOMP 프로토콜을 사용하기 위한 설정을 하는 클래스
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/sub");
        config.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-stomp")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }
    
}


//package com.project.backend.controller;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.project.backend.entity.ChatMessage;
//import com.project.backend.repository.ChatMessageRepository;
//
//import lombok.RequiredArgsConstructor;
//
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/chat/message")
//public class ChatMessageManagementController {
//
//    private final ChatMessageRepository chatMessageRepository;
//
//    @DeleteMapping("/{messageId}")
//    public ResponseEntity<Void> deleteMessage(@PathVariable Long messageId, @RequestParam String userId) {
//        ChatMessage message = chatMessageRepository.findById(messageId).orElse(null);
//
//        if (message == null) {
//            return ResponseEntity.notFound().build();
//        }
//
//        if (!message.getSender().equals(userId)) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
//        }
//
//        chatMessageRepository.delete(message);
//        return ResponseEntity.noContent().build();
//    }
//}
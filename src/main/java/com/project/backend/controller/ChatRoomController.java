package com.project.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.backend.dto.ChatRoom;
import com.project.backend.entity.ChatMessage;
import com.project.backend.repository.ChatMessageRepository;
import com.project.backend.repository.ChatRoomRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
//@CrossOrigin(origins = "http://localhost:3000") // 허용할 오리진을 지정
public class ChatRoomController {

//service로 변경
 private final ChatRoomRepository chatRoomRepository;
 private final ChatMessageRepository chatMessageRepository;
 
 // 채팅 리스트 화면
 @GetMapping("/room")
 public String rooms(Model model) {
     return "/chat/room";
 }
 // 모든 채팅방 목록 반환
 @GetMapping("/rooms")
 @ResponseBody
 public List<ChatRoom> room() {
     return chatRoomRepository.findAllRoom();
 }
 
 // 채팅방 생성
 @PostMapping("/room")
 @ResponseBody
 public ChatRoom createRoom(@RequestParam String name) {
     return chatRoomRepository.createChatRoom(name);
 }

 //채팅방 삭제 
 @DeleteMapping("/room/{roomId}")
 public ResponseEntity<Void> deleteChatroom(@PathVariable String roomId) {
     chatRoomRepository.deleteChatRoom(roomId);
     return ResponseEntity.noContent().build();
}
 
 
 // 채팅방 입장 화면
 @GetMapping("/room/enter/{roomId}")
 public String sendMessage(Model model, @PathVariable Long roomId) {
     model.addAttribute("roomId", roomId);
     return "/chat/message";
 }
 
 //채팅방 나가기 
 @DeleteMapping("/room/{roomId}/leave")
 public ResponseEntity<Void> leaveRoom(@PathVariable String roomId,
                                       @RequestParam String userId) {
     chatRoomRepository.leaveChatRoom(roomId, userId);
     return ResponseEntity.noContent().build();
 }
 

 // 특정 채팅방 조회
 @GetMapping("/room/{roomId}")
 @ResponseBody
 public ChatRoom roomInfo(@PathVariable String roomId) {
     return chatRoomRepository.findRoomById(roomId);
 }

 @GetMapping("/room/{roomId}/messages")
 @ResponseBody
 public List<ChatMessage> getMessages(@PathVariable String roomId) {
     return chatMessageRepository.findByRoomIdOrderByTimestampDesc(roomId);
 }
 
// @DeleteMapping("/message/{messageId}")
// public ResponseEntity<Void> deleteMessage(@PathVariable Long messageId, @RequestParam String userId) {
//     ChatMessage message = chatMessageRepository.findById(messageId).orElse(null);
//
//     if (message == null) {
//         return ResponseEntity.notFound().build();
//     }
//
//     if (!message.getSender().equals(userId)) {
//         return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
//     }
//
//     chatMessageRepository.delete(message);
//     return ResponseEntity.noContent().build();
// }

}

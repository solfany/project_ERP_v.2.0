package com.project.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.util.JwtTokenUtil;

@RestController
@RequestMapping("/api")
public class SomeController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping("/protected-data")
    public ResponseEntity<String> protectedData(@RequestHeader("Authorization") String tokenHeader) {
        String token = tokenHeader.replace("Bearer ", "");
        if (jwtTokenUtil.validateToken(token)) {
            // 토큰이 유효한 경우 처리
            // Staff 정보 활용 가능
            return ResponseEntity.ok("Protected data!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
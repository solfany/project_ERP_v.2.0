package com.project.backend.controller;



//기존 사용하던 코드
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.dto.LoginDto;
import com.project.backend.service.StaffService;


@RestController
@RequestMapping("/api")
public class LoginController {

    private final StaffService staffService;

    @Autowired
    public LoginController(StaffService staffService) {
        this.staffService = staffService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
//        String empId = loginDto.getUsername();
        String empId = loginDto.getEmpId();
//        String empPwd = loginDto.getPassword();
        String empPwd = loginDto.getEmpPwd();

        boolean isAuthenticated = staffService.authenticate(empId, empPwd);

        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}

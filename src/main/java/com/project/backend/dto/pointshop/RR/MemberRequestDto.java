//package com.project.backend.dto.pointshop.RR;
//
//import com.project.backend.constant.Role;
//import com.project.backend.entity.pointshop.Member;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//
//@Getter
//@AllArgsConstructor
//@NoArgsConstructor
//public class MemberRequestDto {
//
//    private String email;
//    private String password;
//
//    public Member toMember(PasswordEncoder passwordEncoder) {
//        return Member.builder()
//                .email(email)
//                .password(passwordEncoder.encode(password))
//                .role(Role.USER)
//                .build();
//    }
//
//    public UsernamePasswordAuthenticationToken toAuthentication() {
//        return new UsernamePasswordAuthenticationToken(email, password);
//    }
//}
//package com.project.backend.service;
//
//import static org.junit.jupiter.api.Assertions.assertTrue;
//import static org.mockito.Mockito.mock;
//import static org.mockito.Mockito.when;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import com.project.backend.entity.Staff;
//import com.project.backend.repository.StaffRepository;
//
//@SpringBootTest
//class CustomUserDetailsServiceTest {
//
//    private StaffService staffService; // StaffService 모의 객체로 변경
//    private PasswordEncoder passwordEncoder;
//    private CustomUserDetailsService userDetailsService;
//
//    @BeforeEach
//    void setUp() {
//        staffService = mock(StaffService.class); // StaffService 모의 객체 생성
//        passwordEncoder = mock(PasswordEncoder.class);
//        userDetailsService = new CustomUserDetailsService(staffService, passwordEncoder); // 모의 객체 주입
//    }
//
//    @Test
//    void testLogin() {
//        String username = "john_doe";
//        String plainPassword = "1234"; // 테스트에 사용할 비밀번호
//
//        // 가짜 Staff 객체 생성
//        Staff staff = new Staff();
//        staff.setEmpId(username);
////        staff.setEmpPwd("$2a$10$K9/Gf0O.f2M8r0KDd5EbL.fh6iFkzq.zlVBHHOuKr8eDlXCCs.nB2");
//        staff.setEmpPwd("1234");
//        // staffService의 동작 정의
//        when(staffService.getStaffByUsername(username)).thenReturn(staff);
//        when(passwordEncoder.encode(plainPassword)).thenReturn("$2a$10$K9/Gf0O.f2M8r0KDd5EbL.fh6iFkzq.zlVBHHOuKr8eDlXCCs.nB2");
//        when(passwordEncoder.matches(plainPassword, staff.getEmpPwd())).thenReturn(true);
//
//        // userDetailsService를 사용하여 UserDetails 가져오기
//        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//
//        // 비밀번호 매칭 확인
//        assertTrue(passwordEncoder.matches(plainPassword, userDetails.getPassword()));
//    }
//}
//package com.project.backend.service;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertTrue;
//import static org.mockito.Mockito.mock;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.project.backend.dto.StaffDto;
//import com.project.backend.entity.Staff;
//import com.project.backend.repository.StaffRepository;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//@Transactional
//@TestPropertySource(locations = "classpath:application-test.properties")
//class StaffServiceTest {
//
//    @Autowired
//    private StaffRepository staffRepository;
//
//    private StaffService staffService;
//    private PasswordEncoder passwordEncoder;
//
//    @BeforeEach
//    public void setUp() {
//        passwordEncoder = mock(PasswordEncoder.class);
//        staffService = new StaffService(staffRepository, passwordEncoder);
//    }
//
//    @Test
//    @DisplayName("스태프 등록 테스트")
//    public void testRegisterStaff() {
//    	StaffDto staffDto = new StaffDto();
//        staffDto.setEmpNum("E12345");
//        staffDto.setEmpId("john_doe");
//        staffDto.setEmpPwd("1234"); // 실제로 사용되는 비밀번호와 일치하도록 수정
//        staffDto.setDept("IT");
//        staffDto.setPosition("Engineer");
//        staffDto.setEmpName("John Doe");
//        staffDto.setBirthDate("1990-01-01");
//        staffDto.setPhoneNumber("123-456-7890");
//        staffDto.setAddress("123 Main St, City");
//        staffDto.setEmail("john@example.com");
//        staffDto.setBankName("Sample Bank");
//        staffDto.setAccountNumber("1234567890");
//    }
//
//}
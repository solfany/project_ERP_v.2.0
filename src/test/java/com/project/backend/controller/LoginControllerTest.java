//package com.project.backend.controller;
//
//
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.project.backend.dto.StaffDto;
//import com.project.backend.entity.Staff;
//import com.project.backend.service.StaffService;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//@Transactional
//@TestPropertySource(locations="classpath:application-test.properties")
//class LoginControllerTest {
//	
//	@Autowired
//	private StaffService staffService;
//	
//	@Autowired
//	private MockMvc mockMvc;
//	
//	@Autowired
//	PasswordEncoder passwordEncoder;
//	
//	public Staff createStaff(String empId, String empPwd) {
//		StaffDto staffFormDto = new StaffDto();
//		staffFormDto.setEmpId("a123");
//		staffFormDto.setEmpPwd("1234");
//		staffFormDto.setDept("부서");
//		staffFormDto.setPosition("직급");
//		staffFormDto.setEmpName("홍길동");
//		staffFormDto.setBirthDate("날짜");
//		staffFormDto.setPhoneNumber("연락처");
//		staffFormDto.setAddress("주소");
//		staffFormDto.setEmail("이메일");
//		staffFormDto.setBankName("은행");
//		staffFormDto.setAccountNumber("계좌");
//		Staff staff = Staff.createStaff(staffFormDto);
//		staffService.saveStaff(staff);
//		return staff;
//		
//}
//	  @Test
//	    @DisplayName("로그인 성공 테스트")
//	    public void loginSuccessTest() throws Exception {
//	        String empId = "kim";
//	        String empPwd = "1234";
//	        this.createStaff(empId, empPwd);
//
//	        mockMvc.perform(MockMvcRequestBuilders.post("/staff") // 로그인 처리 URL
//	                .param("empId", empId)
//	                .param("empPwd", empPwd))
//	                .andExpect(MockMvcResultMatchers.status().is3xxRedirection()); // 로그인 성공 시 리다이렉션
//	    }
//
//	    @Test
//	    @DisplayName("로그인 실패 테스트")
//	    public void loginFailTest() throws Exception {
//	        String empId = "kim";
//	        String empPwd = "1234";
//	        this.createStaff(empId, empPwd);
//
//	        mockMvc.perform(MockMvcRequestBuilders.post("/staff") // 로그인 처리 URL
//	                .param("empId", empId)
//	                .param("empPwd", "wrongPassword"))
//	                .andExpect(MockMvcResultMatchers.status().is3xxRedirection()); // 로그인 실패 시 리다이렉션
//	    }
//	
//}

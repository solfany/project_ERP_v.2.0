package com.project.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.dto.StaffDto;
import com.project.backend.entity.Staff;
import com.project.backend.service.StaffService;

@RestController
@RequestMapping("/api")
public class StaffController {

	private final StaffService staffService;

	private final PasswordEncoder passwordEncoder;

	@Autowired
	public StaffController(StaffService staffService, PasswordEncoder passwordEncoder) {
		this.staffService = staffService;
		this.passwordEncoder = passwordEncoder;
	}

	@PostMapping("/register")
	public ResponseEntity<String> registerStaff(@RequestBody StaffDto staffDto) {
		Staff registeredStaff = staffService.registerStaff(staffDto);

		if (registeredStaff != null) {
			return ResponseEntity.ok("Staff registered successfully");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register staff");
		}
	}

	@GetMapping("/staff")
	public List<Staff> getAllStaffs() {
		return staffService.getAllStaffs();
	}

	@PostMapping("/staff")
	public Staff saveStaff(@RequestBody StaffDto staffDto) {
		// StaffDto를 Staff 엔티티로 변환하여 저장하는 로직
		// staffService.saveStaff()를 호출하여 Staff를 저장하고 반환
		Staff staff = new Staff();
		staff.setEmpNum(staffDto.getEmpNum());
		staff.setEmpId(staffDto.getEmpId());
		staff.setEmpPwd(passwordEncoder.encode(staffDto.getEmpPwd()));
		staff.setDept(staffDto.getDept());
		staff.setPosition(staffDto.getPosition());
		staff.setEmpName(staffDto.getEmpName());
		staff.setBirthDate(staffDto.getBirthDate());
		staff.setPhoneNumber(staffDto.getPhoneNumber());
		staff.setAddress(staffDto.getAddress());
		staff.setEmail(staffDto.getEmail());
		staff.setBankName(staffDto.getBankName());
		staff.setAccountNumber(staffDto.getAccountNumber());

		return staffService.saveStaff(staff);
	}

	@DeleteMapping("/staff/{empNum}")
	public ResponseEntity<?> deleteStaff(@PathVariable Long empNum) {
		// staffService.deleteStaffById()를 호출하여 주어진 id에 해당하는 Staff 삭제
		// 삭제가 성공적으로 이루어지면 HttpStatus.OK 반환
		// 삭제 과정에서 예외 발생 시 HttpStatus.INTERNAL_SERVER_ERROR 반환
		try {
			staffService.deleteStaffById(empNum);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}

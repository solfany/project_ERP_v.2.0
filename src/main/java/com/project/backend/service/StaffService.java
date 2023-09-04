package com.project.backend.service;

//import com.project.backend.dto.StaffDto;
//import com.project.backend.entity.Staff;
//
//import java.util.List;
//
//public interface StaffService {
//    Staff findByToken(String token);
//    Staff registerStaff(StaffDto staffDto);
//    boolean authenticate(String empId, String empPwd);
//    List<Staff> getAllStaffs();
//    Staff saveStaff(Staff staff);
//    void deleteStaffById(Long empNum);
//}

//기존코드
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.backend.dto.StaffDto;
import com.project.backend.entity.Staff;
import com.project.backend.repository.StaffRepository;

@Transactional // 데이터 영속성과 일관성을 유지하기 위해 사용
@Service
public class StaffService {

	@Autowired
	private StaffRepository staffRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	public StaffService(StaffRepository staffRepository, PasswordEncoder passwordEncoder) {
		this.staffRepository = staffRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public Staff registerStaff(StaffDto staffDto) {
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

		// 비밀번호 암호화 후 저장
		String encodedPwd = passwordEncoder.encode(staffDto.getEmpPwd());
		staff.setEncodedEmpPwd(encodedPwd);

		return staffRepository.save(staff);
	}

	public Optional<Staff> findByUsername(String empId) {
		return staffRepository.findByEmpId(empId);
	}

	public Optional<Staff> findByIdPw(String empId) {
		return staffRepository.findByEmpId(empId);
	}

	public Optional<Staff> findOneWithAuthoritiesByUsername(String empId) {
		return staffRepository.findOneWithAuthoritiesByEmpId(empId);
	}

	public List<Staff> getAllStaffs() {
		return staffRepository.findAll();
	}

	public Staff saveStaff(Staff staff) {
		staff.setEmpPwd(passwordEncoder.encode(staff.getEmpPwd()));
		staff.setEmpPwd(staff.getEmpPwd());
		return staffRepository.save(staff);
	}

	public void deleteStaffById(Long empNum) {
		staffRepository.deleteById(empNum);
	}
}

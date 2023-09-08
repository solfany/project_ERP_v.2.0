package com.project.backend.service;

import com.project.backend.dto.StaffDto;
import com.project.backend.entity.Staff;
import com.project.backend.entity.timeManagementSystem.TimeManagementSystem;
import com.project.backend.repository.StaffRepository;
import com.project.backend.repository.TimeManagementRepository;
import com.project.backend.service.timemanagement.TimeManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional // 데이터 영속성과 일관성을 유지하기 위해 사용
@Service
public class StaffService {

  @Autowired
  private StaffRepository staffRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private TimeManagementRepository timeManagementRepository;

  @Autowired
  private TimeManagementService timeManagementService;

  @Autowired
  public StaffService(StaffRepository staffRepository, PasswordEncoder passwordEncoder, TimeManagementRepository timeManagementRepository) {
    this.staffRepository = staffRepository;
    this.passwordEncoder = passwordEncoder;
    this.timeManagementRepository = timeManagementRepository;
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
    staff.setEncodedEmpPwd(staff.getEmpPwd());

    Staff savedStaff = staffRepository.save(staff);

    // TimeManagementSystem 객체를 생성 및 저장
    timeManagementService.createTimeManagementEntity(savedStaff);

    return savedStaff;
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
    return staffRepository.save(staff);
  }

  public void deleteStaffById(Long empNum) {
    staffRepository.deleteById(empNum);
  }


//	public void deleteStaffById(Long empNum) {
//		staffRepository.deleteById(empNum);
//	}
//	//정원 작성
//	// empNum을 사용하여 Staff 엔티티 조회
//    public Staff getStaffByEmpNum(Long empNum) {
//        Optional<Staff> staffOptional = staffRepository.findById(empNum);
//        if (staffOptional.isPresent()) {
//            return staffOptional.get();
//        } else {
//            // Staff 엔티티가 없을 경우 예외 처리 또는 기본값 반환
//            // 예를 들어, 여기서는 null을 반환합니다. 상황에 맞게 처리하세요.
//            return null;
//        }
//    }

}

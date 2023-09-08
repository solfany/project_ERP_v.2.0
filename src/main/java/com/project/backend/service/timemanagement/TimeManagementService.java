package com.project.backend.service.timemanagement;

import com.project.backend.entity.Staff;
import com.project.backend.entity.timeManagementSystem.TimeManagementSystem;
import com.project.backend.repository.StaffRepository;
import com.project.backend.repository.TimeManagementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TimeManagementService {

  private final TimeManagementRepository timeManagementRepository;

  @Autowired
  private StaffRepository staffRepository;

  public TimeManagementService(TimeManagementRepository timeManagementRepository) {
    this.timeManagementRepository = timeManagementRepository;
  }

  public void createTimeManagementEntity(Staff staff) {
    TimeManagementSystem timeManagementSystem = new TimeManagementSystem();

    // TimeManagementSystem에 Staff 객체를 연결
    timeManagementSystem.setStaff(staff);

    timeManagementSystem.setEmpNum(staff.getEmpNum());
    timeManagementSystem.setEmpId(staff.getEmpId());
    timeManagementSystem.setPosition(staff.getPosition());
    timeManagementSystem.setEmpName(staff.getEmpName());
    timeManagementSystem.setBirthDate(staff.getBirthDate());
    timeManagementSystem.setPhoneNumber(staff.getPhoneNumber());
    timeManagementSystem.setAddress(staff.getAddress());
    timeManagementSystem.setEmail(staff.getEmail());
    timeManagementSystem.setDept(staff.getDept());

    timeManagementRepository.save(timeManagementSystem);
  }

  public void deleteStaffAndTimeManagementSystem(Long empNum) {
    Staff staff = staffRepository.findById(empNum).orElse(null);
    if (staff != null) {
      timeManagementRepository.deleteByStaff(staff);
      staffRepository.deleteById(empNum);
    }
  }
  public void deleteByStaff(Staff staff) {
    timeManagementRepository.deleteByStaff(staff);
  }


  // 모든 TimeManagementSystem 데이터를 가져옵니다.
  public List<TimeManagementSystem> findAll() {
    return timeManagementRepository.findAll();
  }

  // 특정 ID에 해당하는 TimeManagementSystem 데이터를 가져옵니다.
  public Optional<TimeManagementSystem> findById(Long id) {
    return timeManagementRepository.findById(id);
  }

  // TimeManagementSystem 데이터를 저장합니다.
  public TimeManagementSystem save(TimeManagementSystem timeManagementSystem) {
    return timeManagementRepository.save(timeManagementSystem);
  }

  // 특정 ID의 TimeManagementSystem 데이터를 삭제합니다.
  public void deleteById(Long id) {
    timeManagementRepository.deleteById(id);
  }

}

package com.project.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.amazonaws.services.kms.model.NotFoundException;
import com.project.backend.dto.StaffDto;
import com.project.backend.entity.Staff;
import com.project.backend.exception.edit.BadRequestException;
import com.project.backend.repository.StaffRepository;
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

    public Optional<Staff> findByEmpNum(Long empNum) {
        return staffRepository.findById(empNum);
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

    @Transactional
    public Staff updateStaffProfile(Long empNum, StaffDto staffDto) {
        Optional<Staff> optionalStaff = staffRepository.findById(empNum);

        if (optionalStaff.isPresent()) {
            Staff existingStaff = optionalStaff.get();

            // 이름과 생년월일은 수정할 수 없도록 제어합니다.
            // 이름과 생년월일을 수정하려면 별도의 엔드포인트나 권한이 필요할 수 있습니다.
            existingStaff.setPhoneNumber(staffDto.getPhoneNumber());
            existingStaff.setAddress(staffDto.getAddress());
            existingStaff.setEmail(staffDto.getEmail());
            existingStaff.setBankName(staffDto.getBankName());
            existingStaff.setAccountNumber(staffDto.getAccountNumber());

         // 수정된 정보를 저장 (영속성 컨텍스트에서 데이터베이스에 반영)
            staffRepository.flush(); // 데이터베이스에 변경 사항 즉시 반영

            return existingStaff; // 수정된 엔티티를 반환
        } else {
            throw new NotFoundException("Staff not found");
        }
    }

    public Staff updateStaffPassword(Long empNum, String currentPassword, String newPassword) {
        Optional<Staff> optionalStaff = staffRepository.findById(empNum);

        if (optionalStaff.isPresent()) {
            Staff existingStaff = optionalStaff.get();

            // 현재 비밀번호가 일치하는지 확인
            if (passwordEncoder.matches(currentPassword, existingStaff.getEmpPwd())) {
                // 새 비밀번호를 암호화하여 저장
                existingStaff.setEmpPwd(passwordEncoder.encode(newPassword));
                return staffRepository.save(existingStaff);
            } else {
                throw new BadRequestException("Current password is incorrect");
            }
        } else {
            throw new NotFoundException("Staff not found");
        }
    }
}

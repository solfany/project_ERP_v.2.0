package com.project.backend.service;

import com.project.backend.entity.AttendanceRecord;
import com.project.backend.entity.Staff;
import com.project.backend.repository.AttendanceRecordRepository;
import com.project.backend.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRecordRepository attendanceRecordRepository;
    private final StaffRepository staffRepository;

    public List<AttendanceRecord> getAttendanceRecordsForStaff(Staff staff) {
        Long empNum = staff.getEmpNum();
        return attendanceRecordRepository.findByStaff_EmpNum(empNum);
    }

    public Map<String, String> recordAttendance(Map<String, Object> requestBody) {
        Map<String, String> response = new HashMap<>();

        try {
            Map<String, Object> staffInfo = (Map<String, Object>) requestBody.get("staffInfo");
            String attendanceType = (String) requestBody.get("attendanceType");
            String attendanceStr = (String) requestBody.get("attendanceStr");

            String[] parts = attendanceStr.split("T");
            String attendanceDate = parts[0];
            String attendanceTime = parts[1].replace("Z", "");

            Long empNum = ((Integer) staffInfo.get("empNum")).longValue();

            Staff staff = staffRepository.findById(empNum).orElse(null);

            if (staff != null) {
                List<AttendanceRecord> existingRecords = attendanceRecordRepository.findByStaffAndAttendanceDate(
                        staff, attendanceDate
                );

                if (existingRecords.isEmpty()) {
                    AttendanceRecord attendanceRecord = new AttendanceRecord();
                    attendanceRecord.setStaff(staff);
                    attendanceRecord.setAttendanceType(attendanceType);
                    attendanceRecord.setAttendanceDate(attendanceDate);
                    attendanceRecord.setAttendanceTime(attendanceTime);

                    attendanceRecordRepository.save(attendanceRecord);

                    response.put("message", "출근 기록이 완료되었습니다.");
                    response.put("attendanceType", attendanceType);

                } else {
                    response.put("message", "이미 출근 기록이 존재합니다.");
                }

            } else {
                response.put("message", "대상을 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            response.put("message", "출근 기록 도중 에러가 발생했습니다. " + e.getMessage());
        }

        return response;
    }
}
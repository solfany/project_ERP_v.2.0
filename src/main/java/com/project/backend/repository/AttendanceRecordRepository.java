package com.project.backend.repository;

import com.project.backend.entity.AttendanceRecord;
import com.project.backend.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRecordRepository extends JpaRepository<AttendanceRecord, Long> {
    List<AttendanceRecord> findByStaff_EmpNum(Long empNum);
    List<AttendanceRecord> findByStaffAndAttendanceDate(Staff staff, String attendanceDate);
}

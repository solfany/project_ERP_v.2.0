package com.project.backend.controller;

import com.project.backend.entity.AttendanceRecord;
import com.project.backend.entity.Staff;
import com.project.backend.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/records")
    public List<AttendanceRecord> getAttendanceRecordsForStaff(@RequestBody Staff staff) {
        return attendanceService.getAttendanceRecordsForStaff(staff);
    }

    @PostMapping("/new")
    public Map<String, String> recordAttendance(@RequestBody Map<String, Object> requestBody) {
        return attendanceService.recordAttendance(requestBody);
    }
}
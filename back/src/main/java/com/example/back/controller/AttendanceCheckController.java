package com.project.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/attendance")
public class AttendanceCheckController {


    private static final Logger log = LoggerFactory.getLogger(AttendanceCheckController.class);

    private final AttendanceService attendanceService;

    @Autowired
    public AttendanceCheckController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @Operation(summary = "출근 내역 등록 요청", description = "출근 내역 등록이 진행됩니다.", tags = {"AttendanceController"})
    @PostMapping(value = "/insertAttendance")
    public ResponseEntity<ResponseDTO> insertAtt(@RequestBody MemberDTO memberDTO, AttendanceDTO attendanceDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "출근 내역 생성 성공", attendanceService.insertAtt(attendanceDTO, memberDTO)));
    }

    @Operation(summary = "퇴근 시간 요청", description = "해당 사원 퇴근 시간 업데이트가 진행됩니다.", tags = {"AttendanceController"})
    @PutMapping("/updateOffTime")
    public ResponseEntity<ResponseDTO> updateOffTime(@RequestBody AttendanceAndMemberDTO attendanceAndMemberDTO, MemberDTO memberDTO) {

        return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "퇴근 시간 업데이트 성공", attendanceService.updateOffTime(attendanceAndMemberDTO, memberDTO)));
    }
}

package com.project.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.miracle.project.common.Criteria;
import com.miracle.project.common.PageDTO;
import com.miracle.project.common.PagingResponseDTO;
import com.miracle.project.common.ResponseDTO;
import com.miracle.project.hrTeam2.attendance.dto.AttendanceAndMemberDTO;
import com.miracle.project.hrTeam2.attendance.dto.AttendanceDTO;
import com.miracle.project.hrTeam2.attendance.service.AttendanceService;
import com.miracle.project.member.dto.MemberDTO;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/hr-team2")
public class AttendanceListController {

	
	private static final Logger log = LoggerFactory.getLogger(AttendanceListController.class);

	private final AttendanceService attendanceService;
	
	@Autowired
	public AttendanceListController(AttendanceService attendanceService) {
		this.attendanceService = attendanceService;
	}
	
	@Operation(summary = "회원별 리스트 조회 요청", description = "회원의 근태 리스트 요청", tags = { "AttendanceController"})
	@GetMapping("/attendance")
	public ResponseEntity<ResponseDTO> selectMemberAttListWithPaging(
		@RequestParam(name = "offset", defaultValue = "1") String offset){
			
		int total = attendanceService.selectMemberAttList();
		
		Criteria cri = new Criteria(Integer.valueOf(offset), 10);
		PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();
        pagingResponseDTO.setData(attendanceService.selectMemberAttListWithPaging(cri));
        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));
		
	}
	
	@Operation(summary = "출근 내역 등록 요청", description = "출근 내역 등록이 진행됩니다.", tags = { "AttendanceController" })
	@PostMapping(value = "/insertAttendance")
	public ResponseEntity<ResponseDTO> insertAtt(@RequestBody MemberDTO memberDTO, AttendanceDTO attendanceDTO) {
		
    	return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "출근 내역 생성 성공",  attendanceService.insertAtt(attendanceDTO, memberDTO)));
	}
	
	@Operation(summary = "퇴근 시간 요청", description = "해당 사원 퇴근 시간 업데이트가 진행됩니다." , tags = {"AttendanceController"})
	@PutMapping("/updateOffTime")
	public ResponseEntity<ResponseDTO> updateOffTime(@RequestBody AttendanceAndMemberDTO attendanceAndMemberDTO, MemberDTO memberDTO) {
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "퇴근 시간 업데이트 성공",  attendanceService.updateOffTime(attendanceAndMemberDTO, memberDTO)));
	} 
}

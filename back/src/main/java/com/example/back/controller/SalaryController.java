package com.project.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
import com.miracle.project.hrTeam2.salary.dto.SalaryAndMemberDTO;
import com.miracle.project.hrTeam2.salary.dto.SalaryDTO;
import com.miracle.project.hrTeam2.salary.service.SalaryService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/hr-team2")
public class SalaryController {
	
	
	private static final Logger log = LoggerFactory.getLogger(SalaryController.class);

	private final SalaryService salaryService;
	
	@Autowired
	public SalaryController(SalaryService salaryService) {
		this.salaryService = salaryService;
	}
	
	@Operation(summary = "회원별 리스트 조회 요청", description = "회원들의 급여 내역 요청", tags = { "SalaryController" })
	@GetMapping("/salary")
	public ResponseEntity<ResponseDTO> selectMemberListWithPaging(
		@RequestParam(name = "offset", defaultValue = "1") String offset){
			
		int total = salaryService.selectMemberList();
		
		Criteria cri = new Criteria(Integer.valueOf(offset), 10);
		PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();
        pagingResponseDTO.setData(salaryService.selectMemberListWithPaging(cri));
        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));
		
	}
	
	@Operation(summary = "회원 리스트 조회 요청", description = "회원의 정보 요청", tags = { "SalaryController"})
	@GetMapping("/member")
	public ResponseEntity<ResponseDTO> selectMemberInfoListWithPaging(
		@RequestParam(name = "offset", defaultValue = "1") String offset){
			
		int total = salaryService.selectMemberList();
		
		Criteria cri = new Criteria(Integer.valueOf(offset), 10);
		PagingResponseDTO pagingResponseDTO = new PagingResponseDTO();
        pagingResponseDTO.setData(salaryService.selectMemberInfoListWithPaging(cri));
        pagingResponseDTO.setPageInfo(new PageDTO(cri, total));
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "조회 성공", pagingResponseDTO));
		
	}
	
	@Operation(summary = "급여 수정 요청", description = "해당 사원 급여 수정이 진행됩니다.", tags = { "SalaryController" })
	@PutMapping("/updateSalary")
	public ResponseEntity<ResponseDTO> updateSalary(@RequestBody SalaryAndMemberDTO salaryAndMemberDTO) {
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "급여 수정 성공",  salaryService.updateSalary(salaryAndMemberDTO)));
	}
	
	@Operation(summary = "급여 상세 조회 요청", description = "멤버의 급여 상세 페이지 처리가 진행됩니다.", tags = { "SalaryController"})
	@GetMapping("/salary-detail/{salNo}")
	public ResponseEntity<ResponseDTO> selectSalaryDetail(@PathVariable int salNo) {
		
		return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "멤버 급여 상세정보 조회 성공", salaryService.selectSalaryDetail(salNo)));
	}
	
	@Operation(summary = "급여 지급 내역 등록 요청", description = "해당 내역 등록이 진행됩니다.", tags = { "SalaryController"})
	@PostMapping(value = "/salarys")
	public ResponseEntity<ResponseDTO> insertSalary(@RequestBody SalaryDTO salaryDTO) {
    	
    	return ResponseEntity.ok().body(new ResponseDTO(HttpStatus.OK, "급여 내역 입력 성공",  salaryService.insertSalary(salaryDTO)));
    }
	
}

package com.project.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.miracle.project.common.Criteria;
import com.miracle.project.hrTeam2.salary.dto.SalaryAndMemberDTO;
import com.miracle.project.hrTeam2.salary.dto.SalaryDTO;
import com.miracle.project.hrTeam2.salary.entity.Salary;
import com.miracle.project.hrTeam2.salary.entity.SalaryAndMember;
import com.miracle.project.hrTeam2.salary.repository.SalaryAndMemberRepository;
import com.miracle.project.hrTeam2.salary.repository.SalaryRepository;
import com.miracle.project.member.dto.MemberDTO;
import com.miracle.project.member.entity.Member;
import com.miracle.project.member.repository.MemberRepository;


@Service
public class SalaryService {

	
	private static final Logger log = LoggerFactory.getLogger(SalaryService.class);
	private final SalaryAndMemberRepository salaryAndMemberRepository;
	private final MemberRepository memberRepository;
	private final SalaryRepository salaryRepository;
	private final ModelMapper modelMapper;
	
	@Autowired
	public SalaryService(SalaryAndMemberRepository memberAndSalaryRepository, ModelMapper modelMapper, MemberRepository memberRepository, SalaryRepository salaryRepository) {
	this.salaryAndMemberRepository = memberAndSalaryRepository;
	this.memberRepository = memberRepository;
	this.salaryRepository = salaryRepository;
	this.modelMapper = modelMapper;
	
	}	


	// 급여 리스트 전체 불러오기
	@Transactional
	public int selectMemberList() {
	    log.info("[MemAndSalaryService] selectMemberList Start ==========");
	    List<SalaryAndMember> salaryList = salaryAndMemberRepository.findAll();
	    
	    log.info("[MemAndSalaryService] {} " + salaryList);
	    
	    log.info("[MemAndSalaryService] selectMemberList End ==========");
	    
	    return salaryList.size();
	}
	
	// 리스트 페이징 처리
	public Object selectMemberListWithPaging(Criteria cri) {
		log.info("[SalaryService] selectProductListWithPagingForAdmin Start ===================================");
		int index = cri.getPageNum() - 1;
        int count = cri.getAmount(); 
        Pageable paging = PageRequest.of(index, count, Sort.by("salNo").descending());
	        
        Page<SalaryAndMember> result = salaryAndMemberRepository.findAll(paging);
        List<SalaryAndMember> salaryList = (List<SalaryAndMember>)result.getContent();

        for(int i = 0 ; i < salaryList.size() ; i++) {
        	salaryList.get(i).setSalNo(salaryList.get(i).getSalNo());
        }
        log.info("[SalaryService] selectProductListWithPagingForAdmin End ===================================");
        
		return salaryList.stream().map(salary -> modelMapper.map(salary, SalaryAndMemberDTO.class)).collect(Collectors.toList());
	}
	
	
	// 회원 조회
		@Transactional
		public int selectMemberInfoList() {
		    log.info("[MemAndSalaryService] selectMemberList Start ==========");
		    List<Member> memberList = memberRepository.findAll();
		    
		    System.out.println("member" + memberList);
		    log.info("[MemAndSalaryService] {} " + memberList);
		    
		    log.info("[MemAndSalaryService] selectMemberList End ==========");
		    
//		    return salaryList.stream().map(Salary -> modelMapper.map(Salary, SalaryAndMemberDTO.class)).collect(Collectors.toList());
		    return memberList.size();
		}
		
		public Object selectMemberInfoListWithPaging(Criteria cri) {
			log.info("[SalaryService] selectProductListWithPagingForAdmin Start ===================================");
			int index = cri.getPageNum() - 1;
	        int count = cri.getAmount(); 
	        Pageable paging = PageRequest.of(index, count, Sort.by("memberNo"));
		        
	        Page<Member> result = memberRepository.findAll(paging);
	        List<Member> memberList = (List<Member>)result.getContent();

	        for(int i = 0 ; i < memberList.size() ; i++) {
	        	memberList.get(i).setMemberNo(memberList.get(i).getMemberNo());
	        }
	        log.info("[SalaryService] selectProductListWithPagingForAdmin End ===================================");
	        
			return memberList.stream().map(member -> modelMapper.map(member, MemberDTO.class)).collect(Collectors.toList());
		}
	// 급여 업데이트
	@Transactional
	public Object updateSalary(SalaryAndMemberDTO salaryAndMemberDTO) {
		log.info("[SalaryService] updateSalary Start =====================");
		log.info("[SalaryService] salaryDTO" + salaryAndMemberDTO);
		
		int result = 0;
		
		try {
			
			SalaryAndMember salary = salaryAndMemberRepository.findById(salaryAndMemberDTO.getSalNo()).get();
			
			 // 추가 수당 적용을 위한 기본 급여 불러오기
			 int getBaseSalary = salaryAndMemberDTO.getBaseSalary();
			
			 // 페이지에서 입력 받은 적용할 추가 근무 시간
			 int getOverTime = salaryAndMemberDTO.getOverTimePay();
			 
			 // 페이지에서 입력 받은 적용할 연차 일 수
			 int getVacation = salaryAndMemberDTO.getVacationPay();
			 
			 // DB에 적용할 추가 근무 수당 알고리즘
			 double setOverTimePay = Math.round(getBaseSalary/ 160 * 1.5) * getOverTime;
			 	
			 // DB에 적용할 남은 연차 일 수
			 double setVacationPay = (Math.round(getBaseSalary / 160) * 8) * getVacation;
			 
			 //　지급할　값에　맞게　계산　후　ＤＢ에　저장　　
			 salary.setOverTimePay(setOverTimePay);
			 salary.setVacationPay(setVacationPay);	
		
			result = 1;
	     } catch (Exception e) {
	            log.info("[updateSalary] Exception!!");
	            e.printStackTrace();
	        }
	        log.info("[SalaryService] updateSalary End =====================");
	        return (result > 0) ? "회원 급여 업데이트 성공" : "회원 급여 업데이트 실패";
		}

	// 상세 정보 
	@Transactional
	public Object selectSalaryDetail(int salNo) {
		
		SalaryAndMember salaryAndMember = salaryAndMemberRepository.findById(salNo).get();
	
		return modelMapper.map(salaryAndMember, SalaryAndMember.class);
		
	}
	
	// 인서트
	@Transactional
	public Object insertSalary(SalaryDTO salaryDTO) {
		
		int result = 0;
		
		try {
			
			Salary insertSalary = modelMapper.map(salaryDTO, Salary.class);
	
			salaryRepository.save(insertSalary);
			
			result = 1;
		} catch (Exception e) {
			log.info("[insertSalary] Exception!!");
			throw new RuntimeException(e);
		}
		
		return (result > 0) ? "급여 인서트 성공" : "급여 인서트 실패";
	}
	
}

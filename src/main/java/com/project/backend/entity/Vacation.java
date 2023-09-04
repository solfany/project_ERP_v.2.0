package com.project.backend.entity;
import java.time.LocalDate;

import com.project.backend.dto.VacationDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "vacation")
@Getter
@Setter
public class Vacation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
//    @Column(nullable = false)
//    @OneToOne(fetch = FetchType.LAZY)	//@ONeToOne 어노테이션을 이용해 회원 엔티티와 일대일로 매핑함
//    @JoinColumn(name = "staff_empNum", nullable = false) //@JoinColumn 어노테이션을 이용해 매핑할 외래키를 지정
//    private Long empNum;
    
    @ManyToOne
    @JoinColumn(name = "emp_num", referencedColumnName = "emp_num")
    private Staff staff;
    
    @Column(nullable = false)
    private String empName;
    
    @Column(nullable = false)
    private String dept;
    
    @Column(nullable = false)
    private String position;
    
    @Column(nullable = false)
    private String vacaType;
    
    @Column(nullable = false)
    private LocalDate vacaStart;
    
    @Column(nullable = false)
    private LocalDate vacaEnd;
    
    @Column(nullable = false)
    private String vacaReason;

    @Column(nullable = false)
    private String vacaEtc;
    
//    public void calculateVacaEtc() {
//        // 휴가 종료일 - 휴가 시작일 계산
//        Period period = Period.between(vacaStart, vacaEnd);
//
//        // 휴가 일수를 정수로 가져옴
//        int days = period.getDays();
//
//        // 휴가 일수를 문자열로 변환하여 저장
//        vacaEtc = days + "일";
//    }
   
    
    public static Vacation createTableVacation(VacationDto vacationDto) {
		Vacation vacation = new Vacation();
//		vacation.setEmpNum(vacationDto.getEmpNum()); //사원 번호 - empNum
		vacation.setEmpName(vacationDto.getEmpName()); //이름
		vacation.setDept(vacationDto.getDept());	//부서 - dept
		vacation.setPosition(vacationDto.getPosition()); //직급 - position
		vacation.setVacaType(vacationDto.getVacaType()); //직급 - position
		vacation.setVacaStart(vacationDto.getVacaStart()); //직급 - position
		vacation.setVacaEnd(vacationDto.getVacaEnd()); //직급 - position
		vacation.setVacaReason(vacationDto.getVacaReason()); //직급 - position

//		
//		member.setAddress(MemberDto.getAddress());//주소 - address
//		
//		member.setEmail(MemberDto.getEmail());//이메일 - email
//
//		member.setBankName(MemberDto.getBankName());//은행명 - bankName
//		member.setAccountNumber(MemberDto.getAccountNumber());//계좌번호 - accountNumber
		
		return vacation;
    }
    
}
//import java.util.Date;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.OneToOne;
//import jakarta.persistence.Table;
//import lombok.Getter;
//import lombok.Setter;
//
//@Entity
//@Getter
//@Setter
//@Table(name = "vacation")
//public class Vacation {
//	//Dto인 memberInfo에 대한 회원 정보를 DB로 생성?하는 클래스
//
//	
//	@Id		//pk지정
//    @Column(name="vacation_Id")
//    @GeneratedValue(strategy = GenerationType.AUTO)
//	private Long id;	//vacation의 고유 아이디(pk)
//	
////	@OneToOne(fetch = FetchType.LAZY)	//@ONeToOne 어노테이션을 이용해 회원 엔티티와 일대일로 매핑함
//	//Member 엔티티의 기본키인 "member_id"컬럼과 cart 엔티티의 "member"속성 매핑
////	@JoinColumn(name = "member_empNum") //@JoinColumn 어노테이션을 이용해 매핑할 외래키를 지정
////	private Long empNum; 	//사원 번호(fk) 
//	//	private Member member;	// 솔직히 왜 있는지 모르겟음 왜있냐
////		//사원번호는 내가 입력해서 작성하는것이 아니라 (nullable = false)필요없음
//	
////	@Column(nullable = false)
////	
//	
//	@Column(nullable = false)
//	private String empName;	//이름
//	
//	@Column(nullable = false)
//	private String dept;	//부서
//	
//	@Column(nullable = false)
//	private String position;//직급
//	
//	@Column(nullable = false)
//	private String vacaType;//휴가 종류 - vacationType
//	
////	@Column(nullable = false)
////	private String vacaDay; //휴가 기간 = 휴가 종료일(vacaEnd) - 휴가 시작일(vacaStart)
//	
//	@Column(nullable = false)
//	private Date vacaStart;	//휴가 시작일 - vacaStart
//	
//	@Column(nullable = false)
//	private Date vacaEnd;	//휴가 종료일 - vacaEnd
//	
////	@Column(nullable = false)
////	private int vacaEtc; //휴가 기간을 int형으로 바꿔 일수를 구하는 것
//
//	@Column(nullable = false)
//	private String vacaReason;	//휴가 사유 - vacaReason
//	
//	
//	//createTable 메소드는 데이터베이스의 member 테이블에 대한 엔티티 객체를 생성하기 위해 
//	public static Vacation createVacation(Member member, String vacaType, 
//			String vacaDay, Date vacaStart, Date vacaEnd, int vacaEtc, String vacaReason) {
//		
//		//기존 vacation 타입을 가져오고
//		Vacation vacation = new Vacation();
////		vacation.setEmpNum(member.getEmpNum());
//		vacation.setEmpName(member.getEmpName());
//		vacation.setDept(member.getDept());
//		vacation.setPosition(member.getPosition());
////		vacation.vacaDay= (String.valueOf(
////				(vacaEnd.getTime() - vacaStart.getTime()) / (24 * 60 * 60 * 1000)));
//		
//		//이 부분 맞는지 확인해봐야됨
//		//vacation.vacaDay= vacaStart.getTime() + "~" + vacaEnd.getTime();
//		
//		vacation.vacaStart= vacaStart;
//		vacation.vacaEnd= vacaEnd;
//       // vacation.vacaEtc = ((int)(vacaEnd.getTime() - vacaStart.getTime()) / (24 * 60 * 60 * 1000));
//		vacation.vacaReason= vacaReason;
//		
//		return vacation;
//	}
//	//DTO로부터 필요한 정보를 추출하는 역할
//}



package com.project.backend.entity;
import java.time.LocalDate;

import com.project.backend.dto.VacationDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
	    @Column(name = "vacation_id")
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    private Long id;

	    @ManyToOne(fetch = FetchType.EAGER)
	    @JoinColumn(name = "emp_num") 
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
	    
	    
	    
//	    SELECT
//	    *
//	FROM
//	    Staff s
//	INNER JOIN
//	    Vacation v ON s.emp_num = v.emp_num;
    

    public static Vacation createTableVacation(VacationDto vacationDto, Long empNum) {
    	 Vacation vacation = new Vacation();
//    	 vacation.setVacationEmpNum(vacationDto.getEmpNum()); //이름
//    	 vacation.setEmpNum(empNum);
//    	 vacation.setVacationEmpNum(empNum);
    	 vacation.setDept(vacationDto.getDept());
 		vacation.setDept(vacationDto.getDept());	//부서 - dept
		vacation.setEmpName(vacationDto.getEmpName()); //이름
		vacation.setDept(vacationDto.getDept());	//부서 - dept
		vacation.setPosition(vacationDto.getPosition()); //직급 - position
		vacation.setVacaType(vacationDto.getVacaType()); //직급 - position
		vacation.setVacaStart(vacationDto.getVacaStart()); //직급 - position
		vacation.setVacaEnd(vacationDto.getVacaEnd()); //직급 - position
		vacation.setVacaReason(vacationDto.getVacaReason()); //직급 - position
		
		
		
		return vacation;
    }
    
}



//package com.project.backend.entity;
//
//import java.time.LocalDate;
//
//
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.project.backend.dto.VacationDto;
//import com.project.backend.repository.VacationRepository;
//
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.PersistenceContext;
//
//@SpringBootTest
//@Transactional
//@TestPropertySource(locations = "classpath:application-test.properties")
//public class VacationEntityTest {
//	@Autowired
//	VacationRepository vacationRepository;
//
//	@PersistenceContext
//	//엔티티 매니저를 활용하여 엔티티 조작 및 검증을 수행
//	EntityManager em;
//	
//	public Vacation createVacation() {
//		VacationDto vacationDto = new VacationDto();
//		vacationDto.setEmpName("조정원");
//		vacationDto.setDept("개발팀"); //아직 테이블 생성전 nm없음?
//		vacationDto.setPosition("사원");
//		vacationDto.setVacaType("특별 휴가");
//		vacationDto.setVacaStart(LocalDate.now());
//		vacationDto.setVacaEnd(LocalDate.now());
//		vacationDto.setVacaReason("사유");
//		return Vacation.createTableVacation(vacationDto);
//		//이거 createTable은 member entity에서의 메소드 명이니까 바꿀꺼임
//		
//	}
//	@Test
//    @DisplayName("제작 테스트")
//    public void createVacationTest() {
//        Vacation vacation = createVacation();
//        vacationRepository.save(vacation);
//        
//        em.flush();
//        em.clear();
//	}
//	
//	@Test
//	@DisplayName("삭제 테스트")
//	public void deleteVacationTest() {
//	    // 휴가 생성
//	    Vacation vacation = createVacation();
//	    vacationRepository.save(vacation);
//
//	    // 생성한 휴가의 ID를 가져옴
//	    Long vacationId = vacation.getId();
//
//	    // 휴가 삭제
//	    //->repository에서 id값을 찾아 jpa에서 제공해주는 deleteById메소드 활용해 삭제 
//	    vacationRepository.deleteById(vacationId);
//
//	    // 삭제 후에 해당 id로 휴가 조회해보면 null이 나와야 함
//	    Vacation deletedVacation = vacationRepository.findById(vacationId).orElse(null);
//	    Assertions.assertNull(deletedVacation);
//	    
//	    //entity manager 사용 
//	    em.flush(); //변경 사항을 실제 데이터베이스에 반영
//        em.clear(); //해당 엔티티의 상태를 초기화할 때 사용
//	}
//	
//}
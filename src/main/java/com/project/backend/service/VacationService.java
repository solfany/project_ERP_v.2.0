package com.project.backend.service;


import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.backend.dto.VacationDto;
import com.project.backend.entity.Staff;
import com.project.backend.entity.Vacation;
import com.project.backend.repository.StaffRepository;
import com.project.backend.repository.VacationRepository;

@Service
public class VacationService {
//vacation 휴가 신청에 대한 기능 구현란
    private final VacationRepository vacationRepository;
    private final StaffRepository staffRepository;
    //서비스에 대한 기능을 repository로 담을 수 있게 의존성 주입
    
    @Autowired
    public VacationService(VacationRepository vacationRepository, StaffRepository staffRepository) {
        this.vacationRepository = vacationRepository;
        this.staffRepository = staffRepository;
    }

    //vacationRepository에 담긴 모든 엔티티를 찾아 준다
    public List<Vacation> getAllVacations() {
        return vacationRepository.findAll();
    }

    //이 코드는 VacationDto를 인자로 받아 새로운 휴가(Vacation)를 생성하고 데이터베이스에 저장하는 역할
    public void addVacation(VacationDto vacationDto) {
    	
    	//Staff 엔티티를 찾기 위해 staffRepository.findByEmpNum(vacationDto.getEmpNum())을 호출합니다. 
    	//이 부분은 입력받은 휴가 정보(vacationDto)의 직원 번호(empNum)와 일치하는 직원 정보를 데이터베이스에서 찾습니다
        Staff staff = staffRepository.findByEmpNum(vacationDto.getEmpNum());
//        
//        Staff staff = staffRepository.findByEmpId(vacationDto.getEmpName())
//            .orElseThrow(() -> new NoSuchElementException("Staff not found with empId " + vacationDto.getEmpName()));

       
        //새로운 Vacation 객체(newVacation)를 생성하고, 그 객체의 staff 필드에 방금 찾아낸 직원 정보(staff)를 설정
        Vacation newVacation = new Vacation();
        newVacation.setStaff(staff); // Staff 엔티티를 설정

        // 나머지 필드 설정
        newVacation.setEmpName(vacationDto.getEmpName());
        newVacation.setDept(vacationDto.getDept());
        newVacation.setPosition(vacationDto.getPosition());
        newVacation.setVacaType(vacationDto.getVacaType());
        newVacation.setVacaStart(vacationDto.getVacaStart());
        newVacation.setVacaEnd(vacationDto.getVacaEnd());
        newVacation.setVacaEtc(vacationDto.getVacaEtc());
        newVacation.setVacaReason(vacationDto.getVacaReason());

        //설정된 모든 정보를 가진 새로운 휴가 객체(newVacation)을 데이터베이스에 저장
        vacationRepository.save(newVacation);
    }
    
    //vacationRepository에서 id 값을 찾아 삭제 기능
	public void deleteVacationById(Long id) {
		Vacation vacationToDelete = vacationRepository.findById(id)
	            .orElseThrow(() -> new NoSuchElementException("Vacation with ID " +id + " not found"));

	        vacationRepository.delete(vacationToDelete);
	}
//	 public Long findEmpNumByStaff_EmpNum(Long empNum) {
//	        return vacationRepository.findEmpNumByStaff_EmpNum(empNum);
//	    }
	 
//	 public List<Vacation> getVacationsByStaff(Long empNum) {
//		    return vacationRepository.findByStaffEmpNum(empNum);
//		}

}
//	//빈 객체 생성
//	 private final VacationRepository vacationRepository;
//
//	//의존성 주입
//	@Autowired
//    public VacationService(VacationRepository vacationRepository) {
//        this.vacationRepository = vacationRepository;
//    }
//	
//	
//	public Vacation createVacation(Member member, String vacationType, 
//			String vacaDay, Date vacaStart, Date vacaEnd, int vacationEtc, String vacaReason) {
//		    
//			Vacation vacation = new Vacation();
////			vacation.setEmpNum(member.getEmpNum());
//			vacation.setEmpName(member.getEmpName());
//			vacation.setDept(member.getDept());
//			vacation.setPosition(member.getPosition());
//			vacation.setVacaStart(vacaStart);
//			vacation.setVacaEnd(vacaEnd);
//			vacation.setVacaReason(vacaReason);
//			
//			// Calculate vacationEtc in days (assuming vacationEtc is the number of days)
//			
//			//vacation.setVacaEtc(vacationEtc);
//			
//			// Calculate vacaDay (formatting start and end dates)
//			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//			
//			//vacation.setVacaDay(dateFormat.format(vacaStart) + " ~ " + dateFormat.format(vacaEnd));
//			
//			return vacationRepository.save(vacation);
//		}
//	public Optional<Vacation> getVacationById(Long vacationId) {
//	    return vacationRepository.findById(vacationId);
//	}
//	
//	//업데이트 기능
//	public Vacation updateVacation(Long vacationId, Vacation updatedVacation) {
//		
//		//vacationRepository에서 findById 메서드를 사용하여 주어진 vacationId에 해당하는 휴가 정보를 찾습니다.
//		//Optional<Vacation>을 반환하는데, 이는 휴가 정보가 있을 수도 있고 없을 수도 있다는 의미입니다.
//		//Optional을 사용하는 이유는 해당 ID에 대한 휴가 정보가 없을 수도 있기 때문
//        Optional<Vacation> existingVacationOptional = vacationRepository.findById(vacationId);
//        
//        if (existingVacationOptional.isPresent()) {
//            Vacation existingVacation = existingVacationOptional.get();
//            
//            existingVacation.setVacaStart(updatedVacation.getVacaStart());
//            existingVacation.setVacaEnd(updatedVacation.getVacaEnd());
//            existingVacation.setVacaReason(updatedVacation.getVacaReason());
//            
//            return vacationRepository.save(existingVacation);
//        } else {
//            throw new IllegalArgumentException("Vacation with ID " + vacationId + " not found.");
//        }
//    }
//
//	//삭제 기능
//	public void deleteVacation(Long vacationId) {
//	        vacationRepository.deleteById(vacationId);
//	}

	

	    

	   
	


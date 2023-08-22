package com.project.backend.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.backend.entity.Vacation;
import com.project.backend.repository.VacationRepository;

@Service

public class VacationService {

    private final VacationRepository vacationRepository;

    @Autowired
    public VacationService(VacationRepository vacationRepository) {
        this.vacationRepository = vacationRepository;
    }

    public List<Vacation> getAllVacations() {
        return vacationRepository.findAll();
    }

    public void addVacation(Vacation newVacation) {
        // 여기서 새로운 휴가 신청을 처리하는 로직을 구현
        // newVacation 객체를 이용해 휴가 신청 데이터를 저장하거나 다른 작업을 수행
        vacationRepository.save(newVacation);
    }
    
    //삭제 기능
	public void deleteVacationById(Long id) {
		Vacation vacationToDelete = vacationRepository.findById(id)
	            .orElseThrow(() -> new NoSuchElementException("Vacation with ID " + id + " not found"));

	        vacationRepository.delete(vacationToDelete);
	}
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

	

	    

	   
	


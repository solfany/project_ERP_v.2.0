package com.project.backend.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.dto.VacationDto;
import com.project.backend.entity.Vacation;
import com.project.backend.service.VacationService;

@RestController
@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:3000") // 허용할 오리진을 지정
public class VacationController {
	
	//빈 객체 생성
    private final VacationService vacationService;
    
    //의존성 주입 
    //추가 여기서 스태프에 대한 정보를 가져와야되고
    @Autowired
    public VacationController(VacationService vacationService) {
        this.vacationService = vacationService;
    }
    
    // GET 요청을 처리하는 핸들러 메서드를 추가
    @GetMapping("/vacation")
    public ResponseEntity<List<Vacation>> getAllVacations() {
        List<Vacation> vacations = vacationService.getAllVacations();
        return ResponseEntity.ok(vacations);
    }
    
 // POST 요청을 처리하는 핸들러 메서드를 추가합니다.
    @PostMapping("/vacation")
    public ResponseEntity<String> addVacation(@RequestBody VacationDto vacationDto) {
        try {
            vacationService.addVacation(vacationDto);

            return ResponseEntity.ok("Vacation request added successfully");
        } catch (NoSuchElementException e) {
            // Staff 엔티티를 찾을 수 없는 경우에 대한 처리
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Staff not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add vacation request");
        }
    }
    
    //삭제 컨트롤러 
    @DeleteMapping("/vacation/{id}") // DELETE 메서드와 경로 매핑
    public ResponseEntity<String> deleteVacationById(@PathVariable Long id) { 
    	//@pathvariable을 통해 메소드에서 {id}값을 찾아 삭제 시킴
        try {
            vacationService.deleteVacationById(id);
            return ResponseEntity.ok("Vacation request deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete vacation request");
        }
    }
    
}
//컨트롤러에서 service관련 기능 호출하고 
//service에서는 repository에 담길 수 있도록 함
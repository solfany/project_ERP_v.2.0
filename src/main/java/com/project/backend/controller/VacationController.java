package com.project.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.entity.Vacation;
import com.project.backend.service.VacationService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // 허용할 오리진을 지정
public class VacationController {
	
	//빈 객체 생성
    private final VacationService vacationService;
    
    //의존성 주입 
    @Autowired
    public VacationController(VacationService vacationService) {
        this.vacationService = vacationService;
    }

    @GetMapping("/vacation")
    public List<Vacation> getAllVacations() {
        return vacationService.getAllVacations();
    }

    @PostMapping("/vacation")
    public ResponseEntity<String> addVacation(@RequestBody Vacation newVacation) {
        try {
            vacationService.addVacation(newVacation);
            return ResponseEntity.ok("Vacation request added successfully");
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

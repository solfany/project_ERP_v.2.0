package com.project.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miracle.project.hrTeam2.salary.dto.SalaryDTO;
import com.miracle.project.hrTeam2.salary.entity.Salary;

public interface SalaryRepository extends JpaRepository<Salary, Integer> {

	List<Salary> findBySalNo(int salNo);

	void save(SalaryDTO salaryDTO);
	
}

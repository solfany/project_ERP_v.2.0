package com.project.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.miracle.project.hrTeam2.salary.entity.SalaryAndMember;

@Repository
public interface SalaryAndMemberRepository extends JpaRepository<SalaryAndMember, Integer>{

	List<SalaryAndMember> findAll();
	
//	List<SalaryAndMember> findBySalNo(int salNo);
	
//	Page<SalaryAndMember> findBySalNo(String status, Pageable paging);
	
}

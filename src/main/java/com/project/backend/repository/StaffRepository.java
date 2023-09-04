package com.project.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.backend.entity.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long> {
	public Optional<Staff> findByEmpId(String empId);

	public Staff findByEmpNum(Long empNum);

	@EntityGraph(attributePaths = "authorities")
	Optional<Staff> findOneWithAuthoritiesByEmpId(String empId);

}

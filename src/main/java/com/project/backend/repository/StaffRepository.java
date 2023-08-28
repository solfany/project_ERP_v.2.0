package com.project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.backend.entity.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long>{

	Staff findByEmpId(String empId);
}

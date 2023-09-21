package com.project.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miracle.project.hrTeam2.attendance.entity.AttendanceAndMember;

public interface AttendanceAndMemberRepository  extends JpaRepository<AttendanceAndMember, Integer> {

	
	List<AttendanceAndMember> findAll();
}

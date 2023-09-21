package com.project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miracle.project.hrTeam2.attendance.entity.Attendance;

public interface AttendanceRepository  extends JpaRepository<Attendance, Integer>{

}

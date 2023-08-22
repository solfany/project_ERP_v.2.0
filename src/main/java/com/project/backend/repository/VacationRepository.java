package com.project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.backend.entity.Vacation;

public interface VacationRepository extends JpaRepository<Vacation, Long> {

}

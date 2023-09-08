package com.project.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.project.backend.entity.Vacation;

public interface VacationRepository extends JpaRepository<Vacation, Long> {
}
// staff의 empnum을 검색하는 쿼리
//    @Query("SELECT v FROM Vacation v WHERE v.staff.empNum = :empNum")
//    List<Vacation> findByStaffEmpNum(Long empNum);
//	List<Vacation> findByStaff_EmpNum(Long empNum);


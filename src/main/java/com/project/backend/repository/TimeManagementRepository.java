package com.project.backend.repository;

import com.project.backend.entity.Staff;
import com.project.backend.entity.timeManagementSystem.TimeManagementSystem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeManagementRepository extends JpaRepository<TimeManagementSystem, Long> {
  // 필요한 추가 쿼리 메서드들을 여기에 정의할 수 있습니다.
  // 예를 들어, 이름으로 TimeManagementSystem 데이터를 찾는 메서드는 아래와 같이 정의할 수 있습니다.
  // List<TimeManagementSystem> findByEmpName(String empName);
  void deleteByStaff(Staff staff);
}

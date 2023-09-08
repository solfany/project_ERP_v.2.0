package com.project.backend.controller.timeManagementSystem;

import com.project.backend.entity.timeManagementSystem.TimeManagementSystem;
import com.project.backend.service.timemanagement.TimeManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TimeManagementController {

  private final TimeManagementService timeManagementService;

  @Autowired
  public TimeManagementController(TimeManagementService timeManagementService) {
    this.timeManagementService = timeManagementService;
  }

  // 엔드포인트: 모든 TimeManagementSystem 데이터를 가져옴
  @GetMapping("/timeManagement")
  public List<TimeManagementSystem> getAllTimeManagementData() {
    return timeManagementService.findAll();
  }

  // 추가적인 엔드포인트나 로직은 필요에 따라 추가합니다.
}

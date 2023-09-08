package com.project.backend.entity.timeManagementSystem;

import com.project.backend.entity.Staff;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.YearMonth;

@Entity
public class TimeManagementSystem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "staff_id")
  private Staff staff;

  // 유급휴가 일수
  private int vacation;

  // 소정근로일수
  private int workingDays;

  //실제근로일수
  private int actualWorkDays;

  //소정근로시간
  private int workingHours;

  //유급휴가
  private int unpaid;

  //무급휴가
  private int paid;
  private Long empNum;

  private String empId;



  private String dept;

  private String position;

  private String empName;

  private String birthDate;

  private String phoneNumber;

  private String address;

  private String email;

// 당월의 평일 일수 계산 메서드
public int calculateWeekdaysInMonth(int year, int month) {
  YearMonth yearMonth = YearMonth.of(year, month);
  LocalDate firstDayOfMonth = yearMonth.atDay(1);
  LocalDate lastDayOfMonth = yearMonth.atEndOfMonth();

  int weekdays = 0;
  LocalDate currentDate = firstDayOfMonth;

  while (!currentDate.isAfter(lastDayOfMonth)) {
    if (currentDate.getDayOfWeek().getValue() >= 1 && currentDate.getDayOfWeek().getValue() <= 5) {
      weekdays++;
    }
    currentDate = currentDate.plusDays(1);
  }

  return weekdays;
}

  // 당월 평일일수 x 8을 소정근로시간 필드에 설정하는 메서드
  public void updateWorkingHours() {
    int year = YearMonth.now().getYear();
    int month = YearMonth.now().getMonthValue();

    int weekdaysInMonth = calculateWeekdaysInMonth(year, month);
    this.workingHours = weekdaysInMonth * 8;
  }

  // 초기화 메서드에서 값을 계산하여 필드에 설정
  @PrePersist
  @PreUpdate
  public void initializeValues() {
    int year = YearMonth.now().getYear();
    int month = YearMonth.now().getMonthValue();

    int weekdaysInMonth = calculateWeekdaysInMonth(year, month);
    this.workingDays = weekdaysInMonth;
    this.actualWorkDays = weekdaysInMonth; // 기본값으로 설정

    updateWorkingHours(); // 소정근로시간 업데이트
  }


//  ===============================
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Staff getStaff() {
    return staff;
  }

  public void setStaff(Staff staff) {
    this.staff = staff;
  }

  public int getVacation() {
    return vacation;
  }

  public void setVacation(int vacation) {
    this.vacation = vacation;
  }

  public int getWorkingDays() {
    return workingDays;
  }

  public void setWorkingDays(int workingDays) {
    this.workingDays = workingDays;
  }

  public int getActualWorkDays() {
    return actualWorkDays;
  }

  public void setActualWorkDays(int actualWorkDays) {
    this.actualWorkDays = actualWorkDays;
  }

  public int getWorkingHours() {
    return workingHours;
  }

  public void setWorkingHours(int workingHours) {
    this.workingHours = workingHours;
  }

  public Long getEmpNum() {
    return empNum;
  }

  public String getEmpId() {
    return empId;
  }

  public String getDept() {
    return dept;
  }

  public void setDept(String dept) {
    this.dept = dept;
  }

  public String getPosition() {
    return position;
  }

  public String getEmpName() {
    return empName;
  }

  public String getBirthDate() {
    return birthDate;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public String getAddress() {
    return address;
  }

  public String getEmail() {
    return email;
  }

  public int getUnpaid() {
    return unpaid;
  }

  public void setUnpaid(int unpaid) {
    this.unpaid = unpaid;
  }

  public int getPaid() {
    return paid;
  }

  public void setPaid(int paid) {
    this.paid = paid;
  }

  public void setEmpNum(Long empNum) {
    this.empNum = empNum;
  }

  public void setEmpId(String empId) {
    this.empId = empId;
  }

  public void setPosition(String position) {
    this.position = position;
  }

  public void setEmpName(String empName) {
    this.empName = empName;
  }

  public void setBirthDate(String birthDate) {
    this.birthDate = birthDate;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}
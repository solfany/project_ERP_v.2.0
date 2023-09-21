package com.project.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SalaryDTO {
	
	private Long salNo;
	private int baseSalary;
	private int overTimePay;
	private int vacationPay;
	private String salDate;
	private int memberNo;
	
	public SalaryDTO() {
		super();

	}
	public SalaryDTO(Long salNo, int baseSalary, int vacationPay, int overTimePay, String salDate, int memberNo) {
		super();
		this.salNo = salNo;
		this.baseSalary = baseSalary;
		this.overTimePay = overTimePay;
		this.vacationPay = vacationPay;
		this.salDate = salDate;
		this.memberNo = memberNo;
	}
	@Override
	public String toString() {
		return "SalaryDTO [salNo=" + salNo + ", baseSalary=" + baseSalary + ", vacationPay=" + vacationPay
				+ ", overTimePay=" + overTimePay + ", salDate=" + salDate + ", memberNo=" + memberNo + "]";
	}
	public Long getSalNo() {
		return salNo;
	}
	public void setSalNo(Long salNo) {
		this.salNo = salNo;
	}
	public int getBaseSalary() {
		return baseSalary;
	}
	public void setBaseSalary(int baseSalary) {
		this.baseSalary = baseSalary;
	}
	public int getVacationPay() {
		return vacationPay;
	}
	public void setVacationPay(int vacationPay) {
		this.vacationPay = vacationPay;
	}
	public int getOverTimePay() {
		return overTimePay;
	}
	public void setOverTimePay(int overTimePay) {
		this.overTimePay = overTimePay;
	}
	public String getSalDate() {
		return salDate;
	}
	public void setSalDate(String salDate) {
		this.salDate = salDate;
	}
	public int getMemberNo() {
		return memberNo;
	}
	public void setMemberNo(int memberNo) {
		this.memberNo = memberNo;
	}
	
	
	
}

package com.project.backend.dto;

import com.miracle.project.member.dto.MemberDTO;

public class SalaryAndMemberDTO {
	private int salNo;
	private int baseSalary;
	private int overTimePay;
	private int vacationPay;
	private String salDate;
	private MemberDTO member;

	public SalaryAndMemberDTO() {
	}

	public SalaryAndMemberDTO(int salNo, int baseSalary, int vacationPay, int overTimePay, String salDate,
			MemberDTO member) {
		super();
		this.salNo = salNo;
		this.baseSalary = baseSalary;
		this.overTimePay = overTimePay;
		this.vacationPay = vacationPay;
		this.salDate = salDate;
		this.member = member;
	}

	@Override
	public String toString() {
		return "MemberAndSalaryDTO [salNo=" + salNo + ", baseSalary=" + baseSalary + ", vacationPay=" + vacationPay
				+ ", overTimePay=" + overTimePay + ", salDate=" + salDate + ", member=" + member + "]";
	}

	public int getSalNo() {
		return salNo;
	}

	public void setSalNo(int salNo) {
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

	public MemberDTO getMember() {
		return member;
	}

	public void setMember(MemberDTO member) {
		this.member = member;
	}

}

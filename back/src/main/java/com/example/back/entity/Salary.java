package com.project.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "TB_SALARY")
@SequenceGenerator(
		name = "SALARY_SEQ_GENERATOR",
		sequenceName = "SEQ_SAL_NO",
		initialValue = 1, allocationSize = 1
)
public class Salary {

	@Id
	@Column(name = "SAL_NO")
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "SALARY_SEQ_GENERATOR"
	)
	private int salNo;
	
	@Column(name = "BASE_SALARY")
	private int baseSalary;
	
	@Column(name = "OVERTIME_PAY")
	private int overTimePay;
	
	@Column(name = "VACATION_PAY")
	private int vacationPay;
	
	@Column(name = "SAL_DATE")
	private String salDate;
	
	@Column(name = "MEMBER_NO")
	private int memberNo;

	public Salary() {
	}

	public Salary(int salNo, int baseSalary, int overTimePay, int vacationPay, String salDate, int memberNo) {
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
		return "Salary [salNo=" + salNo + ", baseSalary=" + baseSalary + ", overTimePay=" + overTimePay
				+ ", vacationPay=" + vacationPay + ", salDate=" + salDate + ", memberNo=" + memberNo + "]";
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

	public int getOverTimePay() {
		return overTimePay;
	}

	public void setOverTimePay(int overTimePay) {
		this.overTimePay = overTimePay;
	}

	public int getVacationPay() {
		return vacationPay;
	}

	public void setVacationPay(int vacationPay) {
		this.vacationPay = vacationPay;
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

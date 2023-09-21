package com.project.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.miracle.project.member.dto.MemberDTO;
import com.miracle.project.member.entity.Member;

@Entity
@Table(name = "TB_SALARY")
public class SalaryAndMember {

	@Id
	@Column(name = "SAL_NO")
	private int salNo;
	
	@Column(name = "BASE_SALARY")
	private int baseSalary;
	
	@Column(name = "OVERTIME_PAY")
	private double overTimePay;
	
	@Column(name = "VACATION_PAY")
	private double vacationPay;
	
	@Column(name = "SAL_DATE")
	private String salDate;
	
	@Column(name = "MEMBER_NO")
	private int memberNo;
	
	@ManyToOne
	@JoinColumn(name = "MEMBER_NO", insertable = false, updatable = false)
	private Member memberNum;

	
	public SalaryAndMember() {
		super();
	}


	public SalaryAndMember(int salNo, int baseSalary, double overTimePay, int vacationPay, String salDate, int memberNo,
			Member memberNum) {
		super();
		this.salNo = salNo;
		this.baseSalary = baseSalary;
		this.overTimePay = overTimePay;
		this.vacationPay = vacationPay;
		this.salDate = salDate;
		this.memberNo = memberNo;
		this.memberNum = memberNum;
	}


	@Override
	public String toString() {
		return "SalaryAndMember [salNo=" + salNo + ", baseSalary=" + baseSalary + ", overTimePay=" + overTimePay
				+ ", vacationPay=" + vacationPay + ", salDate=" + salDate + ", memberNo=" + memberNo + ", memberNum="
				+ memberNum + "]";
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


	public int setBaseSalary(int baseSalary) {
		return this.baseSalary = baseSalary;
	}


	public double getOverTimePay() {
		return overTimePay;
	}


	public void setOverTimePay(double overTimePay) {
		this.overTimePay = overTimePay;
	}


	public double getVacationPay() {
		return vacationPay;
	}


	public void setVacationPay(double setVacationPay) {
		this.vacationPay = setVacationPay;
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


	public Member getMemberNum() {
		return memberNum;
	}


	public void setMemberNum(Member memberNum) {
		this.memberNum = memberNum;
	}


	public void setMemberNum(MemberDTO member) {
		// TODO Auto-generated method stub
		
	}


}

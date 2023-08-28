package com.project.backend.dto;

import lombok.Data;


@Data
public class StaffDto {
	
	private String empNum;
	private String empId;
	private String empPwd;
	private String empPwdCheck;
	private String dept;
	private String position;
	private String empName;
	private String birthDate;
	private String phoneNumber;
	private String address;
	private String email;
	private String bankName;
	private String accountNumber;
}
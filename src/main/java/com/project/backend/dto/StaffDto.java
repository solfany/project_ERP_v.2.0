package com.project.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StaffDto {

	private Long empNum;
	private String empId;
	private String empPwd;
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
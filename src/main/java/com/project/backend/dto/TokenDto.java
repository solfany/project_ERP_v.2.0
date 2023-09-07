package com.project.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenDto {

	private Long EmpNum;
	private String accessToken;
	private String refreshToken;
	private StaffDto staffInfo; // Staff 정보를 담을 StaffDto 필드
}

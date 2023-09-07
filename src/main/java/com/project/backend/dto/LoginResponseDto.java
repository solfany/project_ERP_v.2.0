package com.project.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDto {


    private String token;
    private Long expiresIn;
    private StaffDto staff;

}
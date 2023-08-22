package com.project.backend.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TimeManagementDto {
    private Long id;
    private Long empNum;
    private String title;
    private String empName;
    private Date start;
    private Date end;
    private String description;

    public TimeManagementDto() {
        // 기본 생성자
    }
}

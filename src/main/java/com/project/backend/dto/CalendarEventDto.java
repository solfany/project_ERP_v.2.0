package com.project.backend.dto;

import com.project.backend.entity.CalendarEvent;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CalendarEventDto {
    private Long id;
    private Long empNum;
    private String title;
    private String empName;
    private Date start;
    private Date end;
    private String description;

    public CalendarEventDto() {
        // 기본 생성자
    }

    public CalendarEventDto(Long empNum, String title, String empName, Date start, Date end, String description) {
        this.empNum = empNum;
        this.title = title;
        this.empName = empName;
        this.start = start;
        this.end = end;
        this.description = description;
    }


    // toEntity 메서드 추가
    public CalendarEvent toEntity() {
        CalendarEvent entity = new CalendarEvent();
        entity.setEmpNum(this.empNum);
        entity.setTitle(this.title);
        entity.setEmpName(this.empName);
        entity.setStart(this.start);
        entity.setEnd(this.end);
        entity.setDescription(this.description);
        return entity;
    }
}

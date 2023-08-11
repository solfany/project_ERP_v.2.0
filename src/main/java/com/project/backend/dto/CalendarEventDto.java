package com.project.backend.dto;

import com.project.backend.entity.CalendarEvent;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter @Setter
public class CalendarEventDto {
    private Long id;
    private Long empNum;
    private String title;
    private String empName;
    private Date start;
    private Date end;
    private String description;



    public static CalendarEventDto toDto(CalendarEvent event) {
        CalendarEventDto dto = new CalendarEventDto();
        dto.setId(event.getId());
        dto.setTitle(event.getTitle());
        dto.setEmpName(event.getEmpName());
        dto.setStart(event.getStart());
        dto.setEnd(event.getEnd());
        dto.setDescription(event.getDescription());
        return dto;
    }

    public static CalendarEvent toEntity(CalendarEventDto dto) {
        CalendarEvent event = new CalendarEvent();
        event.setTitle(dto.getTitle());
        event.setEmpNum(dto.getEmpNum());
        event.setEmpName(dto.getEmpName());
        event.setStart(dto.getStart());
        event.setEnd(dto.getEnd());
        event.setDescription(dto.getDescription());
        return event;
    }

    // 다른 필드나 메소드도 필요하다면 여기에 추가할 수 있습니다.
}

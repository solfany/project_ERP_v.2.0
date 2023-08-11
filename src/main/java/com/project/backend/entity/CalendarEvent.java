package com.project.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;


@Getter
@Entity
@Table(name = "calendar_event")
@ToString
public class CalendarEvent {

    @Id
    @Column(name = "calendar_event_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Getter @Setter private Long empNum;

    @Column(name = "calendar_event_title", nullable = false)
    @Getter @Setter private String title;

    @Column(nullable = false)
    @Getter @Setter private String empName;

    @Column(nullable = false)
    @Getter @Setter private Date start;

    @Column(nullable = false)
    @Getter @Setter private Date end;

    @Column(nullable = false)
    @Getter @Setter private String description;


    public static CalendarEvent CreateCalendarEvent(Long empNum, String title, String empName, Date start, Date end, String description) {
        CalendarEvent calendarEvent = new CalendarEvent();
        calendarEvent.empNum = empNum;
        calendarEvent.empName = empName;
        calendarEvent.title = title;
        calendarEvent.start = start;
        calendarEvent.end = end;
        calendarEvent.description = description;
        return calendarEvent;
    }

}
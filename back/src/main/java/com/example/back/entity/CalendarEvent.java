package com.project.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Getter

@Entity
public class CalendarEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Setter private String title;

    @Column(nullable = false)
    @Setter private String name;

    @Column(nullable = false)
    @Setter private Date start;

    @Column(nullable = false)
    @Setter private Date end;

    @Column(nullable = false)
    @Setter private String desc;

    protected CalendarEvent() {
    }


    private CalendarEvent(String title, String name, Date start, Date end, String desc) {
        this.title = title;
        this.name = name;
        this.start = start;
        this.end = end;
        this.desc = desc;
    }

    public static CalendarEvent of(String title, String name, Date start, Date end, String desc) {
        return new CalendarEvent(title, name, start, end, desc);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CalendarEvent that = (CalendarEvent) o;

        if (!id.equals(that.id)) return false;
        if (!title.equals(that.title)) return false;
        if (!name.equals(that.name)) return false;
        if (!start.equals(that.start)) return false;
        if (!end.equals(that.end)) return false;
        return desc.equals(that.desc);
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + title.hashCode();
        result = 31 * result + name.hashCode();
        result = 31 * result + start.hashCode();
        result = 31 * result + end.hashCode();
        result = 31 * result + desc.hashCode();
        return result;
    }
}
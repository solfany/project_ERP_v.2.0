package com.project.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "attendance_records")
public class AttendanceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Staff staff;

    @Column(name = "attendance_type")
    private String attendanceType;

    @Column(name = "attendance_time")
    private String attendanceTime;

    @Column(name = "attendance_date")
    private String attendanceDate;
}

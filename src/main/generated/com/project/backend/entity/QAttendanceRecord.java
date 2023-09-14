package com.project.backend.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAttendanceRecord is a Querydsl query type for AttendanceRecord
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAttendanceRecord extends EntityPathBase<AttendanceRecord> {

    private static final long serialVersionUID = 1811717065L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAttendanceRecord attendanceRecord = new QAttendanceRecord("attendanceRecord");

    public final StringPath attendanceDate = createString("attendanceDate");

    public final StringPath attendanceTime = createString("attendanceTime");

    public final StringPath attendanceType = createString("attendanceType");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QStaff staff;

    public QAttendanceRecord(String variable) {
        this(AttendanceRecord.class, forVariable(variable), INITS);
    }

    public QAttendanceRecord(Path<? extends AttendanceRecord> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAttendanceRecord(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAttendanceRecord(PathMetadata metadata, PathInits inits) {
        this(AttendanceRecord.class, metadata, inits);
    }

    public QAttendanceRecord(Class<? extends AttendanceRecord> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.staff = inits.isInitialized("staff") ? new QStaff(forProperty("staff")) : null;
    }

}


//package com.project.backend.entity;
//
//import static com.querydsl.core.types.PathMetadataFactory.*;
//
//import com.querydsl.core.types.dsl.*;
//
//import com.querydsl.core.types.PathMetadata;
//import javax.annotation.processing.Generated;
//import com.querydsl.core.types.Path;
//
//
///**
// * QCalendarEvent is a Querydsl query type for CalendarEvent
// */
//@Generated("com.querydsl.codegen.DefaultEntitySerializer")
//public class QCalendarEvent extends EntityPathBase<CalendarEvent> {
//
//    private static final long serialVersionUID = 1855213869L;
//
//    public static final QCalendarEvent calendarEvent = new QCalendarEvent("calendarEvent");
//
//    public final StringPath description = createString("description");
//
//    public final StringPath empName = createString("empName");
//
//    public final NumberPath<Long> empNum = createNumber("empNum", Long.class);
//
//    public final DateTimePath<java.util.Date> end = createDateTime("end", java.util.Date.class);
//
//    public final NumberPath<Long> id = createNumber("id", Long.class);
//
//    public final DateTimePath<java.util.Date> start = createDateTime("start", java.util.Date.class);
//
//    public final StringPath title = createString("title");
//
//    public QCalendarEvent(String variable) {
//        super(CalendarEvent.class, forVariable(variable));
//    }
//
//    public QCalendarEvent(Path<? extends CalendarEvent> path) {
//        super(path.getType(), path.getMetadata());
//    }
//
//    public QCalendarEvent(PathMetadata metadata) {
//        super(CalendarEvent.class, metadata);
//    }
//
//}
//

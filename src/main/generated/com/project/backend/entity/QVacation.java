package com.project.backend.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QVacation is a Querydsl query type for Vacation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QVacation extends EntityPathBase<Vacation> {

    private static final long serialVersionUID = -1941654260L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QVacation vacation = new QVacation("vacation");

    public final StringPath dept = createString("dept");

    public final StringPath empName = createString("empName");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath position = createString("position");

    public final QStaff staff;

    public final DatePath<java.time.LocalDate> vacaEnd = createDate("vacaEnd", java.time.LocalDate.class);

    public final StringPath vacaEtc = createString("vacaEtc");

    public final StringPath vacaReason = createString("vacaReason");

    public final DatePath<java.time.LocalDate> vacaStart = createDate("vacaStart", java.time.LocalDate.class);

    public final StringPath vacaType = createString("vacaType");

    public QVacation(String variable) {
        this(Vacation.class, forVariable(variable), INITS);
    }

    public QVacation(Path<? extends Vacation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QVacation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QVacation(PathMetadata metadata, PathInits inits) {
        this(Vacation.class, metadata, inits);
    }

    public QVacation(Class<? extends Vacation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.staff = inits.isInitialized("staff") ? new QStaff(forProperty("staff")) : null;
    }

}


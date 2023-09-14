package com.project.backend.entity.timeManagementSystem;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTimeManagementSystem is a Querydsl query type for TimeManagementSystem
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTimeManagementSystem extends EntityPathBase<TimeManagementSystem> {

    private static final long serialVersionUID = -896438657L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTimeManagementSystem timeManagementSystem = new QTimeManagementSystem("timeManagementSystem");

    public final NumberPath<Integer> actualWorkDays = createNumber("actualWorkDays", Integer.class);

    public final StringPath address = createString("address");

    public final StringPath birthDate = createString("birthDate");

    public final StringPath dept = createString("dept");

    public final StringPath email = createString("email");

    public final StringPath empId = createString("empId");

    public final StringPath empName = createString("empName");

    public final NumberPath<Long> empNum = createNumber("empNum", Long.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> paid = createNumber("paid", Integer.class);

    public final StringPath phoneNumber = createString("phoneNumber");

    public final StringPath position = createString("position");

    public final com.project.backend.entity.QStaff staff;

    public final NumberPath<Integer> unpaid = createNumber("unpaid", Integer.class);

    public final NumberPath<Integer> vacation = createNumber("vacation", Integer.class);

    public final NumberPath<Integer> workingDays = createNumber("workingDays", Integer.class);

    public final NumberPath<Integer> workingHours = createNumber("workingHours", Integer.class);

    public QTimeManagementSystem(String variable) {
        this(TimeManagementSystem.class, forVariable(variable), INITS);
    }

    public QTimeManagementSystem(Path<? extends TimeManagementSystem> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTimeManagementSystem(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTimeManagementSystem(PathMetadata metadata, PathInits inits) {
        this(TimeManagementSystem.class, metadata, inits);
    }

    public QTimeManagementSystem(Class<? extends TimeManagementSystem> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.staff = inits.isInitialized("staff") ? new com.project.backend.entity.QStaff(forProperty("staff")) : null;
    }

}


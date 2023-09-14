package com.project.backend.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStaff is a Querydsl query type for Staff
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStaff extends EntityPathBase<Staff> {

    private static final long serialVersionUID = 585365265L;

    public static final QStaff staff = new QStaff("staff");

    public final StringPath accountNumber = createString("accountNumber");

    public final StringPath address = createString("address");

    public final SetPath<Authority, QAuthority> authorities = this.<Authority, QAuthority>createSet("authorities", Authority.class, QAuthority.class, PathInits.DIRECT2);

    public final StringPath bankName = createString("bankName");

    public final StringPath birthDate = createString("birthDate");

    public final StringPath dept = createString("dept");

    public final StringPath email = createString("email");

    public final StringPath empId = createString("empId");

    public final StringPath empName = createString("empName");

    public final NumberPath<Long> empNum = createNumber("empNum", Long.class);

    public final StringPath empPwd = createString("empPwd");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final StringPath position = createString("position");

    public QStaff(String variable) {
        super(Staff.class, forVariable(variable));
    }

    public QStaff(Path<? extends Staff> path) {
        super(path.getType(), path.getMetadata());
    }

    public QStaff(PathMetadata metadata) {
        super(Staff.class, metadata);
    }

}


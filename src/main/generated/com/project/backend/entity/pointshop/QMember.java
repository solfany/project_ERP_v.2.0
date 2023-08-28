//package com.project.backend.entity.pointshop;
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
// * QMember is a Querydsl query type for Member
// */
//@Generated("com.querydsl.codegen.DefaultEntitySerializer")
//public class QMember extends EntityPathBase<Member> {
//
//    private static final long serialVersionUID = -858103759L;
//
//    public static final QMember member = new QMember("member1");
//
//    public final QBaseEntity _super = new QBaseEntity(this);
//
//    public final StringPath address = createString("address");
//
//    //inherited
//    public final StringPath createdBy = _super.createdBy;
//
//    public final StringPath email = createString("email");
//
//    public final NumberPath<Long> id = createNumber("id", Long.class);
//
//    //inherited
//    public final StringPath modifiedBy = _super.modifiedBy;
//
//    public final StringPath name = createString("name");
//
//    public final StringPath password = createString("password");
//
//    //inherited
//    public final DateTimePath<java.time.LocalDateTime> regTime = _super.regTime;
//
//    public final EnumPath<com.project.backend.constant.Role> role = createEnum("role", com.project.backend.constant.Role.class);
//
//    //inherited
//    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;
//
//    public QMember(String variable) {
//        super(Member.class, forVariable(variable));
//    }
//
//    public QMember(Path<? extends Member> path) {
//        super(path.getType(), path.getMetadata());
//    }
//
//    public QMember(PathMetadata metadata) {
//        super(Member.class, metadata);
//    }
//
//}
//

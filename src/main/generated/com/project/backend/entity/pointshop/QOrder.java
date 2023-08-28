//package com.project.backend.entity.pointshop;
//
//import static com.querydsl.core.types.PathMetadataFactory.*;
//
//import com.querydsl.core.types.dsl.*;
//
//import com.querydsl.core.types.PathMetadata;
//import javax.annotation.processing.Generated;
//import com.querydsl.core.types.Path;
//import com.querydsl.core.types.dsl.PathInits;
//
//
///**
// * QOrder is a Querydsl query type for Order
// */
//@Generated("com.querydsl.codegen.DefaultEntitySerializer")
//public class QOrder extends EntityPathBase<Order> {
//
//    private static final long serialVersionUID = -995286313L;
//
//    private static final PathInits INITS = PathInits.DIRECT2;
//
//    public static final QOrder order = new QOrder("order1");
//
//    public final QBaseEntity _super = new QBaseEntity(this);
//
//    //inherited
//    public final StringPath createdBy = _super.createdBy;
//
//    public final NumberPath<Long> id = createNumber("id", Long.class);
//
//    public final QMember member;
//
//    //inherited
//    public final StringPath modifiedBy = _super.modifiedBy;
//
//    public final DateTimePath<java.time.LocalDateTime> orderDate = createDateTime("orderDate", java.time.LocalDateTime.class);
//
//    public final ListPath<OrderItem, QOrderItem> orderItems = this.<OrderItem, QOrderItem>createList("orderItems", OrderItem.class, QOrderItem.class, PathInits.DIRECT2);
//
//    public final EnumPath<com.project.backend.constant.OrderStatus> orderStatus = createEnum("orderStatus", com.project.backend.constant.OrderStatus.class);
//
//    //inherited
//    public final DateTimePath<java.time.LocalDateTime> regTime = _super.regTime;
//
//    //inherited
//    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;
//
//    public QOrder(String variable) {
//        this(Order.class, forVariable(variable), INITS);
//    }
//
//    public QOrder(Path<? extends Order> path) {
//        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
//    }
//
//    public QOrder(PathMetadata metadata) {
//        this(metadata, PathInits.getFor(metadata, INITS));
//    }
//
//    public QOrder(PathMetadata metadata, PathInits inits) {
//        this(Order.class, metadata, inits);
//    }
//
//    public QOrder(Class<? extends Order> type, PathMetadata metadata, PathInits inits) {
//        super(type, metadata, inits);
//        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
//    }
//
//}
//

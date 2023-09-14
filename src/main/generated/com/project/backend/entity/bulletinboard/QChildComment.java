package com.project.backend.entity.bulletinboard;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChildComment is a Querydsl query type for ChildComment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChildComment extends EntityPathBase<ChildComment> {

    private static final long serialVersionUID = -1974045183L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChildComment childComment = new QChildComment("childComment");

    public final QBulletinBoard bulletinBoard;

    public final StringPath commentContent = createString("commentContent");

    public final DateTimePath<java.util.Date> commentDate = createDateTime("commentDate", java.util.Date.class);

    public final DateTimePath<java.util.Date> commentEdit = createDateTime("commentEdit", java.util.Date.class);

    public final DateTimePath<java.util.Date> commentEditDate = createDateTime("commentEditDate", java.util.Date.class);

    public final NumberPath<Long> commentId = createNumber("commentId", Long.class);

    public final StringPath email = createString("email");

    public final StringPath empId = createString("empId");

    public final StringPath empNum = createString("empNum");

    public final QParentComment parentComment;

    public QChildComment(String variable) {
        this(ChildComment.class, forVariable(variable), INITS);
    }

    public QChildComment(Path<? extends ChildComment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChildComment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChildComment(PathMetadata metadata, PathInits inits) {
        this(ChildComment.class, metadata, inits);
    }

    public QChildComment(Class<? extends ChildComment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bulletinBoard = inits.isInitialized("bulletinBoard") ? new QBulletinBoard(forProperty("bulletinBoard")) : null;
        this.parentComment = inits.isInitialized("parentComment") ? new QParentComment(forProperty("parentComment"), inits.get("parentComment")) : null;
    }

}


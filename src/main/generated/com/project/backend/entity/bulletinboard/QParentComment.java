package com.project.backend.entity.bulletinboard;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QParentComment is a Querydsl query type for ParentComment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QParentComment extends EntityPathBase<ParentComment> {

    private static final long serialVersionUID = -840091209L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QParentComment parentComment = new QParentComment("parentComment");

    public final QBulletinBoard bulletinBoard;

    public final ListPath<ChildComment, QChildComment> childComments = this.<ChildComment, QChildComment>createList("childComments", ChildComment.class, QChildComment.class, PathInits.DIRECT2);

    public final StringPath commentContent = createString("commentContent");

    public final DateTimePath<java.util.Date> commentDate = createDateTime("commentDate", java.util.Date.class);

    public final DateTimePath<java.util.Date> commentEdit = createDateTime("commentEdit", java.util.Date.class);

    public final DateTimePath<java.util.Date> commentEditDate = createDateTime("commentEditDate", java.util.Date.class);

    public final NumberPath<Long> commentId = createNumber("commentId", Long.class);

    public final StringPath email = createString("email");

    public final StringPath empId = createString("empId");

    public final StringPath empNum = createString("empNum");

    public QParentComment(String variable) {
        this(ParentComment.class, forVariable(variable), INITS);
    }

    public QParentComment(Path<? extends ParentComment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QParentComment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QParentComment(PathMetadata metadata, PathInits inits) {
        this(ParentComment.class, metadata, inits);
    }

    public QParentComment(Class<? extends ParentComment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.bulletinBoard = inits.isInitialized("bulletinBoard") ? new QBulletinBoard(forProperty("bulletinBoard")) : null;
    }

}


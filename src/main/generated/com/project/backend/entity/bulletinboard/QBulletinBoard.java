package com.project.backend.entity.bulletinboard;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBulletinBoard is a Querydsl query type for BulletinBoard
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBulletinBoard extends EntityPathBase<BulletinBoard> {

    private static final long serialVersionUID = 754754785L;

    public static final QBulletinBoard bulletinBoard = new QBulletinBoard("bulletinBoard");

    public final ListPath<ParentComment, QParentComment> comments = this.<ParentComment, QParentComment>createList("comments", ParentComment.class, QParentComment.class, PathInits.DIRECT2);

    public final StringPath email = createString("email");

    public final StringPath empId = createString("empId");

    public final StringPath empNum = createString("empNum");

    public final DateTimePath<java.util.Date> hashtagDate = createDateTime("hashtagDate", java.util.Date.class);

    public final DateTimePath<java.util.Date> hashtagDateEdit = createDateTime("hashtagDateEdit", java.util.Date.class);

    public final StringPath hashtagName = createString("hashtagName");

    public final StringPath postCategory = createString("postCategory");

    public final StringPath postContent = createString("postContent");

    public final NumberPath<Integer> postCountNum = createNumber("postCountNum", Integer.class);

    public final DateTimePath<java.util.Date> postDate = createDateTime("postDate", java.util.Date.class);

    public final DateTimePath<java.util.Date> postDateEdit = createDateTime("postDateEdit", java.util.Date.class);

    public final NumberPath<Integer> postLike = createNumber("postLike", Integer.class);

    public final NumberPath<Long> postNum = createNumber("postNum", Long.class);

    public final NumberPath<Integer> postRecommend = createNumber("postRecommend", Integer.class);

    public final StringPath postTitle = createString("postTitle");

    public QBulletinBoard(String variable) {
        super(BulletinBoard.class, forVariable(variable));
    }

    public QBulletinBoard(Path<? extends BulletinBoard> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBulletinBoard(PathMetadata metadata) {
        super(BulletinBoard.class, metadata);
    }

}


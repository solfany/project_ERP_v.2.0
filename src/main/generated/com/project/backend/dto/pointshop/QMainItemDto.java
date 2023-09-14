package com.project.backend.dto.pointshop;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.project.backend.dto.pointshop.QMainItemDto is a Querydsl Projection type for MainItemDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QMainItemDto extends ConstructorExpression<MainItemDto> {

    private static final long serialVersionUID = -1626442528L;

    public QMainItemDto(com.querydsl.core.types.Expression<Long> id, com.querydsl.core.types.Expression<String> itemNm, com.querydsl.core.types.Expression<String> itemDetail, com.querydsl.core.types.Expression<String> imgUrl, com.querydsl.core.types.Expression<Integer> price, com.querydsl.core.types.Expression<Integer> stockNumber, com.querydsl.core.types.Expression<com.project.backend.constant.ItemSellStatus> itemSellStatus) {
        super(MainItemDto.class, new Class<?>[]{long.class, String.class, String.class, String.class, int.class, int.class, com.project.backend.constant.ItemSellStatus.class}, id, itemNm, itemDetail, imgUrl, price, stockNumber, itemSellStatus);
    }

}


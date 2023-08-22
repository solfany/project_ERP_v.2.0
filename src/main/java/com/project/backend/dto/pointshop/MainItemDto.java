package com.project.backend.dto.pointshop;

import com.project.backend.constant.ItemSellStatus;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MainItemDto {

    private Long id;
    private String itemNm;
    private String itemDetail;
    private String imgUrl;
    private Integer price;
    private Integer stockNumber;
    private ItemSellStatus itemSellStatus;

    @QueryProjection
    public MainItemDto(Long id, String itemNm, String itemDetail, String imgUrl, Integer price, Integer stockNumber, ItemSellStatus itemSellStatus) {
        this.id = id;
        this.itemNm = itemNm;
        this.itemDetail = itemDetail;
        this.imgUrl = imgUrl;
        this.price = price;
        this.stockNumber = stockNumber;
        this.itemSellStatus = itemSellStatus;

    }
}

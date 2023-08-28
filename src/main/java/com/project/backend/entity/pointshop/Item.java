package com.project.backend.entity.pointshop;

import com.project.backend.constant.ItemSellStatus;
import com.project.backend.dto.pointshop.ItemFormDto;
import com.project.backend.exception.pointshop.OutOfStockException;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name = "item")
@Getter
@Setter
@ToString
public class Item extends BaseEntity {

    @Id
    @Column(name = "item_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;                       //상품코드

    @Column(nullable = false, length = 50)
    private String itemNm;                 //상품명

    @Column(name = "price", nullable = false)
    private int price;                     //가격

    @Column(nullable = false)
    private int stockNumber;               //재고수량

    @Column(nullable = false)
    private String itemDetail;             //상품 상세설명

    @Enumerated(EnumType.STRING)
    private ItemSellStatus itemSellStatus; //상품 판매상태

    //상품 데이터 업데이트
    public void updateItem(ItemFormDto itemFormDto) {
        this.itemNm = itemFormDto.getItemNm();
        this.price = itemFormDto.getPrice();
        this.stockNumber = itemFormDto.getStockNumber();
        this.itemDetail = itemFormDto.getItemDetail();
        this.itemSellStatus = itemFormDto.getItemSellStatus();
    }

    //상품 재고 감소시키기
    public void removeStock(int stockNumber) {
        int restStock = this.stockNumber - stockNumber;
        if (restStock < 0) {
            throw new OutOfStockException("상품의 재고가 부족 합니다. (현재 재고 수량: " + this.stockNumber + ")");
        }
        this.stockNumber = restStock;
    }

    //상품 재고 증가시키기
    public void addStock(int stockNumber) {
        this.stockNumber += stockNumber;
    }
}


package com.project.backend.entity.pointshop;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter @Setter
@Table(name = "cart_item")
public class CartItem extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "cart_item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    private int count;

    @Transient
    private int stockNumber;

    // 상품의 재고 수량(stockNumber)를 가져오는 메소드
    public int getStockNumber() {
        if (item != null) {
            return item.getStockNumber();
        }
        return 0; // item이 null인 경우 임의의 기본값 반환 또는 다른 적절한 값을 반환
    }

    //장바구니에 담을 상품 엔티티를 생성하는 메소드
    public static CartItem createCartItem(Cart cart, Item item, Integer count) {
        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setItem(item);
        cartItem.setCount(count);
        return cartItem;
    }

    //장바구니에 담을 수량을 증가시키는 메소드
    public void addCount(int count) {
        this.count += count;
    }

    //현재 장바구니에 담겨있는 수량을 변경하는 메소드
    public void updateCount(int count) {
        this.count = count;
    }
}

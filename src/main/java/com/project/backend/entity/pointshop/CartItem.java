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

    //장바구니에 담을 상품 엔티티를 생성하는 메소드
    public static CartItem createCartItem(Cart cart, Item item, int count) {
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

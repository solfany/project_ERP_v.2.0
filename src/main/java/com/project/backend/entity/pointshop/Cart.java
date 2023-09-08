package com.project.backend.entity.pointshop;

import com.project.backend.entity.Staff;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name = "cart")
@Getter @Setter
@ToString
public class Cart extends BaseEntity {

    @Id
    @Column(name = "cart_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)

    private Staff staff;

    //처음 장바구니에 상품을 담을 때 회원의 장바구니를 생성하는 메소드
    public static Cart createCart(Staff staff) {
        Cart cart = new Cart();
        cart.setStaff(staff);
        return cart;
    }
}
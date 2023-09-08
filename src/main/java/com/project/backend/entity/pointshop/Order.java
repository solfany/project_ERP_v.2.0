package com.project.backend.entity.pointshop;

import com.project.backend.constant.OrderStatus;
import com.project.backend.entity.Staff;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter @Setter
public class Order extends BaseEntity {

    @Id @GeneratedValue
    @Column(name = "order_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Staff staff;

    private LocalDateTime orderDate;  //주문일

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;  //주문상태

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL
            , orphanRemoval = true, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems = new ArrayList<>();

    
    public void addOrderItem(OrderItem orderItem) {
        orderItems.add(orderItem);
        orderItem.setOrder(this);
    }

    //생성한 주문상품(OrderItem) 객체를 이용하여 주문(Order) 객체를 만드는 메소드
    public static Order createOrder(Staff staff, List<OrderItem> orderItemList) {
        Order order = new Order();
        order.setStaff(staff);
        for (OrderItem orderItem : orderItemList) {
            order.addOrderItem(orderItem);
        }
        order.setOrderStatus(OrderStatus.ORDER);
        order.setOrderDate(LocalDateTime.now());
        return order;
    }

    //총 주문 금액을 구하는 메소드
    public int getTotalPrice() {
        int totalPrice = 0;
        for (OrderItem orderItem : orderItems) {
            totalPrice += orderItem.getTotalPrice();
        }
        return totalPrice;
    }

    //주문 취소 시 주문 수량을 상품의 재고에 더해주고, 주문 상태를 취소로 바꾸는 메소드
    public void cancelOrder() {
        this.orderStatus = OrderStatus.CANCEL;

        for (OrderItem orderItem : orderItems) {
            orderItem.cancel();
        }
    }
}

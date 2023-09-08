package com.project.backend.dto.pointshop;

import com.project.backend.constant.OrderStatus;
import com.project.backend.entity.pointshop.Order;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class OrderHistDto {

    public OrderHistDto(Order order) {
        this.orderId = order.getId();
        // 주문 날짜 파싱 및 포맷팅
        LocalDateTime orderDateTime = order.getOrderDate();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS");
        this.orderDate = orderDateTime.format(formatter);

        this.orderStatus = order.getOrderStatus();
    }

    private Long orderId;                                            //주문 아이디
    private String orderDate;                                        //주문 날짜
    private OrderStatus orderStatus;                                 //주문 상태
    private List<OrderItemDto> orderItemDtoList = new ArrayList<>(); //주문 상품 리스트

    public void addOrderItemDto(OrderItemDto orderItemDto) {
        orderItemDtoList.add(orderItemDto);
    }
}

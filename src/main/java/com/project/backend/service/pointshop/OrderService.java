package com.project.backend.service.pointshop;

import com.project.backend.dto.pointshop.OrderDto;
import com.project.backend.dto.pointshop.OrderHistDto;
import com.project.backend.dto.pointshop.OrderItemDto;
import com.project.backend.entity.Staff;
import com.project.backend.entity.pointshop.Item;
import com.project.backend.entity.pointshop.ItemImg;
import com.project.backend.entity.pointshop.Order;
import com.project.backend.entity.pointshop.OrderItem;
import com.project.backend.repository.StaffRepository;
import com.project.backend.repository.pointshop.ItemImgRepository;
import com.project.backend.repository.pointshop.ItemRepository;
import com.project.backend.repository.pointshop.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {

    private final ItemRepository itemRepository;
    private final StaffRepository staffRepository;
    private final OrderRepository orderRepository;
    private final ItemImgRepository itemImgRepository;

    public Long order(OrderDto orderDto, Long empNum) {
        Item item = itemRepository.findById(orderDto.getItemId())
                .orElseThrow(EntityNotFoundException::new);
        Staff staff = staffRepository.findByEmpNum(empNum);

        List<OrderItem> orderItemList = new ArrayList<>();
        OrderItem orderItem = OrderItem.createOrderItem(item, orderDto.getCount());
        orderItemList.add(orderItem);

        Order order = Order.createOrder(staff, orderItemList);
        orderRepository.save(order);

        return order.getId();
    }

    @Transactional(readOnly = true)
    public Page<OrderHistDto> getOrderList(Long empNum, Pageable pageable) {
        Page<Order> orders = orderRepository.findOrders(empNum, pageable);
        Long totalCount = orderRepository.countOrder(empNum);

        List<OrderHistDto> orderHistDtos = new ArrayList<>();

        for (Order order : orders.getContent()) {
            OrderHistDto orderHistDto = new OrderHistDto(order);
            List<OrderItem> orderItems = order.getOrderItems();

            for (OrderItem orderItem : orderItems) {
                ItemImg itemImg = itemImgRepository.findByItemIdAndRepimgYn(orderItem.getItem().getId(), "Y");
                OrderItemDto orderItemDto = new OrderItemDto(orderItem, itemImg.getImgUrl());
                orderHistDto.addOrderItemDto(orderItemDto);
            }

            orderHistDtos.add(orderHistDto);
        }

        return new PageImpl<OrderHistDto>(orderHistDtos, pageable, totalCount);
    }

    // 현재 로그인한 사용자와 주문 데이터를 생성한 사용자가 같은지 검사하는 메소드
    @Transactional(readOnly = true)
    public boolean validateOrder(Long orderId, Long empNum) {
        Staff curStaff = staffRepository.findByEmpNum(empNum);
        Order order = orderRepository.findById(orderId).orElseThrow(EntityNotFoundException::new);
        Staff savedStaff = order.getStaff();

        if (!curStaff.getEmpId().equals(savedStaff.getEmpId())) {
            return false;
        }

        return true;
    }

    //주문을 취소하는 메소드
    public void cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(EntityNotFoundException::new);
        order.cancelOrder();
    }

    //장바구니에서 주문할 상품 데이터를 전달받아 주문을 생성하는 메소드
    public Long orders(List<OrderDto> orderDtoList, Long empNum) {
        Staff staff = staffRepository.findByEmpNum(empNum);
        List<OrderItem> orderItemList = new ArrayList<>();

        for (OrderDto orderDto : orderDtoList) {
            Item item = itemRepository.findById(orderDto.getItemId())
                    .orElseThrow(EntityNotFoundException::new);

            OrderItem orderItem = OrderItem.createOrderItem(item, orderDto.getCount());
            orderItemList.add(orderItem);
        }

        Order order = Order.createOrder(staff, orderItemList);
        orderRepository.save(order);

        return order.getId();
    }
}

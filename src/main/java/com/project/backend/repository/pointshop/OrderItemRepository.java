package com.project.backend.repository.pointshop;


import com.project.backend.entity.pointshop.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}

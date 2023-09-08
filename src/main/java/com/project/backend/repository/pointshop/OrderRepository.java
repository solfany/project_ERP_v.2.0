package com.project.backend.repository.pointshop;

import com.project.backend.entity.pointshop.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("select o from Order o " +
            "where o.staff.empNum = :empNum " +
            "order by o.orderDate desc")
    Page<Order> findOrders(@Param("empNum") Long empNum, Pageable pageable);


    @Query("select count(o) from Order o " +
            "where o.staff.empNum = :empNum")
    Long countOrder(@Param("empNum") Long empNum);
}

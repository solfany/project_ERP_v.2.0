package com.project.backend.repository.pointshop;


import com.project.backend.entity.pointshop.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {

    //현재 로그인한 회원의 Cart 엔티티를 찾기위한 메소드
    Cart findByStaffEmpNum(Long empNum);
}
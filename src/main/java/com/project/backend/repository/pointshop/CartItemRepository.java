package com.project.backend.repository.pointshop;


import com.project.backend.dto.pointshop.CartDetailDto;
import com.project.backend.entity.pointshop.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    //상품이 장바구니에 들어있는지 조회하는 메소드
    CartItem findByCartIdAndItemId(Long cartId, Long itemId);

    //장바구니 페이지에 전달할 CartDetailDto 리스트를 조회하는 메소드
    @Query("select new com.project.backend.dto.pointshop.CartDetailDto(ci.id, i.itemNm, i.price, ci.count, im.imgUrl) " +
            "from CartItem ci, ItemImg im " +
            "join ci.item i " +
            "where ci.cart.id = :cartId " +
            "and im.item.id = ci.item.id " +
            "and im.repimgYn = 'Y' " +
            "order by ci.regTime desc")
    List<CartDetailDto> findCartDetailDtoList(@Param("cartId") Long cartId);
}
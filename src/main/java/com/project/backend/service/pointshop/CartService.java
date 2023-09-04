package com.project.backend.service.pointshop;

import com.project.backend.dto.pointshop.CartDetailDto;
import com.project.backend.dto.pointshop.CartItemDto;
import com.project.backend.dto.pointshop.CartOrderDto;
import com.project.backend.dto.pointshop.OrderDto;
import com.project.backend.entity.Staff;
import com.project.backend.entity.pointshop.Cart;
import com.project.backend.entity.pointshop.CartItem;
import com.project.backend.entity.pointshop.Item;
import com.project.backend.repository.StaffRepository;
import com.project.backend.repository.pointshop.CartItemRepository;
import com.project.backend.repository.pointshop.CartRepository;
import com.project.backend.repository.pointshop.ItemRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {

    private final ItemRepository itemRepository;
    private final StaffRepository staffRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final OrderService orderService;

    public Long addCart(CartItemDto cartItemDto, Long empNum) {
        Item item = itemRepository.findById(cartItemDto.getItemId()).orElseThrow(EntityNotFoundException::new);
        Staff staff = staffRepository.findByEmpNum(empNum);
        Cart cart = cartRepository.findByStaffEmpNum(staff.getEmpNum());

        if (cart == null) {
            cart = Cart.createCart(staff);
            cartRepository.save(cart);
        }

        CartItem savedCartItem = cartItemRepository.findByCartIdAndItemId(cart.getId(), item.getId());

        if (savedCartItem != null) {
            savedCartItem.addCount(cartItemDto.getCount());
            return savedCartItem.getId();
        } else {
            CartItem cartItem = CartItem.createCartItem(cart, item, cartItemDto.getCount());
            cartItemRepository.save(cartItem);
            return cartItem.getId();
        }
    }

    //현재 로그인한 회원의 정보를 이용하여 장바구니에 들어있는 상품을 조회하는 메소드
    @Transactional(readOnly = true)
    public List<CartDetailDto> getCartList(Long empNum) {
        List<CartDetailDto> cartDetailDtoList = new ArrayList<>();

        Staff staff = staffRepository.findByEmpNum(empNum);
        Cart cart = cartRepository.findByStaffEmpNum(staff.getEmpNum());

        if (cart == null) {
            return cartDetailDtoList;
        }

        cartDetailDtoList = cartItemRepository.findCartDetailDtoList(cart.getId());

        return cartDetailDtoList;
    }

    //
// 요청된 수량이 재고 수량을 초과하지 않는지 체크하는 메소드
    public boolean validateCountCartItem(Long cartItemId, Integer newCount) {
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElse(null);
        if (cartItem == null) {
            return false; // 해당 장바구니 상품이 존재하지 않음
        }

        Item item = cartItem.getItem();
        int stockNumber = item.getStockNumber();
        return newCount <= stockNumber; // 요청 수량이 재고 수량 이하인지 확인
    }

    // 장바구니 상품의 수량을 업데이트하는 메소드
    public void updateCartItemCount(Long cartItemId, Integer count) {
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElseThrow(EntityNotFoundException::new);
        cartItem.updateCount(count);
    }

    //
    //장바구니 상품을 삭제하는 메소드
    public void deleteCartItem(Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId).orElseThrow(EntityNotFoundException::new);
        cartItemRepository.delete(cartItem);
    }
//
    //주문로직으로 전달할 orderDto 리스트 생성, 주문로직 호출, 주문한 상품 장바구니에서 제거하는 메소드
    public Long orderCartItem(List<CartOrderDto> cartOrderDtoList, Long empNum) {
        List<OrderDto> orderDtoList = new ArrayList<>();

        for (CartOrderDto cartOrderDto : cartOrderDtoList) {
            CartItem cartItem = cartItemRepository.findById(cartOrderDto.getCartItemId())
                    .orElseThrow(EntityNotFoundException::new);

            OrderDto orderDto = new OrderDto();
            orderDto.setItemId(cartItem.getItem().getId());
            orderDto.setCount(cartItem.getCount());
            orderDtoList.add(orderDto);
        }

        Long orderId = orderService.orders(orderDtoList, empNum);

        for (CartOrderDto cartOrderDto : cartOrderDtoList) {
            CartItem cartItem = cartItemRepository.findById(cartOrderDto.getCartItemId())
                    .orElseThrow(EntityNotFoundException::new);

            cartItemRepository.delete(cartItem);
        }

        return  orderId;
    }
}

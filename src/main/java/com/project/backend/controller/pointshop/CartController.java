package com.project.backend.controller.pointshop;

import com.project.backend.dto.pointshop.CartDetailDto;
import com.project.backend.dto.pointshop.CartItemDto;
import com.project.backend.dto.pointshop.CartOrderDto;
import com.project.backend.entity.Staff;
import com.project.backend.service.pointshop.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    @PostMapping(value = "/")
    public @ResponseBody ResponseEntity cart(@RequestBody @Valid CartItemDto cartItemDto,
                                              BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            StringBuilder sb = new StringBuilder();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            for (FieldError fieldError : fieldErrors) {
                sb.append(fieldError.getDefaultMessage());
            }
            return new ResponseEntity<String>(sb.toString(), HttpStatus.BAD_REQUEST);
        }
        Long empNum = cartItemDto.getStaff().getEmpNum();
        Long cartItemId;

        try {
            cartItemId = cartService.addCart(cartItemDto, empNum);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Long>(cartItemId, HttpStatus.OK);
    }

    @PostMapping("/list")
    public ResponseEntity<List<CartDetailDto>> getCartItems(@RequestBody Staff staff) {
        List<CartDetailDto> cartDetailDtoList = cartService.getCartList(staff.getEmpNum());
        return ResponseEntity.ok(cartDetailDtoList);
    }

    //    @GetMapping("/cart")
//    public ResponseEntity<List<CartDetailDto>> getCartItems(Principal principal) {
//        List<CartDetailDto> cartDetailDtoList = cartService.getCartList(principal.getName());
//        return ResponseEntity.ok(cartDetailDtoList);
//    }
//
    //장바구니 상품의 수량을 업데이트하는 요청을 처리
    @PatchMapping(value = "/item/{cartItemId}", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> updateCartItem(
            @PathVariable("cartItemId") Long cartItemId,
            @RequestBody Map<String, Object> requestMap) {

        // 요청 본문에서 "count" 값 추출
        Integer count = (Integer) requestMap.get("count");

        // count 값이 null이거나 0 이하일 경우 BadRequest 응답
        if (count == null || count <= 0) {
            return new ResponseEntity<>("최소 1개 이상 담아주세요", HttpStatus.BAD_REQUEST);
        }
        // 장바구니 상품 수량이 재고 수량을 초과하는지 체크
        if (!cartService.validateCountCartItem(cartItemId, count)) {
            return new ResponseEntity<>("재고 수량을 초과할 수 없습니다", HttpStatus.BAD_REQUEST);
        }
        // 장바구니 상품 수량 업데이트 수행
        cartService.updateCartItemCount(cartItemId, count);
        return new ResponseEntity<>("장바구니 상품 수량 업데이트 성공", HttpStatus.OK);
    }

    //    //장바구니 상품의 수량을 업데이트하는 요청을 처리
//    @PatchMapping(value = "/cartItem/{cartItemId}")
//    public @ResponseBody ResponseEntity updateCartItem(
//            @PathVariable("cartItemId") Long cartItemId, int count, Principal principal) {
//
//        if (count <= 0) {
//            return new ResponseEntity<String>("최소 1개 이상 담아주세요", HttpStatus.BAD_REQUEST);
//        } else if (!cartService.validateCartItem(cartItemId, principal.getName())) {
//            return new ResponseEntity<String>("수정 권한이 없습니다", HttpStatus.FORBIDDEN);
//        }
//
//        cartService.updateCartItemCount(cartItemId, count);
//        return new ResponseEntity<Long>(cartItemId, HttpStatus.OK);
//    }
//
    //장바구니 상품을 삭제하는 요청을 처리
    @DeleteMapping(value = "/item/{cartItemId}")
    public @ResponseBody ResponseEntity deleteCartItem(
            @PathVariable("cartItemId") Long cartItemId) {

        cartService.deleteCartItem(cartItemId);
        return new ResponseEntity<Long>(cartItemId, HttpStatus.OK);
    }
//

    @PostMapping(value = "/orders")
    public @ResponseBody ResponseEntity orderCartItem(
                @RequestBody CartOrderDto cartOrderDto) {

        List<CartOrderDto> cartOrderDtoList = cartOrderDto.getCartOrderDtoList();
        Staff staff = cartOrderDto.getStaff();

        if (cartOrderDtoList == null || cartOrderDtoList.size() == 0) {
            return new ResponseEntity<String>("주문할 상품을 선택해주세요", HttpStatus.FORBIDDEN);
        }

        Long orderId = cartService.orderCartItem(cartOrderDtoList, staff.getEmpNum());
        return new ResponseEntity<Long>(orderId, HttpStatus.OK);
    }

//    @PostMapping(value = "/cart/orders")
//    public @ResponseBody ResponseEntity orderCartItem(
//            @RequestBody CartOrderDto cartOrderDto, Principal principal) {
//
//        List<CartOrderDto> cartOrderDtoList = cartOrderDto.getCartOrderDtoList();
//
//        if (cartOrderDtoList == null || cartOrderDtoList.size() == 0) {
//            return new ResponseEntity<String>("주문할 상품을 선택해주세요", HttpStatus.FORBIDDEN);
//        }
//
//        for (CartOrderDto cartOrder : cartOrderDtoList) {
//            if (!cartService.validateCartItem(cartOrder.getCartItemId(), principal.getName())) {
//                return new ResponseEntity<String>("주문 권한이 없습니다", HttpStatus.FORBIDDEN);
//            }
//        }
//
//        Long orderId = cartService.orderCartItem(cartOrderDtoList, principal.getName());
//        return new ResponseEntity<Long>(orderId, HttpStatus.OK);
//    }
}

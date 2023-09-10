package com.project.backend.controller.pointshop;

import com.project.backend.dto.pointshop.CartDetailDto;
import com.project.backend.dto.pointshop.CartItemDto;
import com.project.backend.dto.pointshop.CartOrderDto;
import com.project.backend.entity.Staff;
import com.project.backend.service.pointshop.CartService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

public class CartControllerTest {

    @Mock
    private CartService cartService;

    @InjectMocks
    private CartController cartController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddCartItem_WithInput() {
        // Given
        CartItemDto cartItemDto = createValidCartItem();
        when(cartService.addCart(eq(cartItemDto), eq(cartItemDto.getStaff().getEmpNum()))).thenReturn(1L);

        // When
        ResponseEntity<?> responseEntity = cartController.cart(cartItemDto, createBindingResult(cartItemDto));

        // Then
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testGetCartItems() {
        // Given
        Staff staff = createValidStaff();
        when(cartService.getCartList(eq(staff.getEmpNum()))).thenReturn(new ArrayList<>());

        // When
        ResponseEntity<List<CartDetailDto>> responseEntity = cartController.getCartItems(staff);

        // Then
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
    }

    @Test
    public void testUpdateCartItem_WithValidInput() {
        // Given
        Long cartItemId = 1L;

        // 요청 본문을 Map 형태로 생성
        Map<String, Object> requestMap = new HashMap<>();
        requestMap.put("count", 5);

        when(cartService.validateCountCartItem(eq(cartItemId), eq(5))).thenReturn(true);

        // When
        ResponseEntity<String> responseEntity = cartController.updateCartItem(cartItemId, requestMap);

        // Then
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testUpdateCartItem_WithInvalidInput() {
        // Given
        Long cartItemId = 1L;

        // 요청 본문을 Map 형태로 생성
        Map<String, Object> requestMap = new HashMap<>();
        requestMap.put("count", -1); // Invalid count

        // When
        ResponseEntity<String> responseEntity = cartController.updateCartItem(cartItemId, requestMap);

        // Then
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }

    @Test
    public void testDeleteCartItem() {
        // Given
        Long cartItemId = 1L;

        // When
        ResponseEntity<Long> responseEntity = cartController.deleteCartItem(cartItemId);

        // Then
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testOrderCartItem_WithValidInput() {
        Staff staff = createValidStaff();

        // Given
        CartOrderDto cartOrderDto = createValidCartOrderDto();
        when(cartService.orderCartItem(eq(cartOrderDto.getCartOrderDtoList()), eq(cartOrderDto.getCartOrderDtoList().get(0).getStaff().getEmpNum()))).thenReturn(1L);
    cartOrderDto.setStaff(staff);
        // When
        ResponseEntity<?> responseEntity = cartController.orderCartItem(cartOrderDto);

        // Then
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

    @Test
    public void testOrderCartItem_WithInput() {
        // Given
        CartOrderDto cartOrderDto = new CartOrderDto(); // Empty cart order DTO

        // When
        ResponseEntity<?> responseEntity = cartController.orderCartItem(cartOrderDto);

        // Then
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.FORBIDDEN, responseEntity.getStatusCode());
    }

    private CartItemDto createValidCartItem() {
        CartItemDto cartItemDto = new CartItemDto();
        cartItemDto.setItemId(1L);
        cartItemDto.setCount(5);
        cartItemDto.setStaff(createValidStaff());
        return cartItemDto;
    }


    private Staff createValidStaff() {
        Staff staff = new Staff();
        staff.setEmpNum(8888L);
        return staff;
    }

    private BindingResult createBindingResult(Object target) {
        return new BeanPropertyBindingResult(target, "cartItemDto");
    }

    private CartOrderDto createValidCartOrderDto() {
        CartOrderDto cartOrderDto = new CartOrderDto();
        List<CartOrderDto> cartOrderDtoList = new ArrayList<>();
        cartOrderDtoList.add(createValidCartOrderItem());
        cartOrderDto.setCartOrderDtoList(cartOrderDtoList);
        return cartOrderDto;
    }

    private CartOrderDto createValidCartOrderItem() {
        CartOrderDto cartOrderDtoItem = new CartOrderDto();
        cartOrderDtoItem.setCartItemId(1L);
        cartOrderDtoItem.setCartOrderDtoList(new ArrayList<>());
        cartOrderDtoItem.setStaff(createValidStaff());
        return cartOrderDtoItem;
    }
}

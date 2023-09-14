package com.project.backend.controller.pointshop;


import com.project.backend.dto.pointshop.OrderDto;
import com.project.backend.dto.pointshop.OrderHistDto;
import com.project.backend.entity.Staff;
import com.project.backend.service.pointshop.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;

    @PostMapping(value = "/")
    public @ResponseBody ResponseEntity order (@RequestBody OrderDto orderDto,
                                               BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder sb = new StringBuilder();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for (FieldError fieldError : fieldErrors) {
                sb.append(fieldError.getDefaultMessage());
            }
            return new ResponseEntity<String>(sb.toString(), HttpStatus.BAD_REQUEST);
        }
        Long empNum = orderDto.getStaff().getEmpNum();
        Long orderId;
        try {
            orderId = orderService.order(orderDto, empNum);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Long>(orderId, HttpStatus.OK);
    }

    @PostMapping(value = { "/orderList", "/orderList/{page}" })
    public ResponseEntity<?> orderHist(
            @PathVariable(name = "page", required = false) Integer page,
            @RequestBody Staff staff
    ) {
        int pageSize = 4; // 페이지당 아이템 수

        // 페이지 번호 유효성 검사 추가
        if (page == null || page < 1) { throw new IllegalArgumentException("유효하지 않은 페이지 입니다.: " + page);}

        Pageable pageable = PageRequest.of((page - 1), pageSize);
        Page<OrderHistDto> orderHistDtoPage = orderService.getOrderList(staff.getEmpNum(), pageable);

        List<OrderHistDto> orderHistDtoList = orderHistDtoPage.getContent();
        int totalItems = (int) orderHistDtoPage.getTotalElements();
        int totalPages = orderHistDtoPage.getTotalPages();

        // 현재 페이지 범위를 계산
        int fromIndex = (page - 1) * pageSize;
        int toIndex = Math.min(fromIndex + pageSize, totalItems);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("orders", orderHistDtoList);
        responseData.put("fromIndex", fromIndex);
        responseData.put("toIndex", toIndex);
        responseData.put("currentPage", page);
        responseData.put("totalPages", totalPages);
        responseData.put("totalItems", totalItems);

        return ResponseEntity.ok(responseData);
    }

    //주문번호(orderId)를 받아서 주문 취소 로직을 호출하는 메소드
    @PostMapping("/{orderId}/cancel")
    public @ResponseBody ResponseEntity cancelOrder(@PathVariable("orderId") Long orderId){

        orderService.cancelOrder(orderId);

        return new ResponseEntity<Long>(orderId, HttpStatus.OK);
    }


}

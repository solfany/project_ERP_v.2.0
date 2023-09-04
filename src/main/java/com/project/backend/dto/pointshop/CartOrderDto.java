package com.project.backend.dto.pointshop;

import com.project.backend.entity.Staff;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class CartOrderDto {

    private Long cartItemId;
    private List<CartOrderDto> cartOrderDtoList;
    private Staff staff;
}

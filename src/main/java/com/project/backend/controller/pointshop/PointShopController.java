package com.project.backend.controller.pointshop;

import com.project.backend.dto.pointshop.ItemSearchDto;
import com.project.backend.dto.pointshop.MainItemDto;
import com.project.backend.service.pointshop.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/point_shop")
@RequiredArgsConstructor
public class PointShopController {

    private final ItemService itemService;

    @GetMapping(value = "/")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> pointShop(ItemSearchDto itemSearchDto, Optional<Integer> page) {

        Pageable pageable = PageRequest.of(page.isPresent() ? page.get() : 0, 6);
        Page<MainItemDto> items = itemService.getMainItemPage(itemSearchDto, pageable);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("items", items);
        responseData.put("itemSearchDto", itemSearchDto);
        responseData.put("maxPage", 5);

        return ResponseEntity.ok(responseData);
    }
}

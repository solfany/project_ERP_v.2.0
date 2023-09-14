package com.project.backend.controller.pointshop;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.backend.dto.pointshop.ItemFormDto;
import com.project.backend.dto.pointshop.ItemSearchDto;
import com.project.backend.entity.pointshop.Item;
import com.project.backend.service.pointshop.ItemService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping(value = "/itemFormDto")
    public ResponseEntity<ItemFormDto> getItemFormDto() {
        ItemFormDto itemFormDto = new ItemFormDto();
        return ResponseEntity.ok(itemFormDto); // JSON 형태로 데이터 반환
    }

    @PostMapping(value = "/new")
    public ResponseEntity<String> createItem(
            @RequestParam("itemImgFileList") List<MultipartFile> itemImgFileList,
            @RequestParam("itemInfo") String itemInfo
    ) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ItemFormDto itemFormDto = objectMapper.readValue(itemInfo, ItemFormDto.class);

            if (itemImgFileList.isEmpty() && itemFormDto.getId() == null) {
                return ResponseEntity.badRequest().body("첫번째 상품 이미지는 필수 입력 값입니다.");
            }

            itemService.saveItem(itemFormDto, itemImgFileList);
            return ResponseEntity.ok("상품 등록이 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("상품 등록 중 에러가 발생하였습니다.");
        }
    }



    //상품 상세 페이지 진입
    @GetMapping(value = "/{itemId}")
    public ResponseEntity<ItemFormDto> getItemDetails(@PathVariable("itemId") Long itemId) {
        try {
            ItemFormDto itemFormDto = itemService.getItemDtl(itemId);
            return ResponseEntity.ok(itemFormDto); // JSON 형태로 아이템 정보 반환
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //상품 수정 진행
    @PutMapping(value = "/{itemId}")
    public ResponseEntity<String> updateItem(@PathVariable("itemId") Long itemId,
                                             @Valid @RequestBody ItemFormDto itemFormDto,
                                             @RequestParam("itemImgFile") List<MultipartFile> itemImgFileList) {
        if (itemImgFileList.isEmpty() && itemFormDto.getId() == null) {
            return ResponseEntity.badRequest().body("첫번째 상품 이미지는 필수 입력 값입니다.");
        }

        try {
            itemService.updateItem(itemFormDto, itemImgFileList);
            return ResponseEntity.ok("상품 수정이 완료되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("상품 수정 중 에러가 발생하였습니다.");
        }
    }

    //상품 관리 페이지 진입 (+조회한 상품 데이터를 화면에 전달)
    @GetMapping(value = {"/items", "/items/{page}"})
    public ResponseEntity<Page<Item>> getAdminItemPage(ItemSearchDto itemSearchDto,
                                                       @PathVariable("page") Optional<Integer> page) {
        Pageable pageable = PageRequest.of(page.isPresent() ? page.get() : 0, 3);
        Page<Item> items = itemService.getAdminItemPage(itemSearchDto, pageable);
        return ResponseEntity.ok(items); // JSON 형태로 아이템 페이지 정보 반환
    }
}

package com.project.backend.dto.pointshop;

import com.project.backend.constant.ItemSellStatus;
import com.project.backend.entity.pointshop.Item;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class ItemFormDto {

    private Long id;
    private String itemNm;
    private Integer price;
    private String itemDetail;
    private Integer stockNumber;
    private ItemSellStatus itemSellStatus;
    private List<ItemImgDto> itemImgDtoList = new ArrayList<>();
    private List<Long> itemImgIds = new ArrayList<>();

    private static ModelMapper modelMapper = new ModelMapper();

    public Item createItem() {
        return modelMapper.map(this, Item.class);
    }

    public static ItemFormDto of(Item item) {
        return modelMapper.map(item, ItemFormDto.class);
    }

    public ItemFormDto() {
        // 기본 생성자
    }
}

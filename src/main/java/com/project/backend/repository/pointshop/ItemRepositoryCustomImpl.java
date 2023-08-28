//package com.project.backend.repository.pointshop;
//
//import com.project.backend.constant.ItemSellStatus;
//import com.project.backend.dto.pointshop.ItemSearchDto;
//import com.project.backend.dto.pointshop.MainItemDto;
//import com.project.backend.dto.pointshop.QMainItemDto;
//import com.project.backend.entity.pointshop.Item;
//import com.project.backend.entity.pointshop.QItem;
//import com.project.backend.entity.pointshop.QItemImg;
//import com.querydsl.core.types.dsl.BooleanExpression;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import jakarta.persistence.EntityManager;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Repository;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Repository
//public class ItemRepositoryCustomImpl implements ItemRepositoryCustom {
//
//    private final JPAQueryFactory queryFactory;
//
//    public ItemRepositoryCustomImpl(EntityManager entityManager) {
//        this.queryFactory = new JPAQueryFactory(entityManager);
//    }
//
//    private BooleanExpression searchSellStatusEq(ItemSellStatus searchSellStatus) {
//        return searchSellStatus == null ? null : QItem.item.itemSellStatus.eq(searchSellStatus);
//    }
//
//    private LocalDateTime calculateDateTime(String searchDateType) {
//        LocalDateTime dateTime = LocalDateTime.now();
//
//        if ("all".equals(searchDateType) || searchDateType == null) {
//            return null;
//        } else if ("1d".equals(searchDateType)) {
//            dateTime = dateTime.minusDays(1);
//        } else if ("1w".equals(searchDateType)) {
//            dateTime = dateTime.minusWeeks(1);
//        } else if ("1m".equals(searchDateType)) {
//            dateTime = dateTime.minusMonths(1);
//        } else if ("6m".equals(searchDateType)) {
//            dateTime = dateTime.minusMonths(6);
//        }
//
//        return dateTime;
//    }
//
//    private BooleanExpression regDtsAfter(String searchDateType) {
//        LocalDateTime dateTime = calculateDateTime(searchDateType);
//
//        return dateTime != null ? QItem.item.regTime.after(dateTime) : null;
//    }
//
//    private BooleanExpression searchByLike(String searchBy, String searchQuery) {
//        if ("itemNm".equals(searchBy)) {
//            return QItem.item.itemNm.like("%" + searchQuery + "%");
//        } else if ("createdBy".equals(searchBy)) {
//            return QItem.item.createdBy.like("%" + searchQuery + "%");
//        }
//
//        return null;
//    }
//
//    @Override
//    public Page<Item> getAdminItemPage(ItemSearchDto itemSearchDto, Pageable pageable) {
//
//        List<Item> content = queryFactory
//                .selectFrom(QItem.item)
//                .where(regDtsAfter(itemSearchDto.getSearchDateType()),
//                        searchSellStatusEq(itemSearchDto.getSearchSellStatus()),
//                        searchByLike(itemSearchDto.getSearchBy(), itemSearchDto.getSearchQuery()))
//                .orderBy(QItem.item.id.desc())
//                .offset(pageable.getOffset())
//                .limit(pageable.getPageSize())
//                .fetch();
//
//        return new PageImpl<>(content,pageable, content.size());
//    }
//
//    private BooleanExpression itemNmLike(String searchQuery) {
//        return searchQuery == null || searchQuery.isEmpty() ? null : QItem.item.itemNm.like("%" + searchQuery + "%");
//    }
//
//    @Override //메인페이지에 보여줄 상품 리스트를 가져오는 메소드
//    public Page<MainItemDto> getMainItemPage(ItemSearchDto itemSearchDto, Pageable pageable) {
//
//        QItem item = QItem.item;
//        QItemImg itemImg = QItemImg.itemImg;
//
//        List<MainItemDto> content = queryFactory
//                .select(
//                        new QMainItemDto(
//                        item.id,
//                        item.itemNm,
//                        item.itemDetail,
//                        itemImg.imgUrl,
//                        item.price,
//                        item.stockNumber,
//                        item.itemSellStatus
//                        )
//                )
//                .from(itemImg)
//                .join(itemImg.item, item)
//                .where(itemImg.repimgYn.eq("Y"))
//                .where(itemNmLike(itemSearchDto.getSearchQuery()))
//                .orderBy(item.id.desc())
//                .offset(pageable.getOffset())
//                .limit(pageable.getPageSize())
//                .fetch();
//
//
//        return new PageImpl<>(content, pageable, content.size());
//    }
//}

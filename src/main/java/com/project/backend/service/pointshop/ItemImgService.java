//package com.project.backend.service.pointshop;
//
//import com.project.backend.entity.pointshop.ItemImg;
//import com.project.backend.repository.pointshop.ItemImgRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.multipart.MultipartFile;
//import jakarta.persistence.EntityNotFoundException;
//
//
//@Service
//@RequiredArgsConstructor
//@Transactional
//public class ItemImgService {
//
//    @Value("${itemImgLocation}")
//    private String itemImgLocation;
//
//    private final ItemImgRepository itemImgRepository;
//    private final FileService fileService;
//
//    // 상품 이미지 저장
//    public void saveItemImg(ItemImg itemImg, MultipartFile itemImgFile) throws Exception {
//        String oriImgName = itemImgFile.getOriginalFilename();
//        String imgName = "";
//        String imgUrl = "";
//
//        // 파일 업로드
//        if (oriImgName != null && !oriImgName.isEmpty()) {
//            byte[] imgBytes = itemImgFile.getBytes();
//            imgName = fileService.uploadFile(itemImgLocation, oriImgName, imgBytes);
//            imgUrl = "/images/item/" + imgName;
//        }
//
//        // 상품 이미지 정보 저장
//        itemImg.updateItemImg(oriImgName, imgName, imgUrl);
//        itemImgRepository.save(itemImg);
//    }
//
//    // 상품 이미지 수정
//    public void updateItemImg(Long itemImgId, MultipartFile itemImgFile) throws Exception {
//
//        // 상품 이미지를 수정한 경우
//        if (!itemImgFile.isEmpty()) {
//            // 기존에 저장했던 상품 이미지 엔티티 조회
//            ItemImg savedItemImg = itemImgRepository.findById(itemImgId)
//                    .orElseThrow(EntityNotFoundException::new);
//
//            // 기존 이미지 파일 삭제
//            String imgName = savedItemImg.getImgName();
//            if (imgName != null && !imgName.isEmpty()) {
//                fileService.deleteFile(itemImgLocation + "/" + imgName);
//            }
//
//            String oriImgName = itemImgFile.getOriginalFilename();
//            byte[] imgBytes = itemImgFile.getBytes();
//            String newImgName = fileService.uploadFile(itemImgLocation, oriImgName, imgBytes);
//            String imgUrl = "/images/item/" + newImgName;
//            savedItemImg.updateItemImg(oriImgName, newImgName, imgUrl);
//        }
//    }
//}

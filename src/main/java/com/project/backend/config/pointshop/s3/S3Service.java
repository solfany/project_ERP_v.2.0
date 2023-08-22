package com.project.backend.config.pointshop.s3;


import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Component
@RequiredArgsConstructor
@Slf4j
public class S3Service {
    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucketName}")
    public String bucket;  // S3 버킷 이름

    // 최초 게시글 작성 시 업로드
    public String uploadFile(MultipartFile file, String s3Path) {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());

        try (InputStream inputStream = file.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucket, s3Path, inputStream, objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead));
            return amazonS3Client.getUrl(bucket, s3Path).toString();

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드 실패");
        }
    }

    // 섬네일 저장

    public String uploadThumbFile(MultipartFile file, String thumbS3Path) {
        try {
            BufferedImage bufferImage = ImageIO.read(file.getInputStream());
            BufferedImage thumbnailImage = Thumbnails.of(bufferImage).size(400, 333).asBufferedImage();

            ByteArrayOutputStream thumbOutput = new ByteArrayOutputStream();
            String imageType = file.getContentType();
            ImageIO.write(thumbnailImage, imageType.substring(imageType.indexOf("/") + 1), thumbOutput);

            ObjectMetadata objectMetadata = new ObjectMetadata();
            byte[] thumbBytes = thumbOutput.toByteArray();
            objectMetadata.setContentLength(thumbBytes.length);
            objectMetadata.setContentType(file.getContentType());

            InputStream thumbStream = new ByteArrayInputStream(thumbBytes);
            amazonS3Client.putObject(new PutObjectRequest(bucket, thumbS3Path, thumbStream, objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead));
            return amazonS3Client.getUrl(bucket, thumbS3Path).toString();

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드 실패");
        }
    }


    // 글 수정 시 기존 s3에 있는 이미지 정보 삭제,
    public String reUpload(MultipartFile file, String currentFilePath, String imageKey) {
        String fileName = currentFilePath + "/"  /*createFileName(file.getOriginalFilename())*/; // 파일명 랜덤화
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());

        amazonS3Client.deleteObject(bucket, imageKey);

        try (InputStream inputStream = file.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead));
            return amazonS3Client.getUrl(bucket, fileName).toString();
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패");
        }

    }

    public void deletefeed(String imageKey) {
        amazonS3Client.deleteObject(bucket, imageKey);
    }
}

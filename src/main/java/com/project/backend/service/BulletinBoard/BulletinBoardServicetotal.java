package com.project.backend.service.BulletinBoard;

import com.project.backend.dto.BulletinBoard.BulletinBoardDto;
import com.project.backend.entity.bulletinboard.BulletinBoard;
import com.project.backend.exception.bulletinboard.ResourceNotFoundException;
import com.project.backend.repository.bulletinboard.BulletinBoardRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BulletinBoardServicetotal {

  private  final BulletinBoardRepository bulletinBoardRepository;

  @Autowired
  public BulletinBoardServicetotal(BulletinBoardRepository bulletinBoardRepository) {
    this.bulletinBoardRepository = bulletinBoardRepository;

  }

  public List<BulletinBoardDto> getBulletinBoardPost() {
    List<BulletinBoard> bulletinBoards = bulletinBoardRepository.findAll();
    List<BulletinBoardDto> bulletinBoardDtos = new ArrayList<>();

    for (BulletinBoard bulletinBoard : bulletinBoards) {
      BulletinBoardDto bulletinBoardDto = new BulletinBoardDto();
      BeanUtils.copyProperties(bulletinBoard, bulletinBoardDto);
      bulletinBoardDtos.add(bulletinBoardDto);
    }

    return bulletinBoardDtos;
  }

  public void createBulletinBoardData(BulletinBoardDto bulletinBoardDto) {
    BulletinBoard bulletinBoard = new BulletinBoard();
    BeanUtils.copyProperties(bulletinBoardDto, bulletinBoard);
    bulletinBoardRepository.save(bulletinBoard);
  }

  public BulletinBoardDto getBulletinBoardPostByPostNum(Long postNum) {
    BulletinBoard bulletinBoard = bulletinBoardRepository.findByPostNum(postNum)
      .orElseThrow(() -> new ResourceNotFoundException("Post not found with postNum " + postNum));
    BulletinBoardDto bulletinBoardDto = new BulletinBoardDto();
    BeanUtils.copyProperties(bulletinBoard, bulletinBoardDto);
    return bulletinBoardDto;
  }

  public void updateBulletinBoardPost(BulletinBoardDto bulletinBoardPost) {
    BulletinBoard bulletinBoard = bulletinBoardRepository.findByPostNum(bulletinBoardPost.getPostNum())
      .orElseThrow(() -> new ResourceNotFoundException("Post not found with postNum " + bulletinBoardPost.getPostNum()));
    bulletinBoard.setPostCountNum(bulletinBoardPost.getPostCountNum());
    bulletinBoardRepository.save(bulletinBoard);
  }



//게시물 삭제
  public void deleteBulletinBoard(Long postNum) {
    bulletinBoardRepository.deleteById(postNum);
  }


  //게시물 수정

  public void updateBulletinBoardPost(Long postNum, BulletinBoardDto bulletinBoardDto) {
    BulletinBoard post = bulletinBoardRepository.findById(postNum)
      .orElseThrow(() -> new IllegalArgumentException("해당 게시물이 없습니다. id=" + postNum));

    post.setPostTitle(bulletinBoardDto.getPostTitle());
    post.setPostContent(bulletinBoardDto.getPostContent());
    post.setHashtagName(bulletinBoardDto.getHashtagName());
    post.setPostCategory(bulletinBoardDto.getPostCategory());
    post.setPostDateEdit(bulletinBoardDto.getPostDateEdit());

    bulletinBoardRepository.save(post);
  }
//===========================

}


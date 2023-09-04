package com.project.backend.service.BulletinBoard;

import com.project.backend.dto.BulletinBoard.BulletinBoardDto;
import com.project.backend.entity.bulletinboard.BulletinBoard;
import com.project.backend.repository.bulletinboard.BulletinBoardRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class BulletinBoardServiceImpl implements BulletinBoardService {

  private final BulletinBoardRepository bulletinBoardRepository;

  @Autowired
  public BulletinBoardServiceImpl(BulletinBoardRepository bulletinBoardRepository) {
    this.bulletinBoardRepository = bulletinBoardRepository;
  }

  @Override
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

  @Override
  public void createBulletinBoardData(BulletinBoardDto bulletinBoardDto) {
    BulletinBoard bulletinBoard = new BulletinBoard();
    BeanUtils.copyProperties(bulletinBoardDto, bulletinBoard);
    bulletinBoardRepository.save(bulletinBoard);
  }

  @Override
  public BulletinBoardDto getBulletinBoardPostByPostNum(Long postNum) {
    if(postNum == null) {
      throw new IllegalArgumentException("postNum은 null일 수 없습니다.");
    }
    BulletinBoard bulletinBoard = bulletinBoardRepository.findByPostNum(postNum)
      .orElseThrow(() -> new IllegalArgumentException("해당 postNum의 게시물이 존재하지 않습니다."));
    BulletinBoardDto bulletinBoardDto = new BulletinBoardDto();
    BeanUtils.copyProperties(bulletinBoard, bulletinBoardDto);
    return bulletinBoardDto;
  }

}

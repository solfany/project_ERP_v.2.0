package com.project.backend.service.BulletinBoard;

import com.project.backend.dto.BulletinBoard.BulletinBoardDto;

import java.util.List;

public interface BulletinBoardService {
  List<BulletinBoardDto> getBulletinBoardPost();
  void createBulletinBoardData(BulletinBoardDto bulletinBoardDto);
  BulletinBoardDto getBulletinBoardPostByPostNum(Long postNum);


}
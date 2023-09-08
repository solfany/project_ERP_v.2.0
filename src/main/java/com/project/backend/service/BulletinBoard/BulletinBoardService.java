package com.project.backend.service.BulletinBoard;

import com.project.backend.dto.BulletinBoard.BulletinBoardDto;
import com.project.backend.dto.BulletinBoard.PostLikeDto;
import com.project.backend.dto.BulletinBoard.PostRecommendDto;

import java.util.List;

public interface BulletinBoardService {
  List<BulletinBoardDto> getBulletinBoardPost();
  void createBulletinBoardData(BulletinBoardDto bulletinBoardDto);
  BulletinBoardDto getBulletinBoardPostByPostNum(Long postNum);

}
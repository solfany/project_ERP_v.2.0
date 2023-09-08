package com.project.backend.dto.BulletinBoard;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
public class BulletinBoardDto {

  private Long postNum;
  private String empId;
  private String empNum;
  private String postTitle;
  private String postContent;
  private Date postDate;
  private int postCountNum;
  private int postLike;
  private int postRecommend;
  private String postCategory;
  private Date postDateEdit;
  private String hashtagName;
  private Date hashtagDate;
  private Date hashtagDateEdit;
  private String email;


  @Getter
  @Setter
  public class LikeToggleRequestDto {
    private Long postNum;  // 게시물 번호
    private String empId;  // 좋아요를 클릭한 직원의 ID
  }

  @Getter
  @Setter
  public class RecommendToggleRequestDto {
    private Long postNum;  // 게시물 번호
    private String empId;  // 추천을 클릭한 직원의 ID
  }

  @Getter
  @Setter
  public class LikeToggleResponseDto {
    private boolean success;
    private boolean likeStatus;  // 현재 좋아요 상태 (예: 좋아요가 활성화되었는지 여부)
    private int likeCount;  // 해당 게시물의 전체 좋아요 수
  }

  @Getter
  @Setter
  public class RecommendToggleResponseDto {
    private boolean success;
    private boolean recommendStatus;  // 현재 추천 상태 (예: 추천이 활성화되었는지 여부)
    private int recommendCount;  // 해당 게시물의 전체 추천 수
  }
}

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

  // getters and setters
}

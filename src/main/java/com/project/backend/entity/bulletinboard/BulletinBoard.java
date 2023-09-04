package com.project.backend.entity.bulletinboard;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Entity
@Table(name = "bulletinboard")
@Getter
@Setter
@ToString
public class BulletinBoard {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "post_Num")
  private Long postNum;

  @Column(name = "emp_Id")  //로그인 정보와 조인
  private String empId;

  @Column(name = "emp_Num") // 조그인 정보에서 받아와야함
  private String empNum;

  @Column(name = "post_Title", nullable = false)
  private String postTitle;

  @Column(name = "post_Content", nullable = false, length = 50000)
  private String postContent;

  @Column(name = "post_Date", nullable = false)
  private Date postDate;

  @Column(name = "post_Count_Num")
  private int postCountNum;

  @Column(name = "post_Like")
  private int postLike;

  @Column(name = "post_Recommend")
  private int postRecommend;

  @Column(name = "post_Category", nullable = false)
  private String postCategory;

  @Column(name = "post_Date_Edit")
  private Date postDateEdit;


  @Column(name = "hashtag_Name")
  private String hashtagName;


  //  nullable = false
  @Column(name = "hashtag_date")
  private Date hashtagDate;


  @Column(name = "hashtag_date_edit")
  private Date hashtagDateEdit;

  @Column(name = "email")
  private String email;


  // Constructors, other methods, if any
}

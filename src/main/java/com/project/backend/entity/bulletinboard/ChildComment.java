package com.project.backend.entity.bulletinboard;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Entity
@Table(name = "child_comment")
@Getter
@Setter
public class ChildComment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "comment_Id", nullable = false)
  private Long commentId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "parent_comment_Id", nullable = false)
  private ParentComment parentComment;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "bulletin_board_Id")
  private BulletinBoard bulletinBoard;


  @Column(name = "emp_Id")
  private String empId;

  @Column(name = "emp_Num")
  private String empNum;

  @Column(name = "email")
  private String email;

  @Column(name = "comment_Content")
  private String commentContent;

  @Column(name = "comment_Date")
  private Date commentDate;

  @Column(name = "comment_Edit")
  private Date commentEdit;

  @Column(name = "comment_Edit_Date")
  private Date commentEditDate;

  // Constructors, other methods, if any
}
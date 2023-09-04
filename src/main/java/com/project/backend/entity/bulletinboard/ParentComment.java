package com.project.backend.entity.bulletinboard;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Entity
@Table(name = "parent_comment")
@Getter
@Setter
public class ParentComment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "comment_Id", nullable = false)
  private Long commentId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "post_Num", nullable = false)
  private BulletinBoard bulletinBoard;


  @OneToMany(mappedBy = "parentComment", cascade = CascadeType.ALL)
  private List<ChildComment> childComments = new ArrayList<>();


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

package com.project.backend.dto.BulletinBoard;

import java.util.Date;

public class ChildCommentDto {

  private String empId;
  private String empNum;
  private String email;
  private String commentContent;
  private Date commentDate;
  private Date commentEdit;
  private Date commentEditDate;

  private  Long commentId;

  private Long parentCommentId;


  public Long getParentCommentId() {
    return parentCommentId;
  }

  public void setParentCommentId(Long parentCommentId) {
    this.parentCommentId = parentCommentId;
  }
  // getters and setters


  public Long getCommentId() {
    return commentId;
  }

  public void setCommentId(Long commentId) {
    this.commentId = commentId;
  }


  public String getEmpId() {
    return empId;
  }

  public void setEmpId(String empId) {
    this.empId = empId;
  }

  public String getEmpNum() {
    return empNum;
  }

  public void setEmpNum(String empNum) {
    this.empNum = empNum;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getCommentContent() {
    return commentContent;
  }

  public void setCommentContent(String commentContent) {
    this.commentContent = commentContent;
  }

  public Date getCommentDate() {
    return commentDate;
  }

  public void setCommentDate(Date commentDate) {
    this.commentDate = commentDate;
  }

  public Date getCommentEdit() {
    return commentEdit;
  }

  public void setCommentEdit(Date commentEdit) {
    this.commentEdit = commentEdit;
  }

  public Date getCommentEditDate() {
    return commentEditDate;
  }

  public void setCommentEditDate(Date commentEditDate) {
    this.commentEditDate = commentEditDate;
  }


}

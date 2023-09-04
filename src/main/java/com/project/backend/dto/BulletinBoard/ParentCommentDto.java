package com.project.backend.dto.BulletinBoard;

import java.util.Date;
import java.util.List;

public class ParentCommentDto {

  private Long commentId;
  private Long postNum;
  private String empId;
  private String empNum;
  private String email;
  private String commentContent;
  private Date commentDate;
  private Date commentEdit;
  private Date commentEditDate;

//  자식 댓글 리스트
  private List<ChildCommentDto> childComments;









  public Long getCommentId() {
    return commentId;

  }

  public List<ChildCommentDto> getChildComments() {
    return childComments;
  }
  public void setChildComments(List<ChildCommentDto> childComments) {
    this.childComments = childComments;
  }

  public void setCommentId(Long commentId) {
    this.commentId = commentId;
  }

  public Long getPostNum() {
    return postNum;
  }

  public void setPostNum(Long postNum) {
    this.postNum = postNum;
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

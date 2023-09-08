package com.project.backend.service.BulletinBoard;

import com.project.backend.dto.BulletinBoard.ChildCommentDto;
import com.project.backend.dto.BulletinBoard.ParentCommentDto;
import com.project.backend.entity.bulletinboard.BulletinBoard;
import com.project.backend.entity.bulletinboard.ChildComment;
import com.project.backend.entity.bulletinboard.ParentComment;
import com.project.backend.repository.bulletinboard.BulletinBoardRepository;
import com.project.backend.repository.bulletinboard.ChildCommentRepository;
import com.project.backend.repository.bulletinboard.ParentCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {




  @Autowired
  private BulletinBoardRepository bulletinBoardRepository;

  @Autowired
  private ParentCommentRepository parentCommentRepository;

  @Autowired
  private ChildCommentRepository childCommentRepository;

  public void addParentComment(Long postNum, ParentCommentDto parentCommentDto) {
    BulletinBoard bulletinBoard = bulletinBoardRepository.findById(postNum)
      .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + postNum));
    ParentComment parentComment = new ParentComment();
    parentComment.setBulletinBoard(bulletinBoard);
    parentComment.setCommentContent(parentCommentDto.getCommentContent());
    parentComment.setEmpId(parentCommentDto.getEmpId());
    parentComment.setEmpNum(parentCommentDto.getEmpNum());
    parentComment.setEmail(parentCommentDto.getEmail());
    parentComment.setCommentDate(parentCommentDto.getCommentDate());
    parentComment.setCommentEdit(parentCommentDto.getCommentEdit());
    parentComment.setCommentEditDate(parentCommentDto.getCommentEditDate());
    parentCommentRepository.save(parentComment);
  }

  public void addChildComment(Long postNum, Long parentCommentId, ChildCommentDto childCommentDto) {
    BulletinBoard bulletinBoard = bulletinBoardRepository.findById(postNum)
      .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + postNum));
    ParentComment parentComment = parentCommentRepository.findById(parentCommentId)
      .orElseThrow(() -> new IllegalArgumentException("해당 부모 댓글이 없습니다. id=" + parentCommentId));
    ChildComment childComment = new ChildComment();
    childComment.setBulletinBoard(bulletinBoard);
    childComment.setParentComment(parentComment);
    // Set the rest of the fields from childCommentDto
    childComment.setEmpId(childCommentDto.getEmpId());
    childComment.setEmpNum(childCommentDto.getEmpNum());
    childComment.setEmail(childCommentDto.getEmail());
    childComment.setCommentContent(childCommentDto.getCommentContent());
    childComment.setCommentDate(childCommentDto.getCommentDate());
    childComment.setCommentEdit(childCommentDto.getCommentEdit());
    childComment.setCommentEditDate(childCommentDto.getCommentEditDate());

    childCommentRepository.save(childComment);
  }

  public List<ParentCommentDto> getCommentsByBulletinBoardId(Long postNum) {
    BulletinBoard bulletinBoard = bulletinBoardRepository.findById(postNum)
      .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + postNum));
    List<ParentComment> parentComments = parentCommentRepository.findByBulletinBoard(bulletinBoard);

    return parentComments.stream()
      .map(parentComment -> {
        ParentCommentDto parentCommentDto = new ParentCommentDto();
        parentCommentDto.setCommentContent(parentComment.getCommentContent());
        parentCommentDto.setCommentId(parentComment.getCommentId());
        parentCommentDto.setEmpId(parentComment.getEmpId());
        parentCommentDto.setEmpNum(parentComment.getEmpNum());
        parentCommentDto.setEmail(parentComment.getEmail());
        parentCommentDto.setCommentDate(parentComment.getCommentDate());
        parentCommentDto.setCommentEdit(parentComment.getCommentEdit());
        parentCommentDto.setCommentEditDate(parentComment.getCommentEditDate());

        // 자식 댓글 리스트를 가져와서 ParentCommentDto에 추가
        List<ChildComment> childCommentsForThisParent = childCommentRepository.findByParentComment(parentComment);
        List<ChildCommentDto> childCommentDtos = childCommentsForThisParent.stream().map(childComment -> {
          ChildCommentDto childCommentDto = new ChildCommentDto();
          childCommentDto.setCommentContent(childComment.getCommentContent());
          childCommentDto.setCommentId(childComment.getCommentId());
          childCommentDto.setEmpId(childComment.getEmpId());
          childCommentDto.setEmpNum(childComment.getEmpNum());
          childCommentDto.setEmail(childComment.getEmail());
          childCommentDto.setCommentDate(childComment.getCommentDate());
          childCommentDto.setCommentEdit(childComment.getCommentEdit());
          childCommentDto.setCommentEditDate(childComment.getCommentEditDate());
          return childCommentDto;
        }).collect(Collectors.toList());
        parentCommentDto.setChildComments(childCommentDtos);

        return parentCommentDto;
      })
      .collect(Collectors.toList());
  }



  // 부모 댓글 삭제
  public void deleteParentComment(Long postNum, Long commentId) {
    // 게시글의 존재 확인
    BulletinBoard bulletinBoard = bulletinBoardRepository.findById(postNum)
      .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + postNum));

    // 댓글의 존재 확인
    ParentComment parentComment = parentCommentRepository.findById(commentId)
      .orElseThrow(() -> new IllegalArgumentException("해당 부모 댓글이 없습니다. id=" + commentId));

    // 댓글 삭제
    // CascadeType.ALL로 설정했기 때문에 부모 댓글 삭제 시 연관된 자식 댓글들도 모두 삭제됩니다.
    parentCommentRepository.delete(parentComment);
  }

  // 자식 댓글 삭제
  public void deleteChildComment(Long postNum, Long childCommentId) {
    // 게시글의 존재 확인
    BulletinBoard bulletinBoard = bulletinBoardRepository.findById(postNum)
      .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + postNum));

    // 자식 댓글의 존재 확인
    ChildComment childComment = childCommentRepository.findById(childCommentId)
      .orElseThrow(() -> new IllegalArgumentException("해당 자식 댓글이 없습니다. id=" + childCommentId));

    // 자식 댓글 삭제
    childCommentRepository.delete(childComment);
  }
}


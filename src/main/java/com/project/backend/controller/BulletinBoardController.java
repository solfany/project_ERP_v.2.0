package com.project.backend.controller;

import com.project.backend.dto.BulletinBoard.BulletinBoardDto;
import com.project.backend.dto.BulletinBoard.ChildCommentDto;
import com.project.backend.dto.BulletinBoard.ParentCommentDto;
import com.project.backend.service.BulletinBoard.BulletinBoardServicetotal;
import com.project.backend.service.BulletinBoard.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bulletinboard")
public class BulletinBoardController {

  private final BulletinBoardServicetotal bulletinBoardServicetotal;
  private final CommentService commentService;

  public BulletinBoardController(BulletinBoardServicetotal bulletinBoardServicetotal, CommentService commentService) {
    this.bulletinBoardServicetotal = bulletinBoardServicetotal;
    this.commentService = commentService;
  }

  @GetMapping
  public ResponseEntity<List<BulletinBoardDto>> getBulletinBoardData() {
    List<BulletinBoardDto> bulletinBoardData = bulletinBoardServicetotal.getBulletinBoardPost();
    return new ResponseEntity<>(bulletinBoardData, HttpStatus.OK);
  }

  // 게시물 등록
  @PostMapping("/add")
  public ResponseEntity<String> addBulletinBoardPost(@RequestBody BulletinBoardDto bulletinBoardDto) {
    try {
      bulletinBoardServicetotal.createBulletinBoardData(bulletinBoardDto);
      return ResponseEntity.ok("게시물이 등록되었습니다.");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시물 등록 중 오류가 발생했습니다.");
    }
  }

  //게시물 페이지 이동 렌더링
  @GetMapping("/BulletinBoardPages/{postNum}")
  public ResponseEntity<BulletinBoardDto> getBulletinBoardPost(@PathVariable Long postNum) {
    BulletinBoardDto bulletinBoardPost = bulletinBoardServicetotal.getBulletinBoardPostByPostNum(postNum);
    return new ResponseEntity<>(bulletinBoardPost, HttpStatus.OK);
  }

  // 조회수 카운트
  @PutMapping("/update/{postNum}")
  public ResponseEntity<String> updateBulletinBoardPost(@PathVariable Long postNum, @RequestBody BulletinBoardDto bulletinBoardDto) {
    try {
      bulletinBoardDto.setPostNum(postNum);
      bulletinBoardServicetotal.updateBulletinBoardPost(bulletinBoardDto);
      return ResponseEntity.ok("게시물이 업데이트되었습니다.");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시물 업데이트 중 오류가 발생했습니다.");
    }
  }

  //게시물 삭제
  @DeleteMapping("/BulletinBoardPages/{postNum}")
  public ResponseEntity<String> deleteBulletinBoard(@PathVariable Long postNum) {
    try {
      bulletinBoardServicetotal.deleteBulletinBoard(postNum);
      return ResponseEntity.ok("게시물이 성공적으로 삭제되었습니다.");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시물을 삭제하는 도중 오류가 발생했습니다.");
    }
  }


  //게시물 수정
  @PutMapping("/BulletinBoardPagesEdit/update/{postNum}")
  public ResponseEntity<String> updatePost(@PathVariable Long postNum, @RequestBody BulletinBoardDto bulletinBoardDto) {
    try {
      bulletinBoardServicetotal.updateBulletinBoardPost(postNum, bulletinBoardDto);
      return ResponseEntity.ok("게시물이 업데이트되었습니다.");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시물 업데이트 중 오류가 발생했습니다.");
    }
  }

  //부모 댓글 저장 로직
  @PostMapping("/BulletinBoardPages/addParentComment/{postNum}")
  public ResponseEntity<String> addParentComment(@PathVariable Long postNum, @RequestBody ParentCommentDto parentCommentDto) {
    try {
      commentService.addParentComment(postNum, parentCommentDto);
      return ResponseEntity.ok("부모 댓글이 등록되었습니다.");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("부모 댓글 등록 중 오류가 발생했습니다.");
    }
  }

  //자식 댓글 저장 로직
  @PostMapping("/BulletinBoardPages/addChildComment/{postNum}")
  public ResponseEntity<String> addChildComment(
    @PathVariable Long postNum,
    @RequestBody ChildCommentDto childCommentDto
  ) {
    try {
      // 클라이언트에서 받아온 parentCommentId를 사용하여 자식 댓글에 연결
      Long parentCommentId = childCommentDto.getParentCommentId();
      if (parentCommentId == null) {
        return ResponseEntity.badRequest().body("부모 댓글 ID가 제공되지 않았습니다.");
      }

      commentService.addChildComment(postNum, parentCommentId, childCommentDto);
      return ResponseEntity.ok("자식 댓글이 등록되었습니다.");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("자식 댓글 등록 중 오류가 발생했습니다.");
    }
  }


  //부모 댓글과 자식 댓글 보여주기
  @GetMapping("/BulletinBoardPages/{postNum}/comments")
  public ResponseEntity<List<ParentCommentDto>> getCommentsByBulletinBoardId(@PathVariable Long postNum) {
    List<ParentCommentDto> comments = commentService.getCommentsByBulletinBoardId(postNum);
    return ResponseEntity.ok(comments);
  }


  // 부모 댓글 삭제
  @DeleteMapping("/BulletinBoardPages/{postNum}/deleteParentComment/{commentId}")
  public ResponseEntity<String> deleteParentComment(@PathVariable Long postNum, @PathVariable Long commentId) {
    try {
      commentService.deleteParentComment(postNum, commentId);
      return ResponseEntity.ok("부모 댓글 및 관련된 자식 댓글들이 삭제되었습니다.");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("부모 댓글 삭제 중 오류가 발생했습니다.");
    }
  }

  // 자식 댓글 삭제
  @DeleteMapping("/BulletinBoardPages/{postNum}/deleteChildComment/{commentId}")
  public ResponseEntity<String> deleteChildComment(@PathVariable Long postNum, @PathVariable Long commentId) {
    try {
      commentService.deleteChildComment(postNum, commentId);
      return ResponseEntity.ok("자식 댓글이 삭제되었습니다.");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("자식 댓글 삭제 중 오류가 발생했습니다.");
    }
  }


}
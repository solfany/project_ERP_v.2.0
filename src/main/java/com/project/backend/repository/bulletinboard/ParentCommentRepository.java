package com.project.backend.repository.bulletinboard;

import com.project.backend.entity.bulletinboard.BulletinBoard;
import com.project.backend.entity.bulletinboard.ParentComment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParentCommentRepository extends JpaRepository<ParentComment, Long> {
  List<ParentComment> findByBulletinBoard(BulletinBoard bulletinBoard);
  // 커스텀 삭제 메소드 추가
  @Transactional
  void deleteByBulletinBoard(BulletinBoard bulletinBoard);
}

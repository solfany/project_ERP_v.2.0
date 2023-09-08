package com.project.backend.repository.bulletinboard;

import com.project.backend.entity.bulletinboard.BulletinBoard;
import com.project.backend.entity.bulletinboard.ChildComment;
import com.project.backend.entity.bulletinboard.ParentComment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChildCommentRepository extends JpaRepository<ChildComment, Long> {
  List<ChildComment> findByParentComment(ParentComment parentComment);
  @Transactional
  void deleteByParentComment(ParentComment parentComment);

}

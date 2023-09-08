package com.project.backend.repository.bulletinboard;

import com.project.backend.entity.bulletinboard.BulletinBoard;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BulletinBoardRepository extends JpaRepository<BulletinBoard, Long> {
  Optional<BulletinBoard> findByPostNum(Long postNum);





}

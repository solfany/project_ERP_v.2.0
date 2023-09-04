package com.project.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.backend.entity.RefreshToken;



public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
  
  public Optional<RefreshToken> findByEmpNum(Long empNum);
  public Optional<RefreshToken> findByRefreshToken(String refreshToken);
}

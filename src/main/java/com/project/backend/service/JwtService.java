package com.project.backend.service;

import java.io.ObjectInputFilter.Config;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.backend.config.jwt.JwtTokenProvider;
import com.project.backend.dto.TokenDto;
import com.project.backend.entity.RefreshToken;
import com.project.backend.entity.Staff;
import com.project.backend.repository.RefreshTokenRepository;
import com.project.backend.repository.StaffRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class JwtService {
  private final ApplicationContext context; // @Autowired
  private final StaffRepository staffRepository;
  private final RefreshTokenRepository refreshTokenRepository;

  public Optional<RefreshToken> findByRefreshToken(String refreshToken) {
    return refreshTokenRepository.findByRefreshToken(refreshToken);
  }
  
  /**
   * save refresh token
   * 
   * @param tokenDto
   */
  public void saveRefreshToken(TokenDto tokenDto) {
    refreshTokenRepository.findByEmpNum(tokenDto.getEmpNum())
        .ifPresentOrElse(
            r -> {
              r.setRefreshToken(tokenDto.getRefreshToken());
            },
            () -> {
              RefreshToken token = RefreshToken.builder().empNum(tokenDto.getEmpNum())
                  .refreshToken(tokenDto.getRefreshToken()).build();
              refreshTokenRepository.save(token);
            });
  }

  public TokenDto refresh(String bearerRefreshToken) {
    JwtTokenProvider jwtTokenProvider = context.getBean(JwtTokenProvider.class);

    String refreshToken = jwtTokenProvider.getBearerTokenToString(bearerRefreshToken);

    // 유효한 refresh token 인지 체크
    if (!jwtTokenProvider.validateToken(refreshToken)) {
      throw new AccessDeniedException("AccessDeniedException 2");
    }

    // refresh token 있으면 값 반환, 없으면 Exception
    RefreshToken findRefreshToken = this.findByRefreshToken(refreshToken)
        .orElseThrow(() -> new UsernameNotFoundException("refresh token was not found"));

    // refresh token 을 활용하여 user email 정보 획득
    Staff staff = staffRepository.findByEmpNum(findRefreshToken.getEmpNum());

    // access token 과 refresh token 모두를 재발급
    Authentication authentication = jwtTokenProvider.getAuthenticationByUsername(staff.getEmpId());
    String newAccessToken = jwtTokenProvider.generateAccessToken(authentication);
    String newRefreshToken = jwtTokenProvider.generateRefreshToken();

    TokenDto tokenDto = TokenDto.builder().EmpNum(findRefreshToken.getEmpNum()).accessToken(newAccessToken)
        .refreshToken(newRefreshToken).build();

    this.saveRefreshToken(tokenDto);

    return tokenDto;
  }
}

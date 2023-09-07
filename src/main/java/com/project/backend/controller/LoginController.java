package com.project.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.config.auth.PrincipalDetails;
import com.project.backend.config.jwt.JwtTokenProvider;
import com.project.backend.dto.LoginDto;
import com.project.backend.dto.TokenDto;
import com.project.backend.service.JwtService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class LoginController {
  private final AuthenticationManager authenticationManager;
  private final JwtTokenProvider jwtTokenProvider;
  private final JwtService jwtService;

  @RequestMapping(value = "/login", method = { RequestMethod.POST,
      RequestMethod.GET }, produces = MediaType.APPLICATION_JSON_VALUE)
  public TokenDto Login(final HttpServletRequest request, final HttpServletResponse response,
      @RequestBody LoginDto loginDto) {

    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
        loginDto.getEmpId(), loginDto.getEmpPwd());

    Authentication authentication = authenticationManager.authenticate(authenticationToken);

    PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
    log.info("LOGIN SUCCESS >>> " + principalDetails.getStaff().getEmpId());

    String accessToken = jwtTokenProvider.generateAccessToken(authentication);
    String refreshToken = jwtTokenProvider.generateRefreshToken();

    // Staff 정보를 쿠키에 저장
    Cookie staffCookie = new Cookie("staffId", principalDetails.getStaff().getEmpId());
    staffCookie.setMaxAge(3600); // 쿠키 유효 시간 설정 (초 단위)
    staffCookie.setPath("/"); // 쿠키 경로 설정
    response.addCookie(staffCookie);

    // 토큰을 쿠키에 저장
    Cookie tokenCookie = new Cookie("accessToken", accessToken);
    tokenCookie.setMaxAge(3600); // 쿠키 유효 시간 설정 (초 단위)
    tokenCookie.setPath("/"); // 쿠키 경로 설정
    response.addCookie(tokenCookie);

    TokenDto jwtDto = TokenDto.builder().accessToken(accessToken).build();

    jwtTokenProvider.setHeaderAccessToken(response, accessToken);
    jwtTokenProvider.setHeaderRefreshToken(response, refreshToken);
    log.info("Generated Access Token: {}", accessToken);
    log.info("Generated Refresh Token: {}", refreshToken);
    return jwtDto;
  }
}
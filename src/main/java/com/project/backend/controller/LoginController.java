package com.project.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.config.auth.PrincipalDetails;
import com.project.backend.config.jwt.JwtTokenProvider;
import com.project.backend.dto.LoginDto;
import com.project.backend.dto.TokenDto;
import com.project.backend.service.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;



import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;



@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class LoginController {
  private final AuthenticationManager authenticationManager; // @Autowired
  private final JwtTokenProvider jwtTokenProvider;
  private final JwtService jwtService;

  @RequestMapping(value = "refresh", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
  public TokenDto refresh(
      final HttpServletRequest request,
      final HttpServletResponse response,
      @RequestHeader(value = "X-REFRESH-TOKEN", required = true) String bearerRefreshToken) {

    TokenDto tokenDto = jwtService.refresh(bearerRefreshToken);

    jwtTokenProvider.setHeaderAccessToken(response, tokenDto.getAccessToken());
    jwtTokenProvider.setHeaderRefreshToken(response, tokenDto.getRefreshToken());

    return tokenDto;
  }

  // @PostMapping("signin")
  @RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
  public TokenDto Login(
      final HttpServletRequest request,
      final HttpServletResponse response,
      @RequestBody LoginDto loginDto) {

    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
        loginDto.getEmpId(), loginDto.getEmpPwd());

    // PrincipalDetailsService의 loadUserByUsername 함수가 실행된 후 정상이면 authentication이
    // 리턴됨
    // DB에 있는 username과 password가 일치한다.
    Authentication authentication = authenticationManager.authenticate(authenticationToken);

    // 로그인이 되었다는 뜻.
    PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
    log.info("LOGIN SUCCESS >>> " + principalDetails.getStaff().getEmpId());

    String accessToken = jwtTokenProvider.generateAccessToken(authentication);
    String refreshToken = jwtTokenProvider.generateRefreshToken();

    TokenDto jwtDto = TokenDto.builder().accessToken(accessToken).build();

    jwtTokenProvider.setHeaderAccessToken(response, accessToken);
    jwtTokenProvider.setHeaderRefreshToken(response, refreshToken);
    log.info("Generated Access Token: {}", accessToken);
    log.info("Generated Refresh Token: {}", refreshToken);
    return jwtDto;
  }
}
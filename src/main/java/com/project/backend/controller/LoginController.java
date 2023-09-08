package com.project.backend.controller;

//import org.springframework.security.core.Authentication;

//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.project.backend.config.auth.PrincipalDetails;
//import com.project.backend.config.jwt.JwtTokenProvider;
//import com.project.backend.dto.LoginDto;
//import com.project.backend.dto.TokenDto;
//import com.project.backend.service.JwtService;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestHeader;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.web.bind.annotation.PostMapping;
//
//
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//
//
//
//@Slf4j
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/api")
//public class LoginController {
//  private final AuthenticationManager authenticationManager; // @Autowired
//  private final JwtTokenProvider jwtTokenProvider;
//  private final JwtService jwtService;
//
//  @RequestMapping(value = "refresh", method = {RequestMethod.POST, RequestMethod.GET}, produces = MediaType.APPLICATION_JSON_VALUE)
//  public TokenDto refresh(
//      final HttpServletRequest request,
//      final HttpServletResponse response,
//      @RequestHeader(value = "X-REFRESH-TOKEN", required = true) String bearerRefreshToken) {
//
//    TokenDto tokenDto = jwtService.refresh(bearerRefreshToken);
//
//    jwtTokenProvider.setHeaderAccessToken(response, tokenDto.getAccessToken());
//    jwtTokenProvider.setHeaderRefreshToken(response, tokenDto.getRefreshToken());
//
//    return tokenDto;
//  }
//
//
//  @RequestMapping(value = "/login", method = {RequestMethod.POST, RequestMethod.GET}, produces = MediaType.APPLICATION_JSON_VALUE)
//  public TokenDto Login(
//      final HttpServletRequest request,
//      final HttpServletResponse response,
//      @RequestBody LoginDto loginDto) {
//
//    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//        loginDto.getEmpId(), loginDto.getEmpPwd());
//
//    // PrincipalDetailsService의 loadUserByUsername 함수가 실행된 후 정상이면 authentication이
//    // 리턴됨
//    // DB에 있는 username과 password가 일치한다.
//    Authentication authentication = authenticationManager.authenticate(authenticationToken);
//
//    // 로그인이 되었다는 뜻.
//    PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
//    log.info("LOGIN SUCCESS >>> " + principalDetails.getStaff().getEmpId());
//
//    String accessToken = jwtTokenProvider.generateAccessToken(authentication);
//    String refreshToken = jwtTokenProvider.generateRefreshToken();
//
//    TokenDto jwtDto = TokenDto.builder().accessToken(accessToken).build();
//
//    jwtTokenProvider.setHeaderAccessToken(response, accessToken);
//    jwtTokenProvider.setHeaderRefreshToken(response, refreshToken);
//    log.info("Generated Access Token: {}", accessToken);
//    log.info("Generated Refresh Token: {}", refreshToken);
//    return jwtDto;
//  }
//}

//import com.project.backend.service.StaffService;
//import com.project.backend.dto.StaffDto;
//import com.project.backend.dto.LoginDto;
//import com.project.backend.dto.TokenDto;
//import com.project.backend.entity.Staff;
//import com.project.backend.config.jwt.JwtTokenProvider;
//import com.project.backend.service.JwtService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//
//@Slf4j
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/api")
//public class LoginController {
//   private final AuthenticationManager authenticationManager;
//   private final JwtTokenProvider jwtTokenProvider;
//   private final JwtService jwtService;
//   private final StaffService staffService; // StaffService를 주입받습니다.
//
//   @RequestMapping(value = "/login", method = { RequestMethod.POST,
//         RequestMethod.GET }, produces = MediaType.APPLICATION_JSON_VALUE)
//   public TokenDto Login(final HttpServletRequest request, final HttpServletResponse response,
//         @RequestBody LoginDto loginDto) {
//
//      UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//            loginDto.getEmpId(), loginDto.getEmpPwd());
//
//      Authentication authentication = authenticationManager.authenticate(authenticationToken);
//
//      UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//
//      // Staff 정보를 DB에서 가져와서 Staff 객체로 만듭니다.
//      Staff staff = staffService.findByUsername(loginDto.getEmpId()).orElse(null);
//
//      // Staff 정보를 Staff 객체에서 DTO로 변환 (필요한 경우)
//      StaffDto staffDto = StaffDto.builder().empId(staff.getEmpId()).empName(staff.getEmpName())
//            .email(staff.getEmail()).empNum(staff.getEmpNum()).accountNumber(staff.getAccountNumber())
//            .empPwd(staff.getEmpPwd()).dept(staff.getDept()).position(staff.getPosition())
//            .birthDate(staff.getBirthDate()).phoneNumber(staff.getPhoneNumber()).address(staff.getAddress())
//            .bankName(staff.getBankName())
//
//            .build();
//
//      String accessToken = jwtTokenProvider.generateAccessToken(authentication);
//      String refreshToken = jwtTokenProvider.generateRefreshToken();
//
//      TokenDto jwtDto = TokenDto.builder().accessToken(accessToken).staffInfo(staffDto).build();
//
//      jwtTokenProvider.setHeaderAccessToken(response, accessToken);
//      jwtTokenProvider.setHeaderRefreshToken(response, refreshToken);
//      log.info("Generated Access Token: {}", accessToken);
//      log.info("Generated Refresh Token: {}", refreshToken);
//      return jwtDto;
//   }
//}


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
package com.project.backend.config.jwt;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.backend.config.auth.PrincipalDetails;
import com.project.backend.dto.StaffDto;
import com.project.backend.dto.TokenDto;
import com.project.backend.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
  private final AuthenticationManager authenticationManager; // @Autowired
  private final JwtTokenProvider jwtTokenProvider;
  private final JwtService jwtService;

  // /login 요청을 하면 로그인 시도를 위해서 실행되는 함수
  @Override
  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
      throws AuthenticationException {
    log.info("{} - attemptAuthentication -> 로그인 시도중", this.getClass());

    // request에 있는 username과 password를 파싱해서 자바 Object로 받기
    ObjectMapper om = new ObjectMapper();

    try {
      /*
       * log.info(request.getInputStream().toString());
       * BufferedReader br = request.getReader();
       * String input = null;
       * while((input = br.readLine()) != null) {
       * log.info(input);
       * }
       */
      StaffDto staffDto = om.readValue(request.getInputStream(), StaffDto.class);

      log.info("staff.getEmpId() : {}", staffDto.getEmpId());
      log.info("staff.getEmpPwd() : {}", staffDto.getEmpPwd());

      UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
        staffDto.getEmpId(), staffDto.getEmpPwd());

      // PrincipalDetailsService의 loadUserByUsername 함수가 실행된 후 정상이면 authentication이
      // 리턴됨
      // DB에 있는 username과 password가 일치한다.
      Authentication authentication = authenticationManager.authenticate(authenticationToken);

      // 로그인이 되었다는 뜻.
      PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
      log.info(principalDetails.getStaff().getEmpId()); // 로그인 정상적으로 되었다는 뜻

      // authentication 객체가 session 영역에 저장을 해야하고 그방법이 return 해주면 됨.
      // 리턴의 이유는 권한 관리를 security가 대신 해주기 때문에 편하려고 하는거임
      // 굳이 JWT토큰을 사용하면서 세션을 만들 이유가 없음. 근데 단지 권한 처리때문에 session에 넣어준다.
      return authentication;
    } catch (Exception e) {
      e.printStackTrace();
    }

    return null;
  }

  // attemptAuthentication실행 후 인증이 정상적으로 되었으면 successfulAuthentication 함수가 실행됨
  // JWT 토큰을 만들어서 request 요청한 사용자에게 JWT 토큰을 response 해주면 됨
  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
      Authentication authentication) throws IOException, ServletException {
    log.info("{} - successfulAuthentication -> 인증 완료", this.getClass());

    PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

    String accessToken = jwtTokenProvider.generateAccessToken(authentication);
    String refreshToken = jwtTokenProvider.generateRefreshToken();
    Long userNo = principalDetails.getStaff().getEmpNum();

    TokenDto tokenDto = TokenDto.builder().EmpNum(userNo).refreshToken(refreshToken).build();
    jwtService.saveRefreshToken(tokenDto);

    log.info("Generated Access Token: {}", accessToken);
    log.info("Generated Refresh Token: {}", refreshToken);
    
    jwtTokenProvider.setHeaderAccessToken(response, accessToken);
    jwtTokenProvider.setHeaderRefreshToken(response, refreshToken);

  }
}
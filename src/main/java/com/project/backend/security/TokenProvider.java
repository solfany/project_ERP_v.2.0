//package com.project.backend.security;
//
//import java.time.Instant;
//import java.time.temporal.ChronoUnit;
//import java.util.Date;
//
//import org.springframework.stereotype.Service;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//
//@Service
//public class TokenProvider {
//	//Jwt생성 및 검증을 위한 키
//	private static final String SECURITY_KEY = "jwtseckey!@";
//	//Jwt 생성하는 메서드
//	public String create(String userEmail) {
//		//만료날짜를 현재날짜 + 1시간으로 설정
//		Date exprTime = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));
//		//Jwt를 생성
//		return Jwts.builder()
//				//암호화에 사용될 알고리즘, 키
//				.signWith(SignatureAlgorithm.HS512, SECURITY_KEY)
//				//Jwt제목,생성일,만료일
//				.setSubject(userEmail).setIssuedAt(new Date()).setExpiration(exprTime)
//				//생성
//				.compact();		
//	}
//	//Jwt 검증
//	public String validate(String token) {
//		//매개변수로 받은 token을 키를 사용해서 복호화(디코딩)		
//		Claims claims = Jwts.parser().setSigningKey(SECURITY_KEY).parseClaimsJws(token).getBody();
//
//		//복호화된 토큰의 payload에서 제목을 가져옴
//		return claims.getSubject();
//	}
//}
//
//// 지금 안나오는게 정상인거니?
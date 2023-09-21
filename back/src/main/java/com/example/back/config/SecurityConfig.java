package com.project.backend.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.miracle.project.jwt.JwtAccessDeniedHandler;
import com.miracle.project.jwt.JwtAuthenticationEntryPoint;
import com.miracle.project.jwt.TokenProvider;

@EnableWebSecurity
public class SecurityConfig {
	
	private final TokenProvider tokenProvider;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
	
	@Autowired
	public SecurityConfig(TokenProvider tokenProvider, JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, JwtAccessDeniedHandler jwtAccessDeniedHandler) {
		this.tokenProvider = tokenProvider;
		this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
		this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
	}
	
	/* 1. 암호화 처리를 위한 PasswordEncoder를 빈으로 설정(빈을 등록 시 메소드 이름 오타 없을 것) */
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	/* 2. 시큐리티 설정을 무시 할 정적 리소스 등록 */
	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring().antMatchers("/css/**", "/js/**", "/images/**",
				                                   "/lib/**", "/productimgs/**");
	}
	
	/* 3. HTTP요청에 대한 권한별 설정(세션 인증 -> 토큰 인증으로 인해 바뀐 부분 존재) */
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		http.csrf().disable()
			.exceptionHandling()
			
			/* 기본 시큐리티 설정에서 JWT 토큰과 관련된 유효성과 권한 체크용 설정 */
			.authenticationEntryPoint(jwtAuthenticationEntryPoint)		// 유효한 자격 증명 없을 시(401) - 인증 X, 토큰 유효성 검사 에러
			.accessDeniedHandler(jwtAccessDeniedHandler)				// 필요한 권한 없이 접근 시(403) - 권한 O, but 실제로 처리될 수 없는 권한
		    .and()
		    .authorizeRequests()
		    	.antMatchers("/").authenticated()
		    	.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()		// cors를 위해 preflight 요청 처리용 options 요청 허용       
		    															// preflight request란?
		    															// 요청 할 url이 외부 도메인일 경우 웹 브라우저에서 자체 실행되며
		    															// options 메소드로 사전 요청을 보내게 됨
		    															// 사전에 요청이 안전한지 확인하기 위함(유효한지 서버에 미리 파악할 수 있도록 보내는 수단)
		    	
		    	.anyRequest().permitAll()
//		    	.antMatchers("/auth/**").permitAll()
//	            .antMatchers("/mypage/**").permitAll()
//	            .antMatchers("/notice/**").permitAll()
//		    	.antMatchers("/hr-team2/**").hasAnyRole("MASTER")
//		    	.antMatchers("/hrteam1/**").hasAnyRole("MASTER")
		    .and()
		    
		    	/* 세션 인증 방식을 쓰지 않겠다는 설정 */
		    	.sessionManagement()
		    	.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		    .and()
		    	.cors()
		    .and()
		    
		    	/* jwt 토큰 방식을 쓰겠다는 설정 */
		    	.apply(new JwtSecurityConfig(tokenProvider));
		
		return http.build();
	}
	
	/* 4. CORS 설정용 Bean(허용 할 origin과 httpMethod 종류와 header 값) */
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
		configuration.setAllowedMethods(Arrays.asList("GET", "PUT", "POST", "DELETE"));
		configuration.setAllowedHeaders(Arrays.asList("Access-Control-Allow-Origin", "Content-type"
													, "Access-Control-Allow-Headers", "Authorization"
													, "X-Requested-With"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
	
	
}

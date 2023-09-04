package com.project.backend.config.jwt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

// 시큐리티가 filter 가지고 있는데 그 필터중에 BasicAuthenticationFilter 라는 것이 있음.
// 권한이나 인증이 필요한 특정 주소를 요청했을 때 위 필터를 무조건 타게 되어있음.
// 만약에 권한이 인증이 필요한 주소가 아니라면 이 필터를 안탐
@Slf4j
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {
	private final JwtTokenProvider jwtTokenProvider;

	@Override
	protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
			FilterChain filterChain) throws IOException, ServletException {
		log.info("{} - successfulAuthentication -> 인증이나 권한이 필요한 주소 요청이 됨", this.getClass());

		String bearerAccessToken = httpServletRequest.getHeader("X-ACCESS-TOKEN");
		String accessToken = jwtTokenProvider.getBearerTokenToString(bearerAccessToken);

		if (StringUtils.hasText(accessToken) && jwtTokenProvider.validateToken(accessToken)) {
			Authentication authentication = jwtTokenProvider.getAuthenticationByAccessToken(accessToken);
			SecurityContextHolder.getContext().setAuthentication(authentication); // resolveToke을 통해 토큰을 받아와서 유효성 검증을 하고
																					// 정상 토큰이면 SecurityContext에 저장
			log.debug("Security Context에 '{}' 인증 정보를 저장했습니다", authentication.getName());
		} else {
			log.debug("유효한 JWT 토큰이 없습니다");
		}

		filterChain.doFilter(httpServletRequest, httpServletResponse); // 다음 Filter를 실행하기 위한 코드. 마지막 필터라면 필터 실행 후 리소스를
																		// 반환한다.
	}
}

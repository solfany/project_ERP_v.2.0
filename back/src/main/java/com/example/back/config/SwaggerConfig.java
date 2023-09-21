package com.project.backend.config;


import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(
		info = @Info(title = "MIRACLE INVESTMENT SERVICE API 명세서",
					 description = "React부터 Spring Data Jpa까지 진행하는 서비스 API 명세서",
					 version = "v1"))
@Configuration
public class SwaggerConfig {

	@Bean
	public GroupedOpenApi chatOpenApi() {
		String [] paths = {"/auth/**", "/main/**", "/hrteam1/**", "/hr-team2/**", "/mypage/**", "/notice/**"   };
		
		return GroupedOpenApi.builder()
							 .group("주문 서비스 API v1")
							 .pathsToMatch(paths)
							 .build();
	}
}











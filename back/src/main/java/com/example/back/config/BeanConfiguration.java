package com.project.backend.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {

	/* 엔티티와 DTO 변환을 위한 modelMapper 빈 설정 */
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
}

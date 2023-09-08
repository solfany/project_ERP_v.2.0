package com.project.backend.config.auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


import com.project.backend.entity.Staff;
import com.project.backend.service.StaffService;

@Component
@Slf4j
public class PrincipalDetailsService implements UserDetailsService {
	@Autowired
	private StaffService staffService;

	@Override
	public UserDetails loadUserByUsername(String empId) throws UsernameNotFoundException {

//		log.info("############################## PrincipalDetailsService - username : {}", empId);

		return staffService.findOneWithAuthoritiesByUsername(empId).map(staff -> createStaff(empId, staff))
				.orElseThrow(() -> new UsernameNotFoundException(empId + " -> 데이터베이스에서 찾을 수 없습니다."));

	}

	private PrincipalDetails createStaff(String empId, Staff staff) {

		List<GrantedAuthority> grantedAuthorities = staff.getAuthorities().stream()
				.map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
				.collect(Collectors.toList());
		return new PrincipalDetails(staff, grantedAuthorities);
	}
}

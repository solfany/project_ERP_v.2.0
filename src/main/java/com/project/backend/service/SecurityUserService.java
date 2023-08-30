//package com.project.backend.service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.project.backend.entity.Staff;
//
//@Service
//public class SecurityUserService implements UserDetailsService {
//	
//	@Autowired
//	private StaffService staffService;
//	
//	@Override
//	public UserDetails loadUserByUsername(String username)throws UsernameNotFoundException {
//		Staff staff = staffService.getStaffByUsername(username);
//		
//		if (staff == null) {
//			throw new UsernameNotFoundException("사용자 이름을 찾을 수 없습니다: " + username);
//		}
//		
//		List<GrantedAuthority> authorities = new ArrayList<>();
//		authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
//		
//		return new User(staff.getEmpId(), staff.getEmpPwd(), authorities);
//	}
//
//}

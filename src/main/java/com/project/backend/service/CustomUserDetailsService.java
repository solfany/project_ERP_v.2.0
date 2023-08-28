//package com.project.backend.service;
//
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
//import org.springframework.stereotype.Service;
//
//import com.project.backend.entity.Staff;
//
////import java.util.ArrayList;
////import java.util.Collection;
////import java.util.List;
////
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.security.core.GrantedAuthority;
////import org.springframework.security.core.authority.SimpleGrantedAuthority;
////import org.springframework.security.core.userdetails.User;
////import org.springframework.security.core.userdetails.UserDetails;
////import org.springframework.security.core.userdetails.UserDetailsService;
////import org.springframework.security.core.userdetails.UsernameNotFoundException;
////import org.springframework.security.crypto.password.PasswordEncoder;
////import org.springframework.stereotype.Service;
////
////import com.project.backend.entity.Staff;
//
////import java.util.ArrayList;
////import java.util.Collection;
////import java.util.List;
////
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.security.core.GrantedAuthority;
////import org.springframework.security.core.authority.SimpleGrantedAuthority;
////import org.springframework.security.core.userdetails.User;
////import org.springframework.security.core.userdetails.UserDetails;
////import org.springframework.security.core.userdetails.UserDetailsService;
////import org.springframework.security.core.userdetails.UsernameNotFoundException;
////import org.springframework.security.crypto.password.PasswordEncoder;
////import org.springframework.stereotype.Service;
////
////import com.project.backend.entity.Staff;
//
////@Service
////public class CustomUserDetailsService implements UserDetailsService {
////
////    private final StaffService staffService;
////    //private final PasswordEncoder passwordEncoder;
////
////    @Autowired
////    public CustomUserDetailsService(StaffService staffService) {
////        this.staffService = staffService;
////        //this.passwordEncoder = passwordEncoder;
////    }
////
////    @Override
////    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
////        Staff staff = staffService.getStaffByUsername(username);
////
////        if (staff == null) {
////            throw new UsernameNotFoundException("User not found with username: " + username);
////        }
////
////        return User.builder()
////                .username(staff.getEmpId())
////                .password(staff.getEmpPwd())
////                .authorities(getAuthorities(staff))
////                .build();
////    }
////
////    private Collection<? extends GrantedAuthority> getAuthorities(Staff staff) {
////        List<GrantedAuthority> authorities = new ArrayList<>();
////        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
////        return authorities;
////    }
////}
//
//
//
////사용중인 코드
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    private final StaffService staffService;
//    private final PasswordEncoder passwordEncoder; // PasswordEncoder 추가
//
//    @Autowired
//    public CustomUserDetailsService(StaffService staffService, PasswordEncoder passwordEncoder) {
//        this.staffService = staffService;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Staff staff = staffService.getStaffByUsername(username);
//
//        if (staff == null) {
//            throw new UsernameNotFoundException("User not found with username: " + username);
//        }
//
//        return User.builder()
//                .username(staff.getEmpId())
//                .password(staff.getEmpPwd()) // 해시화된 비밀번호 사용
//                .authorities(getAuthorities(staff))
//                .build();
//    }
//
//    public void saveUser(String username, String password) {
//        // 입력한 비밀번호를 해시화하여 저장
//        String hashedPassword = passwordEncoder.encode(password);
//
//        // 사용자 정보를 저장
//        Staff staff = new Staff();
//        staff.setEmpId(username);
//        staff.setEmpPwd(hashedPassword);
//        staffService.saveStaff(staff);
//    }
//
//    private Collection<? extends GrantedAuthority> getAuthorities(Staff staff) {
//        List<GrantedAuthority> authorities = new ArrayList<>();
//        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
//        return authorities;
//    }
//}
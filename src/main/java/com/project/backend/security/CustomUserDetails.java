//package com.project.backend.security;
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import com.project.backend.entity.Staff;
//
//import java.util.Collection;
//
//public class CustomUserDetails implements UserDetails {
//
//    private final Staff staff;
//    private final Collection<? extends GrantedAuthority> authorities;
//
//    public CustomUserDetails(Staff staff, Collection<? extends GrantedAuthority> authorities) {
//        this.staff = staff;
//        this.authorities = authorities;
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return authorities;
//    }
//
//    @Override
//    public String getPassword() {
//        return staff.getEmpPwd();
//    }
//
//    @Override
//    public String getUsername() {
//        return staff.getEmpNum().toString();
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        // 계정 만료 여부 로직 구현
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        // 계정 잠김 여부 로직 구현
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        // 인증 정보 만료 여부 로직 구현
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        // 계정 활성 여부 로직 구현
//        return true;
//    }
//}
//
//
//
//
//
//

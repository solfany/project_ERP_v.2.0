package com.project.backend.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private final Staff staff;
    private final Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(Staff staff, Collection<? extends GrantedAuthority> authorities) {
        this.staff = staff;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }


    @Override
    public String getPassword() {
        return staff.getEmpPwd(); // Staff 객체에서 비밀번호 가져오기
    }

    @Override
    public String getUsername() {
        return staff.getEmpNum().toString(); // Staff 객체에서 사원 번호(ID) 가져오기
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // 계정 만료 여부를 반환하는 로직을 구현해야 합니다.
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // 계정 잠김 여부를 반환하는 로직을 구현해야 합니다.
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // 인증 정보 만료 여부를 반환하는 로직을 구현해야 합니다.
    }

    @Override
    public boolean isEnabled() {
        return true; // 계정 활성 여부를 반환하는 로직을 구현해야 합니다.
    }
}
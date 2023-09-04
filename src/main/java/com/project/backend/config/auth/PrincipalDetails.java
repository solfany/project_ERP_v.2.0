package com.project.backend.config.auth;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.project.backend.entity.Staff;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class PrincipalDetails implements UserDetails {

	private Staff staff;
	private List<GrantedAuthority> authorities;

	public PrincipalDetails(Staff staff, List<GrantedAuthority> authorities) {
		this.staff = staff;
		this.authorities = authorities;
	}

	public Long getEmpNum() {
		return this.staff.getEmpNum();
	}

	@Override
	public String getUsername() {
		return this.staff.getEmpId();
	}

	@Override
	public String getPassword() {
		return this.staff.getEmpPwd();
	}

	public String getDept() {
		return this.staff.getDept();
	}

	public String getPosition() {
		return this.staff.getPosition();
	}

	public String getEmpName() {
		return this.staff.getEmpName();
	}

	public String getBirthDate() {
		return this.staff.getBirthDate();
	}

	public String getPhoneNumber() {
		return this.staff.getPhoneNumber();
	}

	public String getAddress() {
		return this.staff.getAddress();
	}

	public String getEmail() {
		return this.staff.getEmail();
	}

	public String getBankName() {
		return this.staff.getBankName();
	}

	public String getAccountNumber() {
		return this.staff.getAccountNumber();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}

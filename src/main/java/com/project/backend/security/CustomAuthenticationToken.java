//package com.project.backend.security;
//
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.GrantedAuthority;
//import java.util.Collection;
//
//public class CustomAuthenticationToken extends UsernamePasswordAuthenticationToken {
//
//    public CustomAuthenticationToken(Object principal, Object credentials) {
//        super(principal, credentials);
//    }
//
//    public CustomAuthenticationToken(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities) {
//        super(principal, credentials, authorities);
//    }
//}
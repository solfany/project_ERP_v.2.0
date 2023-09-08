package com.project.backend.service.pointshop;

import com.project.backend.entity.pointshop.Member;
import com.project.backend.repository.pointshop.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

    private final MemberRepository memberRepository;

//    멤버 저장
    public Member saveMember(Member member) {
        validateDuplicateMember(member);
        return memberRepository.save(member);
    }

// 아이디 중복검사
    private void validateDuplicateMember(Member member) {
        Member findMember = memberRepository.findByEmail(member.getEmail());
        if (findMember != null) {
            throw new IllegalStateException("이미 가입된 회원입니다.");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Member member = memberRepository.findByEmail(email);

        if (member == null) {
            throw new UsernameNotFoundException(email);
        }

        return User.builder()
                .username(member.getEmail())
                .password(member.getPassword())
                .roles(member.getRole().toString())
                .build();
    }

    ////////////////////////////////
//    public MemberResponseDto findMemberInfoById(Long memberId) {
//        return memberRepository.findById(memberId)
//                .map(MemberResponseDto::of)
//                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
//    }
//
//    public MemberResponseDto findMemberInfoByEmail(String email) {
//        return memberRepository.findByEmail(email)
//                .map(MemberResponseDto::of)
//                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
//    }




}

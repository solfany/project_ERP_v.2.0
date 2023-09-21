package com.project.backend.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.stream.Collectors;

@Service
public class AttendanceService {


    private static final Logger log = LoggerFactory.getLogger(AttendanceService.class);
    private final AttendanceRepository attendanceRepository;
    private final ModelMapper modelMapper;
    private final AttendanceAndMemberRepository attendanceAndMemberRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public AttendanceService(AttendanceAndMemberRepository attendanceAndMemberRepository, ModelMapper modelMapper, MemberRepository memberRepository, AttendanceRepository attendanceRepository, MemberRepository memberRepository2) {
        this.attendanceAndMemberRepository = attendanceAndMemberRepository;
        this.attendanceRepository = attendanceRepository;
        this.modelMapper = modelMapper;
        this.memberRepository = memberRepository2;

    }

    @Transactional
    public int selectMemberAttList() {
        List<AttendanceAndMember> memberAttList = attendanceAndMemberRepository.findAll();

        System.out.println("att" + memberAttList);

        return memberAttList.size();
    }

    @Transactional
    public Object selectMemberAttListWithPaging(Criteria cri) {

        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("attNo").descending());

        Page<AttendanceAndMember> result = attendanceAndMemberRepository.findAll(paging);
        List<AttendanceAndMember> memberAttList = (List<AttendanceAndMember>) result.getContent();

//        System.out.println("페이지 reuslt: " + result);
//        System.out.println("멤버 리스트 : " + memberAttList);
        for (int i = 0; i < memberAttList.size(); i++) {
            memberAttList.get(i).setAttNo(memberAttList.get(i).getAttNo());
        }
        log.info("[SalaryService] selectProductListWithPagingForAdmin End ===================================");

        return memberAttList.stream().map(Attendance -> modelMapper.map(Attendance, AttendanceAndMemberDTO.class)).collect(Collectors.toList());
    }

    // 출근 인서트
    @Transactional
    public Object insertAtt(AttendanceDTO attendanceDTO, MemberDTO memberDTO) {

        Member member = memberRepository.findMemberNoByMemberId(memberDTO.getMemberId());

        System.out.println("member : " + member);

        Date now = new Date();
        SimpleDateFormat sdfD = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat sdfT = new SimpleDateFormat("HH:mm");

        String getAttDate = sdfD.format(now);
        String getAttTime = sdfT.format(now);

        attendanceDTO.setAttDate(getAttDate);
        attendanceDTO.setAttTime(getAttTime);

        int result = 0;

        try {
            Attendance insertAtt = modelMapper.map(attendanceDTO, Attendance.class);

            insertAtt.setMemberNo(member.getMemberNo());

            attendanceRepository.save(insertAtt);
            result = 1;

        } catch (Exception e) {
            log.info("[insertAtt] Exception!!");
            throw new RuntimeException(e);
        }
        return (result > 0) ? "출근 시간 인서트 성공" : "출근 시간 인서트 실패";
    }

    @Transactional
    public Object updateOffTime(AttendanceAndMemberDTO attendanceAndMemberDTO, MemberDTO memberDTO) {

        log.info("[AttendanceService] attendanceAndMemberDTO" + attendanceAndMemberDTO);
        Member member = memberRepository.findMemberNoByMemberId(memberDTO.getMemberId());

        int result = 0;

        try {

            int attNo = member.getMemberNo();
            attendanceAndMemberDTO.setAttNo(attNo);

            AttendanceAndMember offTime = attendanceAndMemberRepository.findById(attendanceAndMemberDTO.getAttNo()).get();

            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");

            LocalTime now = LocalTime.now();
            DateTimeFormatter nowformatter = DateTimeFormatter.ofPattern("HH:mm");
            String getOffTime = now.format(nowformatter);

            offTime.setOffTime(getOffTime);

            String AttTime = attendanceAndMemberDTO.getAttTime();
            String OffTime = getOffTime;

            Date Att = sdf.parse(AttTime);
            Date Off = sdf.parse(OffTime);

            Double AttMil = (double) Att.getTime();
            Double OffMil = (double) Off.getTime();

            double workTime = (OffMil - AttMil) / (1000 * 60 * 60);

            if (workTime < 0) {
                workTime = (24 - ((AttMil / (1000 * 60 * 60)) - (OffMil / (1000 * 60 * 60))));
            } else {
                workTime = (OffMil - AttMil) / (1000 * 60 * 60);
            }


            offTime.setWorkTime(workTime);

            result = 1;
        } catch (Exception e) {
            log.info("[updateOffTime] Exception!!");
            e.printStackTrace();
        }
        log.info("[AttendanceService] updateOffTime End =====================");

        return (result > 0) ? "퇴근 시간 업데이트 성공" : "퇴근 시간 업데이트 실패";
    }
}
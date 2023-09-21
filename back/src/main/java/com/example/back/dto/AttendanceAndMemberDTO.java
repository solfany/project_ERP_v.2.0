package com.project.backend.dto;

import com.miracle.project.member.dto.MemberDTO;

public class AttendanceAndMemberDTO {
	private int attNo;
	private String attTime;
	private String offTime;
	private String attDate;
	private Double workTime;
	private MemberDTO member;
	
	public AttendanceAndMemberDTO() {
		super();
	}

	@Override
	public String toString() {
		return "AttendanceAndMemberDTO [attNo=" + attNo + ", attTime=" + attTime + ", offTime=" + offTime + ", attDate="
				+ attDate + ", workTime=" + workTime + ", member=" + member + "]";
	}

	public int getAttNo() {
		return attNo;
	}

	public void setAttNo(int attNo) {
		this.attNo = attNo;
	}

	public String getAttTime() {
		return attTime;
	}

	public void setAttTime(String attTime) {
		this.attTime = attTime;
	}

	public String getOffTime() {
		return offTime;
	}

	public void setOffTime(String offTime) {
		this.offTime = offTime;
	}

	public String getAttDate() {
		return attDate;
	}

	public void setAttDate(String attDate) {
		this.attDate = attDate;
	}

	public Double getWorkTime() {
		return workTime;
	}

	public void setWorkTime(Double workTime) {
		this.workTime = workTime;
	}

	public MemberDTO getMember() {
		return member;
	}

	public void setMember(MemberDTO member) {
		this.member = member;
	}

	public AttendanceAndMemberDTO(int attNo, String attTime, String offTime, String attDate, Double workTime,
			MemberDTO member) {
		super();
		this.attNo = attNo;
		this.attTime = attTime;
		this.offTime = offTime;
		this.attDate = attDate;
		this.workTime = workTime;
		this.member = member;
	}
	
	
}

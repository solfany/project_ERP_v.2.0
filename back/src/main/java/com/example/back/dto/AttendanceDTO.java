package com.project.backend.dto;

public class AttendanceDTO {

	private int attNo;
	private String attTime;
	private String offTime;
	private String attDate;
	private Long workTime;
	private int memberNo;
	
	public AttendanceDTO() {
		super();
	}
	
	public AttendanceDTO(int attNo, String attTime, String offTime, String attDate, Long workTime, int memberNo) {
		super();
		this.attNo = attNo;
		this.attTime = attTime;
		this.offTime = offTime;
		this.attDate = attDate;
		this.workTime = workTime;
		this.memberNo = memberNo;
	}
	@Override
	public String toString() {
		return "AttendanceDTO [attNo=" + attNo + ", attTime=" + attTime + ", offTime=" + offTime + ", attDate="
				+ attDate + ", workTime=" + workTime + ", memberNo=" + memberNo + "]";
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
	public Long getWorkTime() {
		return workTime;
	}
	public void setWorkTime(Long workTime) {
		this.workTime = workTime;
	}
	public int getMemberNo() {
		return memberNo;
	}
	public void setMemberNo(int memberNo) {
		this.memberNo = memberNo;
	}

	
}


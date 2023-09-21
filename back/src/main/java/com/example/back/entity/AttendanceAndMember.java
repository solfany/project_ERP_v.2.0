package com.project.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.miracle.project.member.dto.MemberDTO;
import com.miracle.project.member.entity.Member;

@Entity
@Table(name = "TB_ATTENDANCE")
public class AttendanceAndMember {
	
	@Id
	@Column(name = "ATT_NO")
	private int attNo;
	
	@Column(name = "ATT_TIME")
	private String attTime;
	
	@Column(name = "OFF_TIME")
	private String offTime;
		
	@Column(name = "ATT_DATE")
	private String attDate;
	
	@Column(name = "WORK_TIME")
	private Double workTime;
	
	@Column(name = "MEMBER_NO")
	private int memberNo;
	
	@ManyToOne
	@JoinColumn(name = "MEMBER_NO", insertable = false, updatable = false)
	private Member memberNum;

	public AttendanceAndMember() {
		super();
	}

	public AttendanceAndMember(int attNo, String attTime, String offTime, String attDate, Double workTime, int memberNo,
			Member memberNum) {
		super();
		this.attNo = attNo;
		this.attTime = attTime;
		this.offTime = offTime;
		this.attDate = attDate;
		this.workTime = workTime;
		this.memberNo = memberNo;
		this.memberNum = memberNum;
	}

	@Override
	public String toString() {
		return "AttendanceAndMember [attNo=" + attNo + ", attTime=" + attTime + ", offTime=" + offTime + ", attDate="
				+ attDate + ", workTime=" + workTime + ", memberNo=" + memberNo + ", memberNum=" + memberNum + "]";
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

	public int getMemberNo() {
		return memberNo;
	}

	public void setMemberNo(int memberNo) {
		this.memberNo = memberNo;
	}

	public Member getMemberNum() {
		return memberNum;
	}

	public void setMemberNum(Member memberNum) {
		this.memberNum = memberNum;
	}

	public void setMember(MemberDTO member) {
		// TODO Auto-generated method stub
		
	}
	
}

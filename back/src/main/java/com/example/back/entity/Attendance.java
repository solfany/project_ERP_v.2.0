package com.project.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "TB_ATTENDANCE")
@SequenceGenerator(
		name = "ATTENDANCE_SEQ_ATT_NO_GENERATOR",
		sequenceName = "SEQ_ATT_NO",
		initialValue = 1, allocationSize = 1
)
public class Attendance {

	@Id
	@Column(name = "ATT_NO")
	@GeneratedValue(
		strategy = GenerationType.SEQUENCE,
		generator = "ATTENDANCE_SEQ_ATT_NO_GENERATOR"
	)
	private int attNo;
	
	@Column(name = "ATT_TIME")
	private String attTime;
	
	@Column(name = "OFF_TIME")
	private String offTime;
		
	@Column(name = "ATT_DATE")
	private String attDate;
	
	@Column(name = "WORK_TIME")
	private Long workTime;
	
	@Column(name = "MEMBER_NO")
	private int memberNo;

	public Attendance() {
		super();
	}

	public Attendance(int attNo, String attTime, String offTime, String attDate, Long workTime, int memberNo) {
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
		return "Attendance [attNo=" + attNo + ", attTime=" + attTime + ", offTime=" + offTime + ", attDate=" + attDate
				+ ", workTime=" + workTime + ", memberNo=" + memberNo + "]";
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

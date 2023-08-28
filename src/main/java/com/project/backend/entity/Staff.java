package com.project.backend.entity;



import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.project.backend.dto.StaffDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "staff")
@Getter
@Setter
@ToString(exclude = "empPwd")
public class Staff {
	

//	@GeneratedValue(strategy = GenerationType.AUTO)
//	@Column(name = "id")
//	private Long id;
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "emp_num", nullable = false)
    private Long empNum;

    @Column(name = "emp_id")
    private String empId;
    
    @Column(name = "emp_pwd", nullable = false)
    private String empPwd;
   
    @Column(name = "dept")
    private String dept;

    @Column(name = "position")
    private String position;

    @Column(name = "emp_name")
    private String empName;

    @Column(name = "birth_date")
    private String birthDate;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "email")
    private String email;

    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "account_number")
    private String accountNumber;
    
    //비밀번호 인코딩 설정
    public void setEmpPwd(String empPwd) {
    	if (empPwd != null) {
    		this.empPwd = empPwd;
    	
    } else {
    	throw new IllegalArgumentException("Password cannot be null");
    }
  } 
    
 
    public void setEncodedEmpPwd(String empPwd) {
        this.empPwd = empPwd;
    }
    public static Staff createStaff(StaffDto staffDto) {
        Staff staff = new Staff();
        staff.setEmpNum(staffDto.getEmpNum());
        staff.setEmpId(staffDto.getEmpId());
        staff.setEmpPwd(staffDto.getEmpPwd());
        staff.setDept(staffDto.getDept());
        staff.setPosition(staffDto.getPosition());
        staff.setEmpName(staffDto.getEmpName());
        staff.setBirthDate(staffDto.getBirthDate());
        staff.setPhoneNumber(staffDto.getPhoneNumber());
        staff.setAddress(staffDto.getAddress());
        staff.setEmail(staffDto.getEmail());
        staff.setBankName(staffDto.getBankName());
        staff.setAccountNumber(staffDto.getAccountNumber());
        return staff;
    }
}

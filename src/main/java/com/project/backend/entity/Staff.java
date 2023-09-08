package com.project.backend.entity;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

//@ToString(exclude = "empPwd")
@Table(name = "staff")
@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Staff {


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





  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "t_user_authority", joinColumns = {
    @JoinColumn(name = "emp_num", referencedColumnName = "emp_num") }, inverseJoinColumns = {
    @JoinColumn(name = "authority_name", referencedColumnName = "authority_name") })
  private Set<Authority> authorities;

    // 비밀번호 인코딩 설정
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



}
package com.project.backend.entity;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "t_refresh_token")
@Builder
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class RefreshToken {
  @Id
  @Column(name = "emp_num", nullable = false)
  private Long empNum;

  @Column(name = "refresh_token", nullable = false, length = 200)
  private String refreshToken;
}
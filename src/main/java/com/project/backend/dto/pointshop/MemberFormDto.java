package com.project.backend.dto.pointshop;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@NoArgsConstructor
@Getter @Setter
public class MemberFormDto {

    @NotNull(message = "이름은 필수 입력 값입니다.")
    private String name;

    @NotNull(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "이메일 형식으로 입력해주세요.")
    private String email;

    @NotNull(message = "비밀번호는 필수 입력 값입니다.")
    @Length(min=8, max=16, message="비밀번호는 8자 이상, 16자 이하로 입력해주세요")
    private String password;

    @NotNull(message = "주소는 필수 입력 값입니다.")
    private String address;
}

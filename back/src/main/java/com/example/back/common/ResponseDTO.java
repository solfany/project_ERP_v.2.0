package com.miracle.project.common;

import org.springframework.http.HttpStatus;

public class ResponseDTO {
	
	private int status;			// 상태 코드 값
	private String message;		// 응답 메시지
	private Object data;		// 응답 데이터
	
	public ResponseDTO() {
		super();
	}
	
	public ResponseDTO(HttpStatus status, String message, Object data) {
		super();
		this.status = status.value();		// HttpStatus enum 타입에서 value라는 int형 상태 코드 값만 추출
		this.message = message;
		this.data = data;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "ResponseDTO [status=" + status + ", message=" + message + ", data=" + data + "]";
	}
	
}


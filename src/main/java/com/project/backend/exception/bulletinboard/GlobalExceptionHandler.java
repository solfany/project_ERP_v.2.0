package com.project.backend.exception.bulletinboard;

import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.ResponseEntity;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException e) {
    return ResponseEntity.badRequest().body(new ErrorResponse(false, e.getMessage()));
  }
}

class ErrorResponse {
  private boolean success;

  private String message;
  // Constructor with two parameters
  public ErrorResponse(boolean success, String message) {
    this.success = success;
    this.message = message;
  }


  // getters, setters, constructor 등...
}

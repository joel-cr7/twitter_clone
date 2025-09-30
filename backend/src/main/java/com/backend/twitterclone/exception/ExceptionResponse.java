package com.backend.twitterclone.exception;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;


@Data
public class ExceptionResponse {
    private LocalDateTime timestamp;
    private String error;
    private HttpStatus httpStatus;
    private int statusCode;

    public ExceptionResponse(){
        this.timestamp = LocalDateTime.now();
    }

    public ExceptionResponse(String error, HttpStatus httpStatus){
        this();
        this.error = error;
        this.httpStatus = httpStatus;
        this.statusCode = httpStatus.value();
    }

}

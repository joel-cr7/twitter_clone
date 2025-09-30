package com.backend.twitterclone.security.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;


@Data
public class SignUpDTO {
    private String firstName;
    private String lastName;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate birthDate;

    private String mobile;
    private String email;
    private String password;

    @Override
    public String toString() {
        return "SignUpDTO{" +
                "email='" + email + '\'' +
                ", mobile='" + mobile + '\'' +
                ", birthDate='" + birthDate + '\'' +
                ", lastName='" + lastName + '\'' +
                ", firstName='" + firstName + '\'' +
                '}';
    }
}

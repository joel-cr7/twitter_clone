package com.backend.twitterclone.security.dto;


import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class SignupResponseDTO {
    private Long userId;
    private String accessToken;
    private String refreshToken;
}

package com.backend.twitterclone.security.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponseDTO {
    Long userId;
    String accessToken;
    String refreshToken;
}

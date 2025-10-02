package com.backend.twitterclone.security.service;

import com.backend.twitterclone.security.dto.LoginDTO;
import com.backend.twitterclone.security.dto.LoginResponseDTO;
import com.backend.twitterclone.security.dto.SignUpDTO;
import com.backend.twitterclone.security.dto.SignupResponseDTO;

public interface AuthService {

    SignupResponseDTO signup(SignUpDTO signUpDTO);

    LoginResponseDTO login(LoginDTO loginDTO);

    LoginResponseDTO refreshToken(String refreshToken);

    void logout(String refreshToken);
}

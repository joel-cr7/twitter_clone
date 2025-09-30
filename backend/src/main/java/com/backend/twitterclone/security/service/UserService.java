package com.backend.twitterclone.security.service;

import com.backend.twitterclone.entity.User;
import com.backend.twitterclone.security.dto.LoginDTO;
import com.backend.twitterclone.security.dto.SignUpDTO;
import com.backend.twitterclone.security.dto.SignupResponseDTO;


public interface UserService {

    User findUserById(Long userId);

}

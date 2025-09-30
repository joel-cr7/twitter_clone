package com.backend.twitterclone.security.service.Impl;

import com.backend.twitterclone.entity.User;
import com.backend.twitterclone.exception.ResourceNotFoundException;
import com.backend.twitterclone.repository.UserRepository;
import com.backend.twitterclone.security.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // throw exception if user not found or user had previously logged in with google
        return userRepository.findByEmail(username)
                .filter(user -> !user.isLoggedInWithGoogle())
                .orElseThrow(() -> new BadCredentialsException("User with email "+ username + " not found"));
    }

    @Override
    public User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " + userId + " not found !"));
    }

}

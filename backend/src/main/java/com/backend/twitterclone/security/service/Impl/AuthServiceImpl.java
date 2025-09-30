package com.backend.twitterclone.security.service.Impl;

import com.backend.twitterclone.entity.User;
import com.backend.twitterclone.entity.Verification;
import com.backend.twitterclone.repository.UserRepository;
import com.backend.twitterclone.security.dto.LoginDTO;
import com.backend.twitterclone.security.dto.LoginResponseDTO;
import com.backend.twitterclone.security.dto.SignUpDTO;
import com.backend.twitterclone.security.dto.SignupResponseDTO;
import com.backend.twitterclone.security.service.AuthService;
import com.backend.twitterclone.security.service.JWTService;
import com.backend.twitterclone.security.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final JWTService jwtService;

    private final UserRepository userRepository;

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;      // configured as bean in SecurityConfig

    private final ModelMapper modelMapper;


    /**
     * save user in DB and generate JWT
     *
     * @param signUpDTO
     * @return SignupResponseDTO
     */
    @Transactional
    @Override
    public SignupResponseDTO signup(SignUpDTO signUpDTO) {
        log.info("Signing up user");
        Optional<User> user = userRepository.findByEmail(signUpDTO.getEmail());
        if(user.isPresent()){
            throw new BadCredentialsException("User with email " + signUpDTO.getEmail() +" already exists.");
        }

        User userToSave = modelMapper.map(signUpDTO, User.class);

        // encode the password and save user in DB
        userToSave.setPassword(passwordEncoder.encode(signUpDTO.getPassword()));
        log.info("Saving following user in DB: {}", signUpDTO);
        User savedUser = userRepository.save(userToSave);

        // set Spring Security Context
        Authentication auth = new UsernamePasswordAuthenticationToken(savedUser, null,
                savedUser.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);

        // generate JWT access/refresh token
        String token = jwtService.generateAccessToken(savedUser);
        String refreshToken = jwtService.generateRefreshToken(savedUser);
        log.info("Generated access/refresh token");

        return SignupResponseDTO.builder()
                .userId(savedUser.getUserId())
                .accessToken(token)
                .refreshToken(refreshToken)
                .build();
    }


    /**
     * validate username/password and generate JWT
     *
     * @param loginDTO
     * @return LoginResponseDTO
     */
    @Override
    public LoginResponseDTO login(LoginDTO loginDTO) {
        log.info("Logging in user");
        String email = loginDTO.getEmail();
        String password = loginDTO.getPassword();

        // Authenticate the user
        Authentication unAuthenticatedUser = new UsernamePasswordAuthenticationToken(email, password);
        Authentication authenticatedUser = authenticationManager.authenticate(unAuthenticatedUser);

        // get authenticated user and generate access/refresh token
        User user = (User) authenticatedUser.getPrincipal();
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return LoginResponseDTO.builder()
                .userId(user.getUserId())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }


    @Override
    public LoginResponseDTO refreshToken(String refreshToken) {
        Long userId = jwtService.getUserIdFromToken(refreshToken);
        User user = userService.findUserById(userId);
        String accessToken = jwtService.generateAccessToken(user);

        return LoginResponseDTO.builder()
                .userId(user.getUserId())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

}

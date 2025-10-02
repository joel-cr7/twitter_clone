package com.backend.twitterclone.security.service.Impl;

import com.backend.twitterclone.entity.Session;
import com.backend.twitterclone.entity.User;
import com.backend.twitterclone.repository.SessionRepository;
import com.backend.twitterclone.security.service.SessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.web.authentication.session.SessionAuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class SessionServiceImpl implements SessionService {

    @Value("${session.allowedSessions:1}")
    private int sessionLimit;

    private final SessionRepository sessionRepository;


    @Override
    public void createSession(User user, String refreshToken) {
        Session session = Session.builder()
                .user(user)
                .refreshToken(refreshToken)
                .build();

        sessionRepository.save(session);
    }

    @Override
    @Transactional
    public void invalidateAndCreateSession(User user, String refreshToken) {
        List<Session> userSessions = sessionRepository.findByUserOrderByLastUsedAtAsc(user);
        if(userSessions.size() == sessionLimit){
            // remove the last recently used session
            log.info("Session limit exceeded !! In-validating last recently used session");
            Session session = userSessions.getFirst();
            sessionRepository.delete(session);
        }
        createSession(user, refreshToken);
    }

    @Override
    public void validateSession(String refreshToken) {
        Session session = sessionRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new SessionAuthenticationException("No active session found !!"));

        // update the last recently used time for the session
        session.setLastUsedAt(LocalDateTime.now());
        sessionRepository.save(session);
    }

    @Override
    public void deleteSession(String refreshToken) {
        sessionRepository.deleteByRefreshToken(refreshToken);
    }

}

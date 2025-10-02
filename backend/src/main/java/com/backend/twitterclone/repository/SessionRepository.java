package com.backend.twitterclone.repository;

import com.backend.twitterclone.entity.Session;
import com.backend.twitterclone.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


public interface SessionRepository extends JpaRepository<Session, Long> {

    List<Session> findByUserOrderByLastUsedAtAsc(User user);

    Optional<Session> findByRefreshToken(String refreshToken);

    void deleteByRefreshToken(String refreshToken);
}

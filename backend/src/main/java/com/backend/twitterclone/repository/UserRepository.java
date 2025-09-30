package com.backend.twitterclone.repository;

import com.backend.twitterclone.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query("""
            select u
            from user u
            where u.firstName like %:keyword%
                or u.lastName like %:keyword%
                or u.email like %:keyword%
            """)
    List<User> searchUser(@Param("keyword") String keyword);

}

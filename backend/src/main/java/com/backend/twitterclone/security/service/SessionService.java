package com.backend.twitterclone.security.service;


import com.backend.twitterclone.entity.User;


/**
 * Responsible for managing and allowing single user session by using DB lookups
 */
public interface SessionService {

    // save session in DB (without verifying active session)
    void createSession(User user, String refreshToken);

    // save session in DB (after deleting any active session (if any))
    void invalidateAndCreateSession(User user, String refreshToken);

    // check if there are any active sessions for the refreshToken
    void validateSession(String refreshToken);

    // delete session from the refreshToken
    void deleteSession(String refreshToken);

}

package com.backend.twitterclone.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDateTime;

@Embeddable
public class Verification {

    private boolean status;

    // when the subscription started
    private LocalDateTime startedAt;

    // when the subscription is going to end
    private LocalDateTime endsAt;

    @Enumerated(EnumType.STRING)
    private PlanType planType;

}


enum PlanType{
    MONTHLY,
    ANUALLY
}
package com.backend.twitterclone.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * This class specifies which user liked which tweet
 * **/

@Entity
@Table(name = "likes")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // user who liked
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // which tweet was liked
    @ManyToOne
    @JoinColumn(name = "tweet_id")
    private Tweet tweet;
}

package com.backend.twitterclone.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


/**
 * This class is used as a 'Tweet' as well as for 'Reply' to a tweet
 * **/

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Tweet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tweetId;

    // owner of the tweet
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String content;

    // image URL
    private String image;

    // video URL
    private String video;

    @OneToMany(mappedBy = "tweet", cascade = CascadeType.ALL)
    private List<Like> likes = new ArrayList<>();

    // flag to indicate weather this is 'reply' to a 'tweet'
    private boolean isReply;

    // incase this is a reply to a tweet, then this property mentions which tweet this reply is for
    @ManyToOne
    @JoinColumn(name = "master_tweet_id")
    private Tweet masterTweetId;

    // all replies to the above 'masterTweetId' field (reply will be of type Tweet itself)
    @OneToMany(mappedBy = "masterTweetId")
    private List<Tweet> replies = new ArrayList<>();

    // flag to indicate weather this is an actual tweet
    private boolean isTweet;

    // a tweet can be retweeted by many users and a user can retweet many tweets
    @ManyToMany
    @JoinTable(
            name = "retweet",
            joinColumns = @JoinColumn(name = "tweet_id", referencedColumnName = "tweetId"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "userId")
    )
    private List<User> retweetUsers = new ArrayList<>();

}

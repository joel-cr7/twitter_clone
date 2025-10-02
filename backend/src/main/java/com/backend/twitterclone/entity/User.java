package com.backend.twitterclone.entity;


import com.backend.twitterclone.entity.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity(name = "user")
@Table(name = "app_user")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String firstName;

    private String lastName;

    private String location;

    private String website;

    private LocalDate birthDate;

    @Column(unique = true)
    private String email;

    private String password;

    private String mobile;

    private String image;

    private String backgroundImage;

    private String bio;


    // flag to indicate weather the current user from the JWT token is same as the user which we get
    // when using findById (used in UI)
    private boolean isRequiredUser;


    private boolean isLoggedInWithGoogle;


    // All tweets of this user
    // Note: if user is deleted, his tweets should also be deleted
    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Tweet> tweets = new ArrayList<>();


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Like> likes = new ArrayList<>();


    // Blue tick verification details
    @Embedded
    private Verification verification;


    // a user can be follower to many users as well as a user can have many followers (m-to-m)
    // From this JoinTable we can find ---> who 'user1' is following as well as who is following 'user1'
    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "user_follower_mapping",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "userId"),
            inverseJoinColumns = @JoinColumn(name = "follower_id", referencedColumnName = "userId")
    )
    private List<User> followers = new ArrayList<>();


    // RBAC (role based access control)
    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<Role> roles;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // map the above roles to object of SimpleGrantedAuthority
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
                .collect(Collectors.toSet());
    }


    @Override
    public String getUsername() {
        return email;
    }
}

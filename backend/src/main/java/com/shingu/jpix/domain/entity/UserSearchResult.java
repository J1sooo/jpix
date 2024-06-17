package com.shingu.jpix.domain.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserSearchResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "user_real_name")
    private String userRealName;

    @Column(name = "user_image")
    private String userImage;

    // Constructors, getters and setters

    public UserSearchResult() {}

    public UserSearchResult(String userName, String userRealName, String userImage) {
        this.userName = userName;
        this.userRealName = userRealName;
        this.userImage = userImage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserRealName() {
        return userRealName;
    }

    public void setUserRealName(String userRealName) {
        this.userRealName = userRealName;
    }

    public String getUserImage() {
        return userImage;
    }

    public void setUserImage(String userImage) {
        this.userImage = userImage;
    }
}

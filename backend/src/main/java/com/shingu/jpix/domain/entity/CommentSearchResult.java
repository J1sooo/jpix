package com.shingu.jpix.domain.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "comments")
public class CommentSearchResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "comment_post_id")
    private Long commentPostId;

    @Column(name = "comment_content")
    private String commentContent;

    @Column(name = "user_image")
    private String userImage;

    @Column(name = "user_name")
    private String userName;

    // Constructors, getters and setters

    public CommentSearchResult() {}

    public CommentSearchResult(Long commentPostId, String commentContent, String userImage, String userName) {
        this.commentPostId = commentPostId;
        this.commentContent = commentContent;
        this.userImage = userImage;
        this.userName = userName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCommentPostId() {
        return commentPostId;
    }

    public void setCommentPostId(Long commentPostId) {
        this.commentPostId = commentPostId;
    }

    public String getCommentContent() {
        return commentContent;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public String getUserImage() {
        return userImage;
    }

    public void setUserImage(String userImage) {
        this.userImage = userImage;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}

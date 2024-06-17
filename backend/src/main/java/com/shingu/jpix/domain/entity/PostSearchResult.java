package com.shingu.jpix.domain.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "posts")
public class PostSearchResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "post_image_url")
    private String postImageUrl;

    @Column(name = "content")
    private String content;

    // Constructors, getters and setters

    public PostSearchResult() {}

    public PostSearchResult(String postImageUrl, String content) {
        this.postImageUrl = postImageUrl;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPostImageUrl() {
        return postImageUrl;
    }

    public void setPostImageUrl(String postImageUrl) {
        this.postImageUrl = postImageUrl;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

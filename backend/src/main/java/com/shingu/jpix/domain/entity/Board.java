package com.shingu.jpix.domain.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity @Data @Getter @Setter
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    private String content;

    private String filename;

    private String filepath;

    @Column(name = "likes_count")
    private int likesCount;

    @OneToMany(mappedBy = "board")
    private List<Like> likes;

}

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

    private String name;

    private String content;

    private String filename;

    private String filepath;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}

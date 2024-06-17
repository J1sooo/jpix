package com.shingu.jpix.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class LikeDTO {


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MyLike {
        private int id;
        private int boardId;
        private String boardTitle;

    }
}
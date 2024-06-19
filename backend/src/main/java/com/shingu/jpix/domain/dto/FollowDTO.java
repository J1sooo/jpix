package com.shingu.jpix.domain.dto;

import com.shingu.jpix.domain.entity.User;
import lombok.*;

@Setter
@Getter
public class FollowDTO {

    private User toUser;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MyFollow {
        private int id;
        private String username;

    }
}

package com.shingu.jpix.domain.Userdto;

import com.shingu.jpix.domain.entity.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UserResponseDTO {
    private int id;
    private String email;
    private String name;
    private String profileImage;
    private int credit;
    private String tel;

    public static UserResponseDTO toMeDTO(User user) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getNickname())
                .build();
    }
}
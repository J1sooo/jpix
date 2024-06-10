package com.shingu.jpix.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@DynamicInsert
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private int id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @JsonIgnore
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "username")
    private String username;

    @Column(name = "role", nullable = false, columnDefinition = "VARCHAR(20) DEFAULT 'user'")
    private String role;
    //권한 반환
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }




    //사용자 id 반환(이메일)
    @Override
    public String getUsername() {
        return email;
    }

    //사용자 password 반환
    @Override
    public String getPassword() {
        return password;
    }
    //계정 만료 여부 반환 true:만료되지 않음
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    //계정 잠금 여부 반환 true:잠금되지 않음
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    //패스워드 만료 여부 반환 true:만료되지 않음
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    //계정 활성화 여부 반환 true:사용가능
    @Override
    public boolean isEnabled() {
        return true;
    }
}
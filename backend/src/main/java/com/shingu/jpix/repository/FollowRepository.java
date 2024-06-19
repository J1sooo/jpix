package com.shingu.jpix.repository;

import com.shingu.jpix.domain.dto.FollowDTO;
import com.shingu.jpix.domain.entity.Follow;
import com.shingu.jpix.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Follow findByFromUserAndToUser(User fromUser, User toUser);

    List<Follow> findByFromUserId(int userId);
}

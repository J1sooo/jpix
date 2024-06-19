package com.shingu.jpix.service;


import com.shingu.jpix.domain.dto.FollowDTO;
import com.shingu.jpix.domain.entity.Follow;
import com.shingu.jpix.domain.entity.User;
import com.shingu.jpix.repository.FollowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class FollowService {
    private final FollowRepository followRepository;

    public void follow(User fromUser, User toUser) {
        Follow existingFollow = followRepository.findByFromUserAndToUser(fromUser, toUser);
        if (existingFollow == null) {
            Follow follow = Follow.builder()
                    .fromUser(fromUser)
                    .toUser(toUser)
                    .build();
            followRepository.save(follow);
        } else {
            throw new IllegalArgumentException("이미 팔로우한 사용자입니다.");
        }
    }

    public void unfollow(User fromUser, User toUser) {
        Follow existingFollow = followRepository.findByFromUserAndToUser(fromUser, toUser);
        if (existingFollow != null) {
            followRepository.delete(existingFollow);
        } else {
            throw new IllegalArgumentException("팔로우하지 않은 사용자입니다.");
        }
    }

    public List<FollowDTO.MyFollow> getFollowingList(int userId) {
        List<Follow> followings = followRepository.findByFromUserId(userId);
        List<FollowDTO.MyFollow> followingDTOs = followings.stream()
                .map(follow -> new FollowDTO.MyFollow(follow.getToUser().getId(), follow.getToUser().getUsername()))
                .collect(Collectors.toList());
        return followingDTOs;
    }
}
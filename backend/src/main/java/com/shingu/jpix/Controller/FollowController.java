package com.shingu.jpix.Controller;

import com.shingu.jpix.domain.AuthUser;
import com.shingu.jpix.domain.dto.FollowDTO;
import com.shingu.jpix.domain.entity.User;
import com.shingu.jpix.service.FollowService;
import com.shingu.jpix.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FollowController {
    private final UserService userService;
    private final FollowService followService;

    @PostMapping("/user/follow/{id}")
    public ResponseEntity<String> follow(@AuthUser User fromUser, @PathVariable("id") int userId) {
        User toUser = userService.findUser(userId);
        followService.follow(fromUser, toUser);
        return ResponseEntity.ok("팔로우 성공");
    }

    @DeleteMapping("/user/unfollow/{id}")
    public ResponseEntity<String> unfollow(@AuthUser User fromUser, @PathVariable("id") int userId) {
        User toUser = userService.findUser(userId);
        followService.unfollow(fromUser, toUser);
        return ResponseEntity.ok("언팔로우 성공");
    }

    @GetMapping("/user/{id}/following")
    public ResponseEntity<List<FollowDTO.MyFollow>> getFollowingList(@PathVariable("id") int userId) {
        List<FollowDTO.MyFollow> followingList = followService.getFollowingList(userId);
        return ResponseEntity.ok(followingList);
    }
}

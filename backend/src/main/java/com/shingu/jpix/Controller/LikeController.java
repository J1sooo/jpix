package com.shingu.jpix.Controller;

import com.shingu.jpix.domain.entity.Board;
import com.shingu.jpix.domain.entity.Like;
import com.shingu.jpix.domain.entity.User;
import com.shingu.jpix.service.BoardService;
import com.shingu.jpix.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/likes")
public class LikeController {

    private final LikeService likeService;

    @Autowired
    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/like")
    public ResponseEntity<Void> likeBoard(@RequestParam Long userId, @RequestParam Long boardId) {
            likeService.likeBoard(userId, boardId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countLikes(@RequestParam Long boardId) {
        long count = likeService.countLikes(boardId);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/isLiked")
    public ResponseEntity<Boolean> isLikedByUser(@RequestParam Long userId, @RequestParam Long boardId) {
        boolean isLiked = likeService.isLikedByUser(userId, boardId);
        return ResponseEntity.ok(isLiked);
    }
}

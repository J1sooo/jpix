package com.shingu.jpix.Controller;

import com.shingu.jpix.domain.AuthUser;
import com.shingu.jpix.domain.entity.BoardLike;
import com.shingu.jpix.domain.entity.User;
import com.shingu.jpix.service.LikeService;
import com.shingu.jpix.util.response.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/likes")
public class LikeController {
    private final LikeService likeService;

    @PostMapping("/{boardId}")
    public ResponseEntity<Object> likeBoard(@PathVariable Integer boardId, @AuthUser User user) {
        BoardLike boardLike = likeService.likeBoard(boardId, user);

        return ResponseHandler.responseBuilder(
                HttpStatus.OK,
                "좋아요에 성공하였습니다.",
                boardLike
        );
    }
}
package com.shingu.jpix.service;

import com.shingu.jpix.domain.entity.Board;
import com.shingu.jpix.domain.entity.BoardLike;
import com.shingu.jpix.domain.entity.User;
import com.shingu.jpix.repository.BoardRepository;
import com.shingu.jpix.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeService {
    @Autowired
    LikeRepository likeRepository;
    @Autowired
    BoardRepository boardRepository;



    public BoardLike likeBoard(Integer boardId, User user) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new IllegalArgumentException("게시물을 찾을 수 없습니다."));
        if (likeRepository.findByBoardIdAndUserId(boardId, user.getId()) != null) {
            throw new IllegalArgumentException("이미 좋아요 하였습니다.");
        }
        return likeRepository.save(BoardLike.builder().board(board).user(user).build());
    }
}
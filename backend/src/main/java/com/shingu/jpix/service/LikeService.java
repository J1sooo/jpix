package com.shingu.jpix.service;

import com.shingu.jpix.domain.entity.Board;
import com.shingu.jpix.domain.entity.Like;
import com.shingu.jpix.domain.entity.User;
import com.shingu.jpix.repository.BoardRepository;
import com.shingu.jpix.repository.LikeRepository;
import com.shingu.jpix.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    @Autowired
    public LikeService(LikeRepository likeRepository, BoardRepository boardRepository, UserRepository userRepository) {
        this.likeRepository = likeRepository;
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public void likeBoard(Long userId, Long boardId) {
        User user = userRepository.findById(Math.toIntExact(userId)).orElseThrow(() -> new RuntimeException("User not found"));
        Board board = boardRepository.findById(Math.toIntExact(boardId)).orElseThrow(() -> new RuntimeException("Board not found"));

        if (likeRepository.existsByUserIdAndBoardId(userId, boardId)) {
            likeRepository.deleteByUserIdAndBoardId(userId, boardId);
            board.setLikesCount(board.getLikesCount() - 1);
        } else {
            Like like = new Like();
            like.setUser(user);
            like.setBoard(board);
            likeRepository.save(like);
            board.setLikesCount(board.getLikesCount() + 1);
        }

        boardRepository.save(board);
    }

    public long countLikes(Long boardId) {
        return likeRepository.countByBoardId(boardId);
    }

    public boolean isLikedByUser(Long userId, Long boardId) {
        return likeRepository.existsByUserIdAndBoardId(userId, boardId);
    }
}

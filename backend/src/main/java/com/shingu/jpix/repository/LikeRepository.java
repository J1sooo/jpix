package com.shingu.jpix.repository;

import com.shingu.jpix.domain.entity.Board;
import com.shingu.jpix.domain.entity.Like;
import com.shingu.jpix.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    long countByBoardId(Long boardId);
    boolean existsByUserIdAndBoardId(Long userId, Long boardId);
    void deleteByUserIdAndBoardId(Long userId, Long boardId);
}

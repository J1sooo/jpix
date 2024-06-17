package com.shingu.jpix.repository;

import com.shingu.jpix.domain.entity.BoardLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LikeRepository extends JpaRepository<BoardLike, Integer> {
    BoardLike findByBoardIdAndUserId(Integer boardId, Integer userId);
}
package com.shingu.jpix.repository;

import com.shingu.jpix.domain.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {
    @Query(value = "select b from Board b order by b.id desc limit 4 ")
    public List<Board> BoardList();

    @Query(value = "select b from Board b where b.id < :lastId order by b.id desc limit 4 ")
    public List<Board> BoardListWithId(@Param("lastId") Integer lastId);

}

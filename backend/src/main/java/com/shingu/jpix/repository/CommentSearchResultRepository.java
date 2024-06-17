package com.shingu.jpix.repository;

import com.shingu.jpix.domain.entity.CommentSearchResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentSearchResultRepository extends JpaRepository<CommentSearchResult, Long> {

    @Query(value = "select c from CommentSearchResult c where c.commentContent like %:keyword% order by c.id desc")
    public List<CommentSearchResult> searchCommentsByKeyword(@Param("keyword") String keyword);

    @Query(value = "select c from CommentSearchResult c where c.id < :lastId and c.commentContent like %:keyword% order by c.id desc")
    public List<CommentSearchResult> searchCommentsByKeywordWithId(@Param("keyword") String keyword, @Param("lastId") Long lastId);
}

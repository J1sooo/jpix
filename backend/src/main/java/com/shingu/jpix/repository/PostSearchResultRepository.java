package com.shingu.jpix.repository;

import com.shingu.jpix.domain.entity.PostSearchResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostSearchResultRepository extends JpaRepository<PostSearchResult, Long> {

    @Query(value = "select p from PostSearchResult p where p.content like %:keyword% order by p.id desc")
    public List<PostSearchResult> searchPostsByKeyword(@Param("keyword") String keyword);

    @Query(value = "select p from PostSearchResult p where p.id < :lastId and p.content like %:keyword% order by p.id desc")
    public List<PostSearchResult> searchPostsByKeywordWithId(@Param("keyword") String keyword, @Param("lastId") Long lastId);
}

package com.shingu.jpix.repository;

import com.shingu.jpix.domain.entity.UserSearchResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserSearchResultRepository extends JpaRepository<UserSearchResult, Long> {

    @Query(value = "select u from UserSearchResult u where u.userName like %:keyword% order by u.id desc")
    public List<UserSearchResult> searchUsersByKeyword(@Param("keyword") String keyword);

    @Query(value = "select u from UserSearchResult u where u.id < :lastId and u.userName like %:keyword% order by u.id desc")
    public List<UserSearchResult> searchUsersByKeywordWithId(@Param("keyword") String keyword, @Param("lastId") Long lastId);
}

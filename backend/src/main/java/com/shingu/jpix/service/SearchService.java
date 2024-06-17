package com.shingu.jpix.service;

import com.shingu.jpix.domain.entity.PostSearchResult;
import com.shingu.jpix.domain.entity.CommentSearchResult;
import com.shingu.jpix.domain.entity.UserSearchResult;
import com.shingu.jpix.repository.PostSearchResultRepository;
import com.shingu.jpix.repository.CommentSearchResultRepository;
import com.shingu.jpix.repository.UserSearchResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    private final PostSearchResultRepository postSearchResultRepository;
    private final CommentSearchResultRepository commentSearchResultRepository;
    private final UserSearchResultRepository userSearchResultRepository;

    @Autowired
    public SearchService(PostSearchResultRepository postSearchResultRepository, CommentSearchResultRepository commentSearchResultRepository, UserSearchResultRepository userSearchResultRepository) {
        this.postSearchResultRepository = postSearchResultRepository;
        this.commentSearchResultRepository = commentSearchResultRepository;
        this.userSearchResultRepository = userSearchResultRepository;
    }

    public List<PostSearchResult> searchPosts(String keyword) {
        return postSearchResultRepository.searchPostsByKeyword(keyword);
    }

    public List<PostSearchResult> searchPosts(String keyword, Long lastId) {
        return postSearchResultRepository.searchPostsByKeywordWithId(keyword, lastId);
    }

    public List<CommentSearchResult> searchComments(String keyword) {
        return commentSearchResultRepository.searchCommentsByKeyword(keyword);
    }

    public List<CommentSearchResult> searchComments(String keyword, Long lastId) {
        return commentSearchResultRepository.searchCommentsByKeywordWithId(keyword, lastId);
    }

    public List<UserSearchResult> searchUsers(String keyword) {
        return userSearchResultRepository.searchUsersByKeyword(keyword);
    }

    public List<UserSearchResult> searchUsers(String keyword, Long lastId) {
        return userSearchResultRepository.searchUsersByKeywordWithId(keyword, lastId);
    }
}

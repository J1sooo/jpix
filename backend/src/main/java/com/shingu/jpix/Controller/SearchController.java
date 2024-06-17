package com.shingu.jpix.Controller;
import com.shingu.jpix.domain.entity.PostSearchResult;
import com.shingu.jpix.domain.entity.CommentSearchResult;
import com.shingu.jpix.domain.entity.UserSearchResult;
import com.shingu.jpix.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {

    private final SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/{keyword}")
    public ResponseEntity<List<PostSearchResult>> searchPosts(@PathVariable String keyword) {
        List<PostSearchResult> results = searchService.searchPosts(keyword);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/posts/paginated")
    public ResponseEntity<List<PostSearchResult>> searchPostsPaginated(@RequestParam String keyword, @RequestParam Long lastId) {
        List<PostSearchResult> results = searchService.searchPosts(keyword, lastId);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/comments")
    public ResponseEntity<List<CommentSearchResult>> searchComments(@RequestParam String keyword) {
        List<CommentSearchResult> results = searchService.searchComments(keyword);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/comments/paginated")
    public ResponseEntity<List<CommentSearchResult>> searchCommentsPaginated(@RequestParam String keyword, @RequestParam Long lastId) {
        List<CommentSearchResult> results = searchService.searchComments(keyword, lastId);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserSearchResult>> searchUsers(@RequestParam String keyword) {
        List<UserSearchResult> results = searchService.searchUsers(keyword);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/users/paginated")
    public ResponseEntity<List<UserSearchResult>> searchUsersPaginated(@RequestParam String keyword, @RequestParam Long lastId) {
        List<UserSearchResult> results = searchService.searchUsers(keyword, lastId);
        return ResponseEntity.ok(results);
    }
}

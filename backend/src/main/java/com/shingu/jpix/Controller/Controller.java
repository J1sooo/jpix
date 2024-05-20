package com.shingu.jpix.Controller;

import com.shingu.jpix.entity.Board;
import com.shingu.jpix.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class Controller {
    @Autowired
    private BoardService boardService;

    @PostMapping("board/writepro")
    public ResponseEntity<String> boardwrite (
            @RequestParam("title") String title,
            @RequestParam("content") String content) {
        try {
            Board board = new Board();
            board.setTitle(title);
            board.setContent(content);
            boardService.write(board);
            return new ResponseEntity<>("Board created successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/board1/list")
    public ResponseEntity<List<Board>> boardList(){
        List<Board> boards = boardService.boardList();
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }
}

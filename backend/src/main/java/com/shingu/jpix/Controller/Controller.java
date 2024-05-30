package com.shingu.jpix.Controller;

import com.shingu.jpix.entity.Board;
import com.shingu.jpix.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class Controller {
    @Autowired
    private BoardService boardService;

    @PostMapping("board/writepro")
    public ResponseEntity<String> boardwrite (
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestAttribute MultipartFile file) throws Exception{
        try {
            System.out.println(file);
            Board board = new Board();
            board.setTitle(title);
            board.setContent(content);
            boardService.write(board, file);
            return new ResponseEntity<>("Board created successfully", HttpStatus.OK);
        } catch (Exception e) {
            throw e;
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/board1/list")
    public ResponseEntity<List<Board>> boardList(){
        List<Board> boards = boardService.boardList();
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }
}

package com.shingu.jpix.Controller;

import com.shingu.jpix.domain.AuthUser;
import com.shingu.jpix.domain.entity.Board;
import com.shingu.jpix.domain.entity.User;
import com.shingu.jpix.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Controller {
    @Autowired
    private BoardService boardService;

    @PostMapping("board/writepro")
    public ResponseEntity<String> boardwrite (
            @AuthUser User user,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestAttribute MultipartFile file) throws Exception{
        try {
            Board board = new Board();
            board.setUser(user);
            board.setTitle(title);
            board.setContent(content);
            boardService.write(board, file);
            return new ResponseEntity<>("Board created successfully", HttpStatus.OK);
        } catch (Exception e) {
            throw e;
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("board/list")
    public ResponseEntity<List<Board>> boardList(@RequestParam int id){
        List<Board> board = boardService.boardList(id);
        return new ResponseEntity<>(board, HttpStatus.OK);
    }

    @RequestMapping("board/delete/{id}")
    public ResponseEntity<Board> boardDelete(@PathVariable int id) {
        boardService.boardDelete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("board/video/{id}")
    public ResponseEntity<Board> boardView(@PathVariable int id) {
        Board board = boardService.boardView(id);
        return ResponseEntity.ok(board);
    }

    @PostMapping("board/modify/{id}")
    public ResponseEntity<Board> boardModify(
            @PathVariable int id,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestAttribute MultipartFile file) {

        Board board = boardService.boardModify(id, title, content, file);
        return ResponseEntity.ok(board);
    }
}

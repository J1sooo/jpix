package com.shingu.jpix.Controller;

import com.shingu.jpix.domain.entity.Board;
import com.shingu.jpix.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Controller {
    @Autowired
    private BoardService boardService;

    @GetMapping("/board1/list")
    public ResponseEntity<List<Board>> boardList(){
        List<Board> boards = boardService.boardList();
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }
}

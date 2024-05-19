package com.shingu.jpix.Controller;

import com.shingu.jpix.entity.Board;
import com.shingu.jpix.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@org.springframework.stereotype.Controller
public class Controller {
    @Autowired
    private BoardService boardService;

    @GetMapping("/board1/list")
    public ResponseEntity<List<Board>> boardList(){
        List<Board> boards = boardService.boardList();
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }
}

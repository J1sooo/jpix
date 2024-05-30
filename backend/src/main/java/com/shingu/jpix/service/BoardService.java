package com.shingu.jpix.service;

import com.shingu.jpix.entity.Board;
import com.shingu.jpix.repository.BoardRepository;
import com.shingu.jpix.s3.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@Service
public class BoardService {
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private ImageService imageService;
    // 글 작성 처리
    public void write(Board board, MultipartFile file) throws Exception{
        String url = imageService.saveImage(file, "file");
        board.setFilepath(url);
        boardRepository.save(board);
    }

    // 게시글 리스트 처리
    public List<Board> boardList(){
        return boardRepository.findAll();
    }

    // 특정 게시글 불러오기
    public Board boardView(Integer id) {
        return boardRepository.findById(id).get();
    }

    // 특정 게시글 삭제
    public void boardDelete(Integer id) {
        boardRepository.deleteById(id);
    }
}

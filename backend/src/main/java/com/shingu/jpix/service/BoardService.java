package com.shingu.jpix.service;

import com.shingu.jpix.domain.entity.Board;
import com.shingu.jpix.repository.BoardRepository;
import com.shingu.jpix.s3.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class BoardService {
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private VideoService videoService;
    // 글 작성 처리
    public void write(Board board, MultipartFile file) throws Exception{
        String url = videoService.saveVideo(file, "file");
        board.setFilepath(url);
        boardRepository.save(board);
    }

    // 게시글 리스트 처리
    public List<Board> boardList(int id){
        if(id < 0) return boardRepository.BoardList();
        else return  boardRepository.BoardListWithId(id);

    }

    // 특정 게시글 불러오기
    public Board boardView(int id) {
        return boardRepository.findById(id).get();
    }

    public Board boardModify(int id, String title, String content, MultipartFile file) {
        Board board = boardRepository.findById(id).orElseThrow(() -> new RuntimeException("Board not found"));

        board.setTitle(title);
        board.setContent(content);
        String url = videoService.saveVideo(file, "file");
        board.setFilepath(url);

        return boardRepository.save(board);
    }

    // 특정 게시글 삭제
    public void boardDelete(Integer id) {
        boardRepository.deleteById(id);
    }

    public void toggleLike(Integer id) {
        Optional<Board> optionalBoard = boardRepository.findById(id);
        if (optionalBoard.isPresent()) {
            Board board = optionalBoard.get();
//            board.incrementLikes(); // 좋아요 개수 증가
            boardRepository.save(board);
        }
    }

    public Board findBoardById(Integer id) {
        Optional<Board> boardOptional = boardRepository.findById(id);
        return boardOptional.orElseThrow(() -> new RuntimeException("게시물을 찾을 수 없습니다. ID: " + id));
    }
}
